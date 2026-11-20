#!/usr/bin/env bash
#
# install.sh — Automated installer for NSB (Network Simulation Bridge)
#
# Installs system packages, builds Abseil and Protobuf (if not already
# installed), then compiles the NSB daemon and sets up the Python client.
#
# Usage:
#   chmod +x install.sh
#   ./install.sh
#

set -e

# --- Colors for terminal output ---
CYAN='\033[1;36m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
NC='\033[0m'

step()    { echo -e "\n${CYAN}==>${NC} $1"; }
success() { echo -e "  ${GREEN}✓${NC} $1"; }
warn()    { echo -e "  ${YELLOW}!${NC} $1"; }
fail()    { echo -e "  ${RED}✗${NC} $1"; exit 1; }

# --- Start ---
echo ""
echo "========================================"
echo -e "  ${CYAN}NSB Automated Installer (Linux)${NC}"
echo "========================================"
echo ""

# Grab sudo upfront so we don't pause mid-install
sudo -v

# ─────────────────────────────────────────────
# 1. System packages
# ─────────────────────────────────────────────
step "[1/4] Installing system packages..."
sudo apt-get update -y -qq
sudo apt-get install -y -qq \
  build-essential cmake pkg-config git wget tar \
  libsqlite3-dev libyaml-cpp-dev libhiredis-dev \
  python3 python3-pip redis-server
success "System packages ready."

# ─────────────────────────────────────────────
# 2. Abseil + Protobuf (built from source if missing)
# ─────────────────────────────────────────────
WORK_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR"' EXIT

step "[2/4] Checking build dependencies..."

# -- Abseil --
if ls /usr/local/lib/libabsl_base* >/dev/null 2>&1; then
    success "Abseil already installed."
else
    warn "Abseil not found. Building from source..."
    pushd "$WORK_DIR" >/dev/null
    git clone --depth 1 --branch 20240116.0 https://github.com/abseil/abseil-cpp.git
    cd abseil-cpp && mkdir build && cd build
    cmake .. \
      -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
      -DCMAKE_CXX_STANDARD=17 \
      -DCMAKE_BUILD_TYPE=Release \
      -DABSL_ENABLE_INSTALL=ON \
      -DBUILD_TESTING=OFF
    cmake --build . --parallel "$(nproc)"
    sudo cmake --install .
    sudo ldconfig
    popd >/dev/null
    success "Abseil built and installed."
fi

# -- Protobuf 27.5 --
if command -v protoc >/dev/null 2>&1 && protoc --version | grep -q '27.5'; then
    success "Protobuf 27.5 already installed."
else
    warn "Protobuf 27.5 not found. Building from source (takes a few minutes)..."
    pushd "$WORK_DIR" >/dev/null
    wget -q --show-progress \
      https://github.com/protocolbuffers/protobuf/releases/download/v27.5/protobuf-27.5.tar.gz
    tar -xzf protobuf-27.5.tar.gz
    cd protobuf-27.5 && mkdir build && cd build
    cmake .. \
      -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
      -Dprotobuf_BUILD_SHARED_LIBS=ON \
      -Dprotobuf_BUILD_TESTS=OFF \
      -Dprotobuf_ABSL_PROVIDER=package \
      -DCMAKE_CXX_STANDARD=17 \
      -DCMAKE_INSTALL_PREFIX=/usr/local
    cmake --build . --parallel "$(nproc)"
    sudo cmake --install .
    sudo ldconfig
    popd >/dev/null
    success "Protobuf 27.5 built and installed."
fi

# ─────────────────────────────────────────────
# 3. Build the NSB daemon
# ─────────────────────────────────────────────
step "[3/4] Building the NSB daemon..."
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

rm -rf build && mkdir build && cd build
cmake -DProtobuf_PROTOC_EXECUTABLE=/usr/local/bin/protoc ..

# First build attempt (may fail due to the proto nesting bug)
cmake --build . --parallel "$(nproc)" || true

# Workaround: protoc puts generated files one directory too deep.
# Copy them up so the compiler can find them.
if [ -d "$REPO_ROOT/cpp/proto/proto" ]; then
    warn "Fixing C++ proto nesting (cpp/proto/proto/ -> cpp/proto/)..."
    cp "$REPO_ROOT/cpp/proto/proto/"*.pb.h  "$REPO_ROOT/cpp/proto/" 2>/dev/null || true
    cp "$REPO_ROOT/cpp/proto/proto/"*.pb.cc "$REPO_ROOT/cpp/proto/" 2>/dev/null || true
    cmake --build . --parallel "$(nproc)"
fi

# Same fix for the Python proto files
if [ -d "$REPO_ROOT/python/proto/proto" ]; then
    warn "Fixing Python proto nesting (python/proto/proto/ -> python/proto/)..."
    cp "$REPO_ROOT/python/proto/proto/"*.py "$REPO_ROOT/python/proto/" 2>/dev/null || true
fi

success "NSB daemon built."

# ─────────────────────────────────────────────
# 4. Set up the Python client
# ─────────────────────────────────────────────
step "[4/4] Setting up the Python client..."
cd "$REPO_ROOT/python"
pip3 install -e . --break-system-packages 2>/dev/null || pip3 install -e .
success "Python client installed."

# ─────────────────────────────────────────────
# Done
# ─────────────────────────────────────────────
echo ""
echo "========================================"
echo -e "  ${GREEN}NSB installation complete.${NC}"
echo "========================================"
echo ""
echo "To start NSB:"
echo -e "  ${CYAN}redis-server --port 5050 --daemonize yes${NC}"
echo -e "  ${CYAN}cd build && ./nsb_daemon ../config.yaml${NC}"
echo ""
echo "To verify:"
echo -e "  ${CYAN}redis-cli -p 5050 ping${NC}                   # expect PONG"
echo -e "  ${CYAN}python3 -c \"import proto.nsb_pb2; print('OK')\"${NC}"
echo ""
