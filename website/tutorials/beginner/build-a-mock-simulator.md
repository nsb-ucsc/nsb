---
title: Build a Mock Simulator
---

[← Back to Tutorials](/tutorials)

# Build a Mock Simulator

**Difficulty:** Beginner · **Time:** ~25 minutes

In the [Quickstart](/quickstart) and the [previous tutorial](/tutorials/beginner/experiment-with-the-mock-simulator), you used a pre-built mock simulator without writing any of it yourself. Now you'll build one from scratch, understanding exactly what a simulator client does and why.

**Goal:** Understand how simulators communicate with NSB.


## What a Simulator Client Is

An `NSBSimClient` is the bridge between NSB and a network simulator. It has exactly two jobs:

1. **Fetch** payloads that are waiting to be routed through the simulated network
2. **Post** those payloads back once the simulator has finished routing them

Everything else — how the payload is actually delayed, dropped, or rerouted — is up to you. NSB doesn't care what happens between `fetch()` and `post()`; that's the whole point of being simulator-agnostic. For the full method reference used throughout this tutorial, see [Python API → NSBSimClient](/docs/api-reference/python/nsb-sim-client).


## Step 1 — Connect NSBSimClient

Every simulator client starts the same way: construct it with an identifier and the daemon's address.

```python
import nsb_client as nsb

sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
```

The identifier (`"node0"` here) is especially important in **Per-Node** mode, where the simulator is associated with a specific node identifier. In **System-Wide** mode, a single simulator client can handle messages across nodes. See [Simulator Modes](/docs/architecture/simulator-modes) if you haven't already.


## Step 2 — Poll with `fetch()`

`fetch()` retrieves a payload that's waiting to be routed. It supports both blocking and non-blocking usage:

```python
# Blocking — waits indefinitely until a message arrives
entry = sim.fetch()

# Non-blocking — returns immediately, None if nothing is waiting
entry = sim.fetch(timeout=0)

# Blocking with a timeout — waits up to 10 seconds
entry = sim.fetch(timeout=10)
```

Use blocking (`timeout=None`, the default) for a simple single-purpose simulator. Use non-blocking (`timeout=0`) when your simulator needs to poll multiple sources in a loop — exactly like the two-node example in the previous tutorial, which polled `sim0` and `sim1` without blocking on either.


## Step 3 — Inspect the MessageEntry

`fetch()` returns a `MessageEntry` object (or `None` if nothing was waiting). It carries everything you need to route the payload:

```python
entry = sim.fetch()
if entry:
    print("Source:      ", entry.src_id)
    print("Destination: ", entry.dest_id)
    print("Payload:     ", entry.payload)
    print("Payload size:", entry.payload_size)
```

Always check `if entry:` before accessing its fields — a `None` result just means nothing was waiting yet. See [MessageEntry](/docs/api-reference/python/message-entry) for the full attribute table.


## Step 4 — Call `post()` to Deliver

Once you've "routed" the payload through your simulated network — even if that routing is just a `time.sleep()` for now — call `post()` to hand it back to NSB for delivery:

```python
sim.post(entry.src_id, entry.dest_id, entry.payload)
```

This is what makes the payload available to `NSBAppClient(entry.dest_id).receive()` on the other side. Until `post()` is called, the application never sees the message — `fetch()` alone doesn't deliver anything.


## Step 5 — Build a Simple Loop

A real simulator runs continuously, fetching and posting as messages arrive. Here's the minimal loop:

```python
import nsb_client as nsb
import time

sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)

while True:
    entry = sim.fetch(timeout=0)
    if entry:
        time.sleep(0.1)  # stand-in for real network delay
        sim.post(entry.src_id, entry.dest_id, entry.payload)
    else:
        time.sleep(0.05)  # small pause to avoid a busy loop
```

The `else` branch matters — without it, a non-blocking `fetch()` in a tight loop will burn CPU checking for messages that aren't there yet.


## Step 6 — Add Per-Message Logging

A simulator that doesn't tell you what it's doing is hard to debug. Add print statements so you can see every routing decision as it happens:

```python
import nsb_client as nsb
import time

sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
print("[mock-sim] Connected. Waiting for messages...")

while True:
    entry = sim.fetch(timeout=0)
    if entry:
        print(f"[mock-sim] Fetched: {entry.src_id} -> {entry.dest_id} "
              f"({entry.payload_size} bytes)")
        time.sleep(0.1)
        sim.post(entry.src_id, entry.dest_id, entry.payload)
        print(f"[mock-sim] Posted: {entry.src_id} -> {entry.dest_id}")
    else:
        time.sleep(0.05)
```


## Full Working Code

```python
# mock_simulator.py
import nsb_client as nsb
import time

sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
print("[mock-sim] Connected. Waiting for messages...")

while True:
    entry = sim.fetch(timeout=0)
    if entry:
        print(f"[mock-sim] Fetched: {entry.src_id} -> {entry.dest_id} "
              f"({entry.payload_size} bytes)")
        time.sleep(0.1)
        sim.post(entry.src_id, entry.dest_id, entry.payload)
        print(f"[mock-sim] Posted: {entry.src_id} -> {entry.dest_id}")
    else:
        time.sleep(0.05)
```

Run it alongside the daemon and an application client exactly as you did in the [Quickstart](/quickstart) — but now every line of the simulator is something you wrote and understand.


## What You Just Learned

- What a simulator client's two responsibilities are (fetch, post)
- Blocking vs. non-blocking `fetch()` and when to use each
- How to read the source, destination, payload, and payload size from a `MessageEntry`
- Why `post()` — not `fetch()` — is what actually delivers a message
- How to structure a continuous polling loop without burning CPU
- Why logging every fetch/post pair makes a simulator debuggable


## Go Deeper

- [Python API → NSBSimClient](/docs/api-reference/python/nsb-sim-client) — full method reference including `listen()` for async simulators
- [Payload Lifecycle](/docs/architecture/payload-lifecycle) — how fetch/post fits into the complete message round-trip


**Next:** [Build a NetworkX Graph Simulator →](/tutorials/intermediate/networkx-graph-simulator)