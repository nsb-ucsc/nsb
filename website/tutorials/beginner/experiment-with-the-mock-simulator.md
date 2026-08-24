---
title: Run Your First Co-Simulation
---

[← Back to Tutorials](/tutorials)

# Run Your First Co-Simulation

**Difficulty:** Beginner · **Time:** ~15 minutes

This tutorial picks up exactly where the [Quickstart](/quickstart) left off. If you haven't completed it yet, do that first — this tutorial assumes your daemon, mock simulator, and application client are already working.

**Goal:** Understand how NSB behaves before writing simulator code.


## Why Experiment First?

You've already seen one message travel through NSB successfully. Before building your own simulator, it's worth spending a few minutes changing small things and watching what happens. This builds intuition for the config fields, timing, and message flow you'll rely on in every future NSB project.


## 1. Add a Delay to the Mock Simulator

Open `simulator.py` from the Quickstart and add a small delay before posting the payload back:

```python
import nsb_client as nsb
import time

sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
print("Mock simulator ready — waiting for messages...", flush=True)

while True:
    entry = sim.fetch(timeout=1)
    if entry:
        src = entry.src_id
        dst = entry.dest_id
        payload = entry.payload

        print(f"Simulating: {src} -> {dst}, payload: {payload}", flush=True)

        time.sleep(0.1)   # <-- new: simulate 100ms of "network" delay

        sim.post(src, dst, payload)
        print("Posted payload as delivered", flush=True)
        break
    time.sleep(0.1)
```

Run the Quickstart sequence again (daemon → simulator → application). The application still receives the message — it just takes slightly longer. This delay simply simulates network latency in the mock simulator used for this tutorial. In a real integration, the simulator would determine when a message is delivered.


## 2. Observe the Difference in Receive Timing

The Quickstart `app.py` polls for a response in a loop:

```python
while True:
    entry = app.receive()
    if entry:
        print(f"Received: {entry.payload} from {entry.src_id}", flush=True)
        break
    time.sleep(0.1)
```

The `time.sleep(0.1)` between polls means the application checks roughly 10 times per second. Try changing the polling interval and observe the effect:

```python
time.sleep(0.5)   # check twice per second — noticeable lag before the reply appears
```

or:

```python
time.sleep(0.05)  # check 20 times per second — snappier response
```

In either case the application keeps looping until a message arrives — it will not miss the message. In PULL mode, the application actively checks for delivered messages. The polling interval affects how quickly the application notices that a message has arrived. Shorter intervals are generally more responsive, while longer intervals reduce the number of polling requests.


## 3. Change the Payload Size

Send a much larger payload and see that nothing about the flow changes:

```python
app.send("node0", b"x" * 5000)   # 5000 bytes instead of a short string
```

With `use_db: false` (the Quickstart default), this larger payload is sent directly — no extra setup needed. If you switch to `use_db: true`, NSB caches the payload in Redis and routes only a short key through the bridge instead, regardless of size. See [Redis Storage](/docs/backends/redis-storage) for why this matters at scale.

---

## 4. Switch from PULL to PUSH Mode

Edit your `config.yaml`:

```yaml
system:
  mode: 1   # was: mode: 0  (PULL → PUSH)
```

Switch the configuration to PUSH mode and restart the daemon and clients. In PUSH mode, the daemon forwards payloads to clients automatically instead of waiting to be asked. The client behavior differs from the PULL-mode Quickstart, so consult the [System Modes](/docs/architecture/system-modes) documentation before adapting the example clients for PUSH mode.


## 5. Switch from Per-Node to System-Wide Simulator Mode

Edit `config.yaml` again:

```yaml
system:
  simulator_mode: 0   # was: simulator_mode: 1  (Per-Node → System-Wide)
```

With this change, a single simulator client now fetches messages from *any* source node, not just the one matching its identifier. If you're running the single-node Quickstart example, behavior looks the same — the difference only becomes visible once multiple nodes are involved, which is exactly what the next section demonstrates. See [Simulator Modes](/docs/architecture/simulator-modes) for the full comparison.


## 6. Run the Two-Node Example

This is where Per-Node vs. System-Wide actually matters. The following three files show `node0` sending to `node1`, with `node1` replying back — using **Per-Node mode**, so set `simulator_mode: 1` again before running this.

### `app_node0.py`

