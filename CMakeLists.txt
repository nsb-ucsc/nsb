cmake_minimum_required(VERSION 3.16)

# ------------------------------------------------------------------
# Project Information
# ------------------------------------------------------------------
project(nsb
    VERSION 1.1.0
    DESCRIPTION "NSB – Network Simulation Bridge"
    HOMEPAGE_URL "https://github.com/nsb-ucsc/nsb_beta"
    LANGUAGES CXX
)

# Set specifications.
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
option(NSB_WERROR "Treat compiler warnings in NSB sources as errors" ON)
# Set standard install directories.
include(GNUInstallDirs)

# ------------------------------------------------------------------
# Source Directories
# ------------------------------------------------------------------
set(CPP_DIR          "${CMAKE_SOURCE_DIR}/cpp")
set(CPP_SRC_DIR      "${CPP_DIR}/src")
set(CPP_INCLUDE_DIR  "${CPP_DIR}/include")
set(CPP_PROTO_DIR    "${CPP_DIR}/proto")
set(PYTHON_DIR       "${CMAKE_SOURCE_DIR}/python")
set(PYTHON_PROTO_DIR "${PYTHON_DIR}/proto")
set(PROTO_DIR        "${CMAKE_SOURCE_DIR}/proto")
message(STATUS "Source directory: ${CMAKE_SOURCE_DIR}")
message(STATUS "Binary directory: ${CMAKE_BINARY_DIR}")

# ------------------------------------------------------------------
# Dependencies
# ------------------------------------------------------------------
# Find dependency packages.
find_package(Protobuf REQUIRED)
find_package(absl REQUIRED)
find_package(yaml-cpp REQUIRED)
find_package(SQLite3 REQUIRED)
find_package(Python3 COMPONENTS Interpreter REQUIRED)
# Use pkg-config for hiredis due to this issue (https://github.com/coturn/coturn/issues/1618)
find_package(PkgConfig REQUIRED)
pkg_check_modules(hiredis REQUIRED IMPORTED_TARGET hiredis)

# Verify that packages/libraries have been found.
set(link_targets
    protobuf::libprotobuf
    yaml-cpp::yaml-cpp
    SQLite::SQLite3
    absl::base
    absl::log
    absl::log_initialize
    absl::log_internal_check_op
    absl::raw_logging_internal
    absl::strings
    absl::time
    PkgConfig::hiredis
)
message(STATUS "Checking target libraries:")
foreach(link_target ${link_targets})
    if(TARGET ${link_target})
        message(STATUS "✓ Found target: ${link_target}")
    else()
        message(STATUS "✗ Target not found: ${link_target}")
    endif()
endforeach()

# ------------------------------------------------------------------
# Protobuf Code Generation (Python & C++)
# ------------------------------------------------------------------
# Identify protoc executable.
if(Protobuf_PROTOC_EXECUTABLE)
    set(NSB_PROTOC "${Protobuf_PROTOC_EXECUTABLE}")
elseif(TARGET protobuf::protoc)
    set(NSB_PROTOC "$<TARGET_FILE:protobuf::protoc>")
else()
    message(FATAL_ERROR "protoc not found; set -DProtobuf_PROTOC_EXECUTABLE=/path/to/protoc")
endif()
message(STATUS "Protoc Executable: ${NSB_PROTOC}")
# Set protobuf sources.
set(NSB_PROTO_CPP_SRC "${CPP_PROTO_DIR}/nsb.pb.cc")
set(NSB_PROTO_CPP_HDR "${CPP_PROTO_DIR}/nsb.pb.h")
set(NSB_PROTO_PY      "${PYTHON_PROTO_DIR}/nsb_pb2.py")
# Create custom command to generate protobuf code.
add_custom_command(
    OUTPUT "${NSB_PROTO_CPP_SRC}" "${NSB_PROTO_CPP_HDR}" "${NSB_PROTO_PY}"
    COMMAND "${CMAKE_COMMAND}" -E make_directory "${CPP_PROTO_DIR}" "${PYTHON_PROTO_DIR}"
    COMMAND "${NSB_PROTOC}"
        --proto_path "${PROTO_DIR}"
        --cpp_out "${CPP_PROTO_DIR}"
        --python_out "${PYTHON_PROTO_DIR}"
        "${PROTO_DIR}/nsb.proto"
    DEPENDS "${PROTO_DIR}/nsb.proto"
    COMMENT "Generating C++ and Python protobuf code from nsb.proto"
    VERBATIM
)
# Generated code is not ours to lint.
set_source_files_properties("${NSB_PROTO_CPP_SRC}" PROPERTIES COMPILE_OPTIONS "-w")
# Warning flags applied to NSB's own sources.
set(nsb_warning_flags -Wall -Wextra -Wpedantic -Wuninitialized)
if(NSB_WERROR)
    list(APPEND nsb_warning_flags -Werror)
