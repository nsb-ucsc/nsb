"""
Tests for the NSB Python client library.

Unit tests can run standalone (no daemon/Redis needed):
    pytest test_nsb_client.py -v -m "not integration"

Full test suite (needs daemon + Redis running):
    pytest test_nsb_client.py -v
"""

import pytest
import threading

from nsb_client import (
    MessageEntry,
    Config,
    DBConnector,
    RedisConnector,
    Comms,
)

# Connection settings — change these if your setup uses different ports.
DAEMON_ADDRESS = "127.0.0.1"
DAEMON_PORT = 65432
REDIS_ADDRESS = "127.0.0.1"
REDIS_PORT = 5050


# ── Unit Tests (no external services needed) ─────────────────────────────


class TestMessageEntry:
    """Verify that MessageEntry correctly stores message data."""

    def test_basic_creation(self):
        msg = MessageEntry("node0", "node1", b"hello world")
        assert msg.src_id == "node0"
        assert msg.dest_id == "node1"
        assert msg.payload == b"hello world"

    def test_payload_size_is_auto_computed(self):
        payload = b"test payload data"
        msg = MessageEntry("src", "dst", payload)
        assert msg.payload_size == len(payload)

    def test_empty_payload(self):
        msg = MessageEntry("src", "dst", b"")
        assert msg.payload == b""
        assert msg.payload_size == 0

    def test_handles_large_payloads(self):
        big = b"x" * 100_000
        msg = MessageEntry("src", "dst", big)
        assert msg.payload_size == 100_000
        assert msg.payload == big


class TestDBConnector:
    """Verify payload ID generation in DBConnector."""

    def test_ids_are_unique(self):
        db = DBConnector("client1")
        ids = {db.generate_payload_id() for _ in range(100)}
        assert len(ids) == 100

    def test_id_includes_client_name(self):
        db = DBConnector("my_node")
        pid = db.generate_payload_id()
        assert "my_node" in pid

    def test_ids_unique_across_threads(self):
        """Make sure concurrent ID generation doesn't produce duplicates."""
        db = DBConnector("threaded")
        results = []
        lock = threading.Lock()

        def generate(n):
            for _ in range(n):
                pid = db.generate_payload_id()
                with lock:
                    results.append(pid)

        threads = [threading.Thread(target=generate, args=(50,)) for _ in range(4)]
        for t in threads:
            t.start()
        for t in threads:
            t.join()

        assert len(set(results)) == 200

class TestCommsChannels:
    """Sanity check the channel enum values."""

    def test_expected_values(self):
        assert Comms.Channels.CTRL == 0
        assert Comms.Channels.SEND == 1
        assert Comms.Channels.RECV == 2

    def test_three_channels_exist(self):
        assert len(Comms.Channels) == 3


# ── Integration Tests (need Redis running on port 5050) ──────────────────


@pytest.mark.integration
class TestRedisConnector:
    """Verify that RedisConnector can store and retrieve payloads."""

    @pytest.fixture(autouse=True)
    def connect_to_redis(self):
        try:
            self.redis = RedisConnector("test_redis", REDIS_ADDRESS, REDIS_PORT)
            if not self.redis.is_connected():
                pytest.skip("Redis not running")
        except Exception:
            pytest.skip("Redis not running")

    def test_peek_reads_without_deleting(self):
        key = self.redis.store(b"peek me")
        assert self.redis.peek(key) == b"peek me"
        # Should still be there after peeking.
        assert self.redis.peek(key) == b"peek me"
        self.redis.check_out(key)  # clean up

    def test_checkout_reads_and_deletes(self):
        key = self.redis.store(b"one time read")
        assert self.redis.check_out(key) == b"one time read"
        # Gone after checkout.
        assert self.redis.peek(key) is None

    def test_binary_data_roundtrip(self):
        """Payloads with non-UTF-8 bytes should survive store/retrieve."""
        raw = bytes(range(256))
        key = self.redis.store(raw)
        assert self.redis.check_out(key) == raw


# ── Lifecycle Tests (TODO) ───────────────────────────────────────────────
#
# Full send -> fetch -> post -> receive tests are planned but deferred.
# They depend on daemon session handling that needs further investigation.
#
# Planned:
#   - test_send_fetch_post_receive
#   - test_receive_returns_none_when_empty
#   - test_multiple_sequential_messages


# ── pytest setup ─────────────────────────────────────────────────────────

def pytest_configure(config):
    config.addinivalue_line(
        "markers",
        "integration: requires running NSB daemon and/or Redis server",
    )
