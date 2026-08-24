---
title: NetworkX Graph Simulator
---

[← Back to Tutorials](/tutorials)

# NetworkX Graph Simulator

**Difficulty:** Intermediate · **Time:** ~45 minutes

In the previous tutorials, every "network delay" was just a flat `time.sleep()`. That works for learning the NSB API, but it doesn't reflect anything about *how* a payload actually travels — how many hops it takes, or how topology shapes latency. This tutorial builds a simulator that routes messages across a real graph topology using [NetworkX](https://networkx.org/), a pure-Python graph library.

**Goal:** Understand how to build realistic network behavior using NSB.


## Install NetworkX

```bash
pip install networkx
```

NetworkX requires no build system and no external dependencies — it's a good first step toward realistic topology modeling before reaching for a full simulator like ns-3 or OMNeT++.


## Step 1 — Define a Graph Topology

NetworkX gives you several built-in topology generators. For a simple line of 3 nodes using the same identifiers as your NSB clients:

```python
import networkx as nx

G = nx.path_graph(["node0", "node1", "node2"])  # node0 -- node1 -- node2
```

You can also build a topology manually:

```python
G = nx.Graph()
G.add_edge("node0", "node1")
G.add_edge("node1", "node2")
```

Either approach gives you a graph with nodes named `"node0"`, `"node1"`, and `"node2"` — the same identifiers your `NSBAppClient` and `NSBSimClient` instances use.


## Step 2 — Look Up Source and Destination as Graph Nodes

When your simulator fetches a payload, `MessageEntry.src_id` and `MessageEntry.dest_id` are the string identifiers of the sending and receiving nodes — for example `"node0"` and `"node2"`. Because the graph uses the same identifiers, you can look them up directly:

```python
entry = sim.fetch()
if entry:
    src = entry.src_id
    dst = entry.dest_id
    payload = entry.payload
```

These are the values you'll pass to NetworkX to find a path through the topology.


## Step 3 — Find the Shortest Path

```python
path = nx.shortest_path(G, src, dst)
```

`nx.shortest_path()` returns the list of nodes the payload would traverse. For the 3-node line graph, routing from `"node0"` to `"node2"` returns:

```python
["node0", "node1", "node2"]
```

That's 3 nodes and 2 hops (one per graph edge).


## Step 4 — Calculate Delay from Path Length

Treat each hop (graph edge) as adding a fixed amount of latency:

```python
delay = (len(path) - 1) * 0.02  # 20ms per hop
```

`len(path)` counts nodes, so subtract 1 to get the number of edges (hops). A 2-hop path costs `2 * 0.02 = 0.04` seconds.


## Step 5 — Apply the Delay

```python
import time

time.sleep(delay)
```

This is the same mechanism every tutorial so far has used — the only difference now is that the delay value comes from actual topology instead of a hardcoded constant.


## Step 6 — Post the Payload

```python
sim.post(src, dst, payload)
```

Exactly the same `post()` call as the mock simulator from the previous tutorial — NSB doesn't know or care that the delay this time came from a graph traversal.


## Prerequisites

Before starting this tutorial, ensure you have:

- Completed the [Get Started](/get-started) guide and have NSB installed
- The NSB daemon running with the correct configuration
- NetworkX installed (see above)

**Required daemon configuration:**

The daemon must be configured in PUSH mode without Redis for this tutorial to work as shown. Your `config.yaml` should have:

```yaml
system:
  mode: 1  # PUSH mode

database:
  use_db: false  # Disable Redis
```

Start the daemon with:
```bash
/usr/local/nsb/bin/nsb_daemon config.yaml
```


## Full Working Code — 3-Node Example

This simulator uses blocking `fetch()` — it waits until a message arrives before processing it. This is appropriate here because we have a single simulator client. The previous tutorial used `fetch(timeout=0)` because it needed to poll multiple simulator clients without blocking on any one of them.

**simulator.py:**
```python
import time
import networkx as nx
from nsb_client import NSBSimClient

# Define a simple 3-node network topology
G = nx.path_graph(["node0", "node1", "node2"])  # node0 -- node1 -- node2

sim = NSBSimClient("node0", "127.0.0.1", 65432)

print("[networkx-sim] Connected. Waiting for messages...", flush=True)

while True:
    entry = sim.fetch()

    if entry:
        src = entry.src_id
        dst = entry.dest_id
        payload = entry.payload

        # Guard against identifiers not present in the topology
        if src not in G or dst not in G:
            print(
                f"[networkx-sim] No route in topology for {src} -> {dst}",
                flush=True
            )
            continue

        path = nx.shortest_path(G, src, dst)
        delay = (len(path) - 1) * 0.02  # 20ms per hop

        print(
            f"[networkx-sim] Routing {src} -> {dst} "
            f"via {path} ({delay:.2f}s delay)",
            flush=True
        )

        time.sleep(delay)

        sim.post(src, dst, payload)

        print(
            f"[networkx-sim] Delivered {src} -> {dst}",
            flush=True
        )
```

**app.py (to test the simulator):**
```python
import nsb_client as nsb
import time

app = nsb.NSBAppClient("node0", "127.0.0.1", 65432)
app.send("node0", b"Hello from node0!")
print("[app] Sent message", flush=True)
print("[app] Waiting for reply...", flush=True)

while True:
    entry = app.receive()
    if entry:
        print(f"[app] Received: {entry.payload} from {entry.src_id}", flush=True)
        break
    time.sleep(0.1)
```

**Note:** Since the simulator is initialized as `"node0"`, the app sends to `"node0"` so the simulator will fetch and process the message.

:::tip Extending This
Try adding more nodes with `nx.path_graph(["node0", "node1", "node2", "node3", "node4"])`, or use `nx.random_geometric_graph()` for a more realistic, irregular topology. As long as you can look up a path with `nx.shortest_path()`, the delay calculation and `post()` call stay the same.
:::


## What You Just Learned

- How to define a graph topology using the same node identifiers as your NSB clients
- How to use `MessageEntry.src_id` and `MessageEntry.dest_id` to find a path through the graph
- How to calculate delay from the number of hops (graph edges) rather than a flat constant
- How to guard against message identifiers that are not present in the graph topology
- That `post()` doesn't change regardless of how sophisticated your routing logic gets


## Go Deeper

- [Python API → NSBSimClient](/docs/api-reference/python/nsb-sim-client) — the `fetch()`/`post()` reference this tutorial builds on
- [Architecture → Simulator Modes](/docs/architecture/simulator-modes) — if you want to extend this to multiple Per-Node simulator instances


**Next:** [Integrate ns-3 →](/tutorials/advanced/ns3-integration)