endif()
# Protobuf headers use Clang nullability annotations.
if(CMAKE_CXX_COMPILER_ID MATCHES "Clang")
    list(APPEND nsb_warning_flags -Wno-nullability-extension)
endif()

# ------------------------------------------------------------------
# NSB Library
# ------------------------------------------------------------------
# Add C++ sources.
add_library(nsb SHARED
    "${CPP_SRC_DIR}/nsb.cc"
    "${CPP_SRC_DIR}/nsb_client.cc"
    "${NSB_PROTO_CPP_SRC}"
)
target_include_directories(nsb PUBLIC
    "${CPP_INCLUDE_DIR}"
    "${CPP_PROTO_DIR}"
)
target_link_libraries(nsb PUBLIC ${link_targets})
target_compile_options(nsb PRIVATE ${nsb_warning_flags})

# Single owner of the protoc step (also builds the Python stubs); avoids building twice.
add_custom_target(nsb_proto ALL
    DEPENDS "${NSB_PROTO_CPP_SRC}" "${NSB_PROTO_CPP_HDR}" "${NSB_PROTO_PY}"
)
add_dependencies(nsb nsb_proto)

# ------------------------------------------------------------------
# NSB Daemon Executable
# ------------------------------------------------------------------
add_executable(nsb_daemon "${CPP_SRC_DIR}/nsb_daemon.cc")
target_link_libraries(nsb_daemon PRIVATE nsb)
target_compile_options(nsb_daemon PRIVATE ${nsb_warning_flags})

# ------------------------------------------------------------------
# NSB Test Executable
# ------------------------------------------------------------------
add_executable(nsb_test "${CPP_DIR}/nsb_test.cc")
target_link_libraries(nsb_test PRIVATE nsb)
target_compile_options(nsb_test PRIVATE ${nsb_warning_flags})

# ------------------------------------------------------------------
# Installation Layout (<prefix>/nsb/...)
# ------------------------------------------------------------------
set(NSB_INSTALL_LIBDIR      "nsb/${CMAKE_INSTALL_LIBDIR}")
set(NSB_INSTALL_BINDIR      "nsb/${CMAKE_INSTALL_BINDIR}")
set(NSB_INSTALL_INCLUDEDIR  "nsb/${CMAKE_INSTALL_INCLUDEDIR}")
# Set proper install name (macOS).
set_target_properties(nsb PROPERTIES
    INSTALL_NAME_DIR "${CMAKE_INSTALL_PREFIX}/${NSB_INSTALL_LIBDIR}"
)
# Generate and install the pkg-config file.
configure_file(
    "${CMAKE_SOURCE_DIR}/nsb.pc.in"
    "${CMAKE_BINARY_DIR}/nsb.pc"
    @ONLY
)
install(FILES "${CMAKE_BINARY_DIR}/nsb.pc"
    DESTINATION "${CMAKE_INSTALL_LIBDIR}/pkgconfig"
    COMPONENT development
)
# Install the daemon.
install(TARGETS nsb nsb_daemon
    EXPORT nsbTargets
    LIBRARY DESTINATION "${NSB_INSTALL_LIBDIR}"
    ARCHIVE DESTINATION "${NSB_INSTALL_LIBDIR}"
    RUNTIME DESTINATION "${NSB_INSTALL_BINDIR}"
    INCLUDES DESTINATION "${NSB_INSTALL_INCLUDEDIR}"
    COMPONENT runtime
)
# Install development components.
install(DIRECTORY "${CPP_INCLUDE_DIR}/"
    DESTINATION "${NSB_INSTALL_INCLUDEDIR}"
    COMPONENT development
    FILES_MATCHING PATTERN "*.h"
)
install(FILES "${NSB_PROTO_CPP_HDR}"
    DESTINATION "${NSB_INSTALL_INCLUDEDIR}"
    COMPONENT development
)
