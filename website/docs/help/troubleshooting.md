---
sidebar_label: Troubleshooting
sidebar_position: 1
---

# Troubleshooting

Common errors encountered during installation, configuration, and integration, with fixes for each.


## Installation Issues

### cmake says "could not find Protobuf"

**Symptom:** CMake fails during configuration with errors such as:

```text
Could NOT find Protobuf
```

or

```text
Protobuf_INCLUDE_DIR not found
```

**Cause:** Protobuf is either not installed, installed incorrectly, or CMake cannot locate the required version.

**Fix:**

Verify Protobuf installation:

```bash
protoc --version
```

If Protobuf is missing, install it using the platform-specific instructions in the Get Started guide.

Linux users building from source should refresh the linker cache after installation:

```bash
sudo ldconfig
```

Then rerun:

```bash
cmake ..
```

If multiple Protobuf versions are installed, remove older versions and rebuild using the recommended version from the Get Started guide.

See [Get Started](/get-started) for the full installation procedure.


### gRPC / Protobuf version conflict

**Symptom:** Build errors referencing conflicting Protobuf headers or symbols.

**Cause:** A prior gRPC installation bundles its own Protobuf version, which conflicts with the version NSB needs.

**Fix:** Uninstall your existing gRPC installation before building. Rebuild Protobuf from source (see [Get Started → Linux tab](/get-started)) and retry the NSB cmake configure step.


### Python proto import fails

**Symptom:** `ModuleNotFoundError` or `ImportError` when running `import proto.nsb_pb2`.

**Cause:** The Python stubs haven't been generated yet, or `PYTHONPATH` doesn't include the `python/` directory.

**Fix:** Build NSB with CMake, which generates `python/proto/nsb_pb2.py`, then make sure `python/` is on your `PYTHONPATH`:
```bash
ls python/proto/nsb_pb2.py
export PYTHONPATH=/path/to/nsb_beta/python:$PYTHONPATH
```
See [Configuration Reference](/docs/configuration/config-reference) and [Python API Overview](/docs/api-reference/python/overview) for setup details.


### `nsb_daemon: command not found`

**Symptom:** Shell reports the binary doesn't exist after installation.

**Cause:** The binary isn't on your `PATH` — this is expected, NSB doesn't add itself to `PATH` automatically.

**Fix:** Use the full path: `[install_path]/nsb/bin/nsb_daemon` (macOS) or `/usr/local/nsb/bin/nsb_daemon` (Linux). Or add the `bin/` directory to your `PATH`.


### Linux cmake missing targets after Abseil/Protobuf build

**Symptom:** cmake reports it cannot find `absl::base`, `absl::log`, or `protobuf::libprotobuf` even after building them from source.

**Cause:** The dynamic linker cache wasn't refreshed after installing the new libraries.

**Fix:**
```bash
sudo ldconfig
```
Run this after installing both Abseil and Protobuf, then re-run cmake. See [Get Started → Linux tab](/get-started) for the full build sequence.


## Runtime Issues

### 500+ clients fail to connect or behave erratically

**Symptom:** Latency spikes dramatically, CPU usage caps near 77%, or new clients fail to register at very high node counts.

**Cause:** NSB2's multi-channel architecture uses 3 file descriptors per client (ctrl, send, recv). At 500 clients, this is 1,500 file descriptors — exceeding the default OS limit of 1,024 on many systems. See [Performance Evaluation](/docs/reference/performance) for the full measured impact.

**Fix:** Raise your shell's file descriptor limit before starting the daemon:
```bash
ulimit -n 4096
```
This is a known environmental ceiling, not a fundamental design flaw — see [Deep Architecture → Multi-Channel Architecture](/docs/architecture/deep-architecture#multi-channel-architecture) for the architectural explanation.


### No message received by the application

**Symptom:** `app.receive()` returns `None` even though `app.send()` was called successfully.

**Cause:** The simulator wasn't running (or wasn't ready) when the application sent its message — there was nothing to `fetch()` the payload.

**Fix:** Always start the simulator **before** the application. See the [Quickstart](/quickstart) startup order, and [Database Settings → Startup Order](/docs/configuration/database-settings#startup-order) for the full service startup sequence.


### Redis port mismatch (5050 vs 6379)

**Symptom:** `use_db: true` is set, but the daemon can't connect to Redis, or payloads aren't being cached.

**Cause:** Redis defaults to port `6379`, but NSB's examples and guides use port `5050`. If your `redis-server` startup command and your `config.yaml` `db_port` don't match, the daemon will fail to reach Redis.

**Fix:** Make sure both match:
```bash
redis-server --port 5050
```
```yaml
database:
  db_port: 5050
```
See [Database Settings](/docs/configuration/database-settings) for the full field reference.


## Simulator Integration Issues

### Null byte (`\00`) in payload causes issues

**Symptom:** Payloads appear truncated or corrupted, specifically in OMNeT++ (without INET).

**Cause:** Some simulators — notably pure OMNeT++ without INET — don't properly handle null characters within `std::string`-based payloads. This is a known limitation under active development.

**Fix:** No complete fix yet. Avoid embedding null bytes in payloads if running OMNeT++ without INET, or use the INET-based integration instead, which handles this correctly via its chunk system. See [OMNeT++ with INET](/tutorials/advanced/omnet-inet-integration).


### OMNeT++ IDE not finding NSB headers

**Symptom:** Build fails in the OMNeT++ IDE with "header not found" errors for `nsb_client.h` or similar.

**Cause:** The `makefrag` file is missing the NSB include/library injection.

**Fix:** Ensure your `makefrag` contains:
```makefile
INCLUDE_PATH += $(shell pkg-config --cflags-only-I nsb)
LIBS         += $(shell pkg-config --libs nsb)
```
Then *Clean Local* and *Build Project* again. See [OMNeT++ Basic Integration](/tutorials/advanced/omnet-basic-integration) for the full setup.


For issues not listed here, [open a GitHub issue](https://github.com/nsb-ucsc/nsb_beta).