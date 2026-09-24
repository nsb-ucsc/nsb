---
sidebar_label: Protobuf Overview
sidebar_position: 1
---

# Protobuf Overview

NSB uses a single Protobuf message type — `nsbm` — for all communication between the daemon, application clients, and simulator clients.


## What `nsbm` Is

Every message that travels across NSB — INIT handshakes, SEND/FETCH/POST/RECEIVE operations, PING checks, EXIT signals — is encoded as exactly one Protobuf message type: `nsbm`. There is no second message format. A single schema, shared between the C++ and Python client libraries, is what makes the two languages fully wire-compatible.


## Schema File

**Location:** `proto/nsb.proto`

Compiled outputs:
- **C++:** `cpp/proto/nsb.pb.cc` and `nsb.pb.h`
- **Python:** `python/proto/nsb_pb2.py` (also in `rabbit/proto/`)

For the complete schema with every field documented, see [Protobuf Schema](/docs/protocol/protobuf-schema).


## Go Deeper

- [Protobuf Schema](/docs/protocol/protobuf-schema) — the full `.proto` definition and field-by-field explanation
- [Operations Reference](/docs/protocol/operations) — every `Operation`, `Originator`, and `OpCode` value
- [Initialization Flow](/docs/protocol/initialization-flow) — all 5 message flows shown with full field values