```python
import nsb_client as nsb
import time

app = nsb.NSBAppClient("node0", "127.0.0.1", 65432)
app.send("node1", b"Hello, node1!")
print("[node0] Sent message")

print("[node0] Waiting for reply...", flush=True)

while True:
    entry = app.receive()
    if entry:
        print(f"[node0] Received reply: {entry.payload}", flush=True)
        break
    time.sleep(0.1)
```

### `app_node1.py`

```python
import nsb_client as nsb
import time

app = nsb.NSBAppClient("node1", "127.0.0.1", 65432)

print("[node1] Waiting for message...", flush=True)

while True:
    entry = app.receive()
    if entry:
        print(f"[node1] Received: {entry.payload}", flush=True)
        app.send(entry.src_id, b"Hello back, node0!")
        print("[node1] Sent reply", flush=True)
        break
    time.sleep(0.1)
```

### `simulator.py` — Per-Node, handles both nodes

```python
import nsb_client as nsb
import time

sim0 = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
sim1 = nsb.NSBSimClient("node1", "127.0.0.1", 65432)

simulators = [sim0, sim1]
messages_processed = 0

print("[sim] Mock simulator ready — waiting for messages...", flush=True)

while messages_processed < 2:
    for sim in simulators:
        entry = sim.fetch(timeout=0)
        if entry:
            print(f"[sim] Routing {entry.src_id} -> {entry.dest_id}")
            time.sleep(0.1)  # simulate 100ms network delay
            sim.post(entry.src_id, entry.dest_id, entry.payload)
            messages_processed += 1

    time.sleep(0.1)
```

Unlike earlier one-shot examples, both the simulator and applications continue polling until messages arrive. This means you do not need to launch every process within a narrow timing window.

Start `app_node1.py` before `app_node0.py`. Node 1 waits indefinitely for a message, so you can leave it running and start Node 0 whenever you're ready. This avoids the startup timing issues that can occur with one-shot receive examples.

Use four terminals (the daemon from earlier stays running):

```bash
# Terminal 1 — NSB Daemon (already running from earlier)
./build/nsb_daemon config.yaml
```

```bash
# Terminal 2 — Per-Node Simulator
python3 simulator.py
```

Wait for the simulator to print `[sim] Mock simulator ready — waiting for messages...` before continuing.

```bash
# Terminal 3 — Node 1
python3 app_node1.py
```

Node 1 prints `[node1] Waiting for message...` and stays alive. **Take your time** — you do not need to start Node 0 immediately.

```bash
# Terminal 4 — Node 0
python3 app_node0.py
```

Start Node 0 whenever you are ready. It sends to Node 1 and triggers the full round-trip.


## 7. Observe the `[sim] Routing` Output

> **Note:** NSB itself may print additional `INFO` or `WARNING` log lines in each terminal. The lines below are the important application-level output — focus on these rather than the NSB internals.

Watch the simulator terminal. You'll see output like:

```
[sim] Mock simulator ready — waiting for messages...
[sim] Routing node0 -> node1
[sim] Routing node1 -> node0
```

Node 1's terminal:

```
[node1] Waiting for message...
[node1] Received: b'Hello, node1!'
[node1] Sent reply
```

Node 0's terminal:

```
[node0] Sent message
[node0] Waiting for reply...
[node0] Received reply: b'Hello back, node0!'
```

This is the simulator polling **both** `sim0` and `sim1` in a loop and routing whichever message is currently available. In Per-Node mode, each `NSBSimClient` is associated with its own node identifier, and the daemon routes fetch requests according to that simulator identity.

Node 1's terminal:

```text
[node1] Waiting for message...
[node1] Received: b'Hello, node1!'
[node1] Sent reply
```

Node 0's terminal:

```text
[node0] Sent message
[node0] Waiting for reply...
[node0] Received reply: b'Hello back, node0!'
```


## What You Just Learned

- How a `time.sleep()` in the mock simulator stands in for real network latency
- Why receive timing matters in PULL mode
- That payload size doesn't change the NSB flow
- The observable difference between PULL/PUSH and System-Wide/Per-Node
- How a two-node round-trip looks with a single Per-Node simulator script handling multiple identities


## Go Deeper

- [System Modes](/docs/architecture/system-modes) — the full PULL vs PUSH mechanics
- [Simulator Modes](/docs/architecture/simulator-modes) — the full System-Wide vs Per-Node mechanics


**Next:** [Build a Mock Simulator →](/tutorials/beginner/build-a-mock-simulator)