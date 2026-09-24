---
sidebar_label: Project Structure
sidebar_position: 1
---

# Project Structure

A complete reference of all files and directories in the NSB repository.


## Top-Level Layout

```
nsb/
├── CMakeLists.txt              # Build configuration (Linux and macOS)
├── config.yaml                 # Default NSB system configuration
├── minconfig.yaml              # Minimal configuration for quick testing
├── nsb.pc.in                   # pkg-config template file
├── linux-setup-guide.md        # Linux (Ubuntu 24.04) setup instructions
├── RabbitMQ_Enhancements.md    # RabbitMQ improvement proposals
├── README.md                   # Project overview and quickstart
├── proto/                      # Protobuf message definitions
├── cpp/                        # C++ source code
├── python/                     # Python source code
├── rabbit/                     # Python RabbitMQ backend
└── examples/                   # Simulator integration examples
```


## `proto/`

Protobuf message schema shared across all NSB components and languages.

```
proto/
└── nsb.proto                   # NSB message definitions (nsbm type)
```

The compiled output is generated at build time into:
- `cpp/proto/nsb.pb.cc` and `nsb.pb.h` — C++ generated code
- `python/proto/nsb_pb2.py` — Python generated code

See [Protobuf Schema](/docs/protocol/protobuf-schema) for the full message definition.


## `cpp/`

C++ client library and daemon.

```
cpp/
├── Doxyfile                    # Doxygen configuration for C++ docs
├── README.md                   # C++ API documentation
├── include/
│   ├── nsb.h                   # Core header: Config, MessageEntry, SocketInterface, logging
│   ├── nsb_client.h            # Client header: NSBClient, NSBAppClient, NSBSimClient
│   └── nsb_daemon.h            # Daemon header: NSBDaemon class
├── src/
│   ├── nsb.cc                  # Core implementation
│   ├── nsb_client.cc           # Client implementation (send, receive, fetch, post)
│   └── nsb_daemon.cc           # Daemon implementation (routing, client registration)
├── proto/
│   ├── nsb.pb.cc               # Generated Protobuf C++ implementation
│   ├── nsb.pb.h                # Generated Protobuf C++ header
│   └── proto/
│       ├── nsb.pb.cc           # (duplicate; retained for compatibility)
│       └── nsb.pb.h
├── nsb_test.cc                 # C++ test file
└── rabbit/                     # RabbitMQ C++ implementation
    ├── CMakeLists.txt          # RabbitMQ C++ build config
    ├── README.md               # RabbitMQ C++ documentation
    ├── GetStarted.txt          # Quick start notes
    ├── buildsteps.txt          # Manual build steps
    ├── include/
    │   ├── RabbitMQInterface.hpp   # Low-level AMQP transport
    │   ├── NSBClientRMQ.hpp        # Base RMQ client (INIT, PING, EXIT)
    │   ├── NSBAppClientRMQ.hpp     # Application client (send/receive/listen)
    │   ├── NSBSimClientRMQ.hpp     # Simulator client (fetch/post/listen)
    │   └── NSBDaemonRMQ.hpp        # Standalone C++ RabbitMQ daemon
    ├── src/
    │   ├── RabbitMQInterface.cpp
    │   ├── NSBClientRMQ.cpp
    │   ├── NSBAppClientRMQ.cpp
    │   ├── NSBSimClientRMQ.cpp
    │   └── NSBDaemonRMQ.cpp
    └── examples/
        ├── example_send_recv.cpp   # Two RMQ app clients exchanging a message
        ├── example_daemon.cpp      # Standalone RMQ daemon demo
        └── example_unified.cpp     # Unified client with CLI backend selection
```

See [C++ API](/docs/api-reference/cpp/setup) for the full method reference.


## `python/`

Python client library (socket backend).

```
python/
├── Doxyfile                    # Doxygen configuration for Python docs
├── README.md                   # Python API documentation
├── pyproject.toml              # Python package metadata
├── requirements.txt            # Python dependencies
├── nsb_client.py               # Main client library (NSBAppClient, NSBSimClient)
├── nsb_test_client.py          # Single-node test script
├── nsb_test_client_multipleHosts.py  # Multi-node test script
├── tests.py                    # Full Python test suite
└── proto/
    └── proto/
        └── nsb_pb2.py          # Generated Protobuf Python bindings
```

See [Python API](/docs/api-reference/python/overview) for the full method reference.


## `rabbit/`

Python RabbitMQ backend (transport layer alternative).

```
rabbit/
├── README.md                   # RabbitMQ Python documentation
├── Implementation.md           # Implementation notes and class overview
├── requirements.txt            # Dependencies: pika, redis
├── nsb_rabbitmq.py             # Core: RabbitMQInterface, NSBAppClient, NSBSimClient
├── nsb_daemon.py               # RabbitMQ daemon: NSBDaemon, NSBDaemonConfig
├── nsb_unified.py              # Unified client supporting socket + RabbitMQ
├── example_usage.py            # 5 standalone RabbitMQ examples
├── proto/
│   ├── __init__.py
│   └── (proto stubs)
└── tests/
    ├── example_unified.py      # 7 examples using the unified client
    ├── test_unified.py         # Comprehensive test suite with benchmarks
    └── testing.txt             # Test prerequisites, env vars, troubleshooting
```

See [RabbitMQ Backend](/docs/backends/rabbitmq-backend) for full usage.


## `examples/`

Simulator-specific example scripts and project files.

```
examples/
├── ns3/
│   ├── README.md               # ns-3 integration guide
│   ├── ns3Simple-testing.cc    # Simple NSB AppClient in ns-3 scratch script
│   ├── nsb-testing.cc          # Full NSB SimClient integration in ns-3
│   └── nsb-testing-tcp.cc      # NSB integration using TCP in ns-3
└── omnet/
    ├── README.md               # OMNeT++ integration guide
    ├── nsb_omnet_basic/        # Pure OMNeT++ example (no INET)
    │   ├── NSBMessage.msg      # Custom OMNeT++ message type
    │   ├── NSBMessage_m.cc     # Generated message implementation
    │   ├── NSBMessage_m.h      # Generated message header
    │   ├── NSBHost.cc          # Host module: fetch, route, post
    │   ├── NSBHost.h
    │   ├── NSBHost.ned         # Host NED definition
    │   ├── NSBHostNetwork.ned  # Two-host network topology
    │   ├── NSBHostNetworkTenHosts.ned  # Ten-host network topology
    │   ├── omnetpp.ini         # Simulation configuration
    │   ├── Makefile            # Build file
    │   └── makefrag            # NSB include/library injection for make
    └── nsb_omnet_inet/         # OMNeT++ with INET framework
        ├── INETAppFiles/       # NSB-INET application layer files
        │   ├── nsbBasicApp.cc  # Message source: fetch from NSB → UDP inject
        │   ├── nsbBasicApp.h
        │   ├── nsbBasicApp.ned
        │   ├── nsbAppSink.cc   # Message sink: UDP receive → NSB post
        │   ├── nsbAppSink.h
        │   └── nsbAppSink.ned
        └── nsb_beta_simulations/
            ├── Makefile
            └── simulations/
                ├── omnetpp.ini
                ├── WirelessNetworkTwoHosts.ned   # Two-host wireless topology
                └── WirelessNetworkTenHosts.ned   # Ten-host wireless topology
```

See [Tutorials → Integrate ns-3](/tutorials/advanced/ns3-integration), [OMNeT++ Basic](/tutorials/advanced/omnet-basic-integration), and [OMNeT++ with INET](/tutorials/advanced/omnet-inet-integration) for usage walkthroughs of these example files.


## Key Configuration Files

### `config.yaml`

Full system configuration file. Passed to `nsb_daemon` at startup.

```yaml
---
system:
  daemon_address: 127.0.0.1
  daemon_port: 65432
  mode: 0             # PULL (0) or PUSH (1)
  simulator_mode: 1   # System-Wide (0) or Per-Node (1)

database:
  use_db: true
  db_address: 127.0.0.1
  db_port: 5050
  db_num: 0
```

### `minconfig.yaml`

Minimal configuration for quick testing. Uses defaults for most settings.

### `nsb.pc.in`

Template for generating the `nsb.pc` pkg-config file. Installed to `[prefix]/lib/pkgconfig/nsb.pc` so that projects can use:

```bash
pkg-config --cflags --libs nsb
```


## Generated Build Artifacts

After running `cmake --build`:

| Artifact | Location | Description |
|---|---|---|
| `nsb_daemon` | `build/` | NSB Daemon executable |
| `libnsb.so` / `libnsb.dylib` | `build/` → `[install]/nsb/lib/` | Shared client library |
| `nsb.pb.cc` / `nsb.pb.h` | `cpp/proto/` | Compiled Protobuf bindings |
| `nsb_pb2.py` | `python/proto/` (not installed) | Python Protobuf bindings |
| `libnsb_rabbitmq_cpp.a` | `cpp/rabbit/build/` | RabbitMQ C++ static library |
| `libnsb_unified_cpp.a` | `cpp/rabbit/build/` | Unified C++ static library |


## Go Deeper

- [Get Started](/get-started) — the build process that generates these artifacts
- [Configuration Reference](/docs/configuration/config-reference) — every field in `config.yaml`