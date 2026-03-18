#!/usr/bin/env python3
"""
Manage NSB services (Redis + daemon) from one place.

    python nsb_manager.py start
    python nsb_manager.py stop
    python nsb_manager.py status
    python nsb_manager.py restart
"""

import argparse
import os
import signal
import socket
import subprocess
import sys
import time

import yaml


def load_config(path):
    """Pull connection settings out of config.yaml."""
    with open(path) as f:
        raw = yaml.safe_load(f)

    sys_cfg = raw.get("system", {})
    db_cfg = raw.get("database", {})

    return {
        "daemon_address": sys_cfg.get("daemon_address", "127.0.0.1"),
        "daemon_port": int(sys_cfg.get("daemon_port", 65432)),
        "system_mode": {0: "PULL", 1: "PUSH"}.get(sys_cfg.get("mode", 0), "PULL"),
        "simulator_mode": {0: "System-Wide", 1: "Per-Node"}.get(sys_cfg.get("simulator_mode", 0)),
        "use_db": db_cfg.get("use_db", True),
        "db_address": db_cfg.get("db_address", "127.0.0.1"),
        "db_port": int(db_cfg.get("db_port", 5050)),
    }


def is_port_open(port):
    """Quick check if something is listening on a port."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(("127.0.0.1", port)) == 0


def get_pid(port):
    """Find the PID of whatever is listening on a port, if anything."""
    try:
        out = subprocess.check_output(
            ["lsof", "-t", "-i", f":{port}"], stderr=subprocess.DEVNULL
        )
        first = out.decode().strip().split("\n")[0]
        return int(first) if first else None
    except (subprocess.CalledProcessError, ValueError):
        return None


def find_daemon(config_path):
    """Look for the nsb_daemon binary in common locations."""
    root = os.path.dirname(os.path.abspath(config_path))

    for candidate in [
        os.path.join(root, "build", "nsb_daemon"),
        os.path.join(root, "nsb_daemon"),
    ]:
        if os.path.isfile(candidate) and os.access(candidate, os.X_OK):
            return candidate

    # Maybe it's on the system PATH.
    try:
        return subprocess.check_output(
            ["which", "nsb_daemon"], stderr=subprocess.DEVNULL
        ).decode().strip()
    except subprocess.CalledProcessError:
        return None


# -- Commands --


def start(cfg, config_path):
    print("\n  Starting NSB services...\n")

    # Start Redis (if enabled and not already running).
    if is_port_open(cfg["db_port"]):
        print(f"  Redis        already running on port {cfg['db_port']}")
    elif cfg["use_db"]:
        print(f"  Redis        starting on port {cfg['db_port']}...", end=" ")
        try:
            subprocess.run(
                ["redis-server", "--port", str(cfg["db_port"]), "--daemonize", "yes"],
                check=True, capture_output=True,
            )
            time.sleep(0.5)
            print("✓" if is_port_open(cfg["db_port"]) else "✗ failed")
        except FileNotFoundError:
            print("✗ redis-server not found (apt install redis-server)")
            return False
    else:
        print("  Redis        skipped (disabled in config)")

    # Start daemon (if not already running).
    if is_port_open(cfg["daemon_port"]):
        print(f"  Daemon       already running on port {cfg['daemon_port']}")
    else:
        daemon = find_daemon(config_path)
        if not daemon:
            print("  Daemon       ✗ nsb_daemon not found — build NSB first")
            return False

        print(f"  Daemon       starting on port {cfg['daemon_port']}...", end=" ")
        subprocess.Popen(
            [daemon, os.path.abspath(config_path)],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        time.sleep(1)
        print("✓" if is_port_open(cfg["daemon_port"]) else "✗ failed")

    print("\n  NSB is ready.\n")
    return True


def stop(cfg):
    print("\n  Stopping NSB services...\n")

    # Stop daemon first.
    pid = get_pid(cfg["daemon_port"])
    if pid:
        print(f"  Daemon       stopping (pid {pid})...", end=" ")
        try:
            os.kill(pid, signal.SIGTERM)
            time.sleep(0.5)
            print("✓")
        except ProcessLookupError:
            print("already gone")
    else:
        print("  Daemon       not running")

    # Then stop Redis.
    if is_port_open(cfg["db_port"]):
        print(f"  Redis        stopping...", end=" ")
        try:
            subprocess.run(
                ["redis-cli", "-p", str(cfg["db_port"]), "shutdown"],
                check=True, capture_output=True,
            )
            print("✓")
        except (subprocess.CalledProcessError, FileNotFoundError):
            pid = get_pid(cfg["db_port"])
            if pid:
                os.kill(pid, signal.SIGTERM)
                print("✓")
            else:
                print("✗")
    else:
        print("  Redis        not running")
    print()


def status(cfg):
    print("\n  NSB Status")
    print("  " + "─" * 40)

    redis_up = is_port_open(cfg["db_port"])
    daemon_up = is_port_open(cfg["daemon_port"])

    r = "✓ Running" if redis_up else "✗ Stopped"
    d = "✓ Running" if daemon_up else "✗ Stopped"

    print(f"  Redis        port {cfg['db_port']}    {r}")
    print(f"  Daemon       port {cfg['daemon_port']}  {d}")
    print(f"  Mode         {cfg['system_mode']}")
    print(f"  Simulator    {cfg['simulator_mode']}")
    print(f"  Database     {'Enabled' if cfg['use_db'] else 'Disabled'}")
    print()
    return redis_up and daemon_up


def main():
    parser = argparse.ArgumentParser(description="Manage NSB services.")
    parser.add_argument("command", choices=["start", "stop", "status", "restart"])
    parser.add_argument("-c", "--config", default="config.yaml",
                        help="path to config.yaml (default: config.yaml)")
    args = parser.parse_args()

    if not os.path.isfile(args.config):
        print(f"Error: '{args.config}' not found.")
        print("Use -c to specify the config path.")
        sys.exit(1)

    cfg = load_config(args.config)

    if args.command == "start":
        sys.exit(0 if start(cfg, args.config) else 1)
    elif args.command == "stop":
        stop(cfg)
    elif args.command == "status":
        sys.exit(0 if status(cfg) else 1)
    elif args.command == "restart":
        stop(cfg)
        time.sleep(1)
        sys.exit(0 if start(cfg, args.config) else 1)


if __name__ == "__main__":
    main()
