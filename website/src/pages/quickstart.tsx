import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/quickstart.css';

/* ─────────────────────────── Icons ─────────────────────────── */

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="12" x2="22" y2="12" />
    <polyline points="14 5 21 12 14 19" />
  </svg>
);
const IconArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
  </svg>
);
const IconPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IconBridge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2 10h20"/><path d="M7 10v8"/><path d="M17 10v8"/><path d="M2 18h20"/>
  </svg>
);
const IconHelp = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconBolt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const IconRocket = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const IconAppClient = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconDaemon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);
const IconSimulator = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
    <line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="12" x2="5" y2="17"/><line x1="12" y1="12" x2="19" y2="17"/>
  </svg>
);

/* ─────────────────────── CodeBlock ─────────────────────── */

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div className="gs-codeblock">
      <div className="gs-codeblock-top">
        <span className="gs-codeblock-lang">{lang}</span>
        <button className="gs-codeblock-copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? <><IconCheck/> Copied</> : <><IconCopy/> Copy</>}
        </button>
      </div>
      <pre className="gs-codeblock-pre"><code>{code}</code></pre>
    </div>
  );
}

/* ─────────────────────────── Step ─────────────────────────── */

function Step({
  id,
  n,
  title,
  desc,
  last = false,
  children,
}: {
  id?: string;
  n: number;
  title: string;
  desc?: string;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="gs-step">
      <div className="gs-step-left">
        <div className="gs-step-num">{n}</div>
        {!last && <div className="gs-step-connector" />}
      </div>

      <div className="gs-step-card">
        <div className="gs-step-title">{title}</div>
        {desc && <p className="gs-step-desc">{desc}</p>}
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────── Language Tabs ─────────────────────────── */

type Lang = 'python' | 'cpp';

function LangTabs({ python, cpp }: { python: React.ReactNode; cpp: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('python');
  return (
    <div className="qs2-lang-tabs">
      <div className="gs-tabs" style={{ marginBottom: '14px' }}>
        <button className={`gs-tab${lang === 'python' ? ' active' : ''}`} onClick={() => setLang('python')}>Python</button>
        <button className={`gs-tab${lang === 'cpp' ? ' active' : ''}`} onClick={() => setLang('cpp')}>C++</button>
      </div>
      {lang === 'python' ? python : cpp}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */

export default function Quickstart() {
  return (
    <Layout
      title="Quickstart — NSB"
      description="Run your first NSB co-simulation in minutes."
    >
      <div className="gs-page">

        {/* ── Hero Section ── */}
        <div className="gs-hero-section animate-fade-up">
          <div className="gs-hero-left">
            <div className="gs-stage-badge">
              <span className="gs-stage-dot" />
              Stage 2 · First Simulation
            </div>
            <h1 className="gs-hero-title">Quickstart</h1>
            <p className="gs-hero-sub">
              Launch the daemon, connect a simulator, send a message, and watch it travel through NSB — all in under 10 minutes.
            </p>
            <div className="gs-hero-actions">
              <Link className="gs-btn-primary" to="/get-started">
                ← Back to Get Started
              </Link>
              <Link className="gs-btn-secondary" to="/docs">
                Browse Documentation
              </Link>
            </div>
            <div className="gs-hero-meta">
              <div className="gs-hero-meta-item">
                <IconClock/>
                <span>Estimated time: ~10 minutes</span>
              </div>
              <div className="gs-hero-meta-sep" />
              <div className="gs-hero-meta-item">
                <IconMonitor/>
                <span>Python · C++</span>
              </div>
            </div>
          </div>

          {/* Hero Right — horizontal flow diagram (matches GS style) */}
          <div className="gs-hero-right animate-fade-right animate-delay-1">
            <div className="gs-hero-flow-card">
              <div className="gs-hero-flow-label">Message Round-Trip</div>
              <div className="gs-hero-flow-nodes">
                <div className="gs-hero-flow-node">
                  <div className="gs-hero-flow-icon gs-hero-flow-icon-blue">
                    <IconAppClient/>
                  </div>
                  <div className="gs-hero-flow-node-label">Application Client</div>
                  <div className="gs-hero-flow-node-sub">NSBAppClient</div>
                </div>
                <div className="gs-hero-flow-arrow"><IconArrowRight/></div>
                <div className="gs-hero-flow-node">
                  <div className="gs-hero-flow-icon gs-hero-flow-icon-neutral">
                    <IconDaemon/>
                  </div>
                  <div className="gs-hero-flow-node-label">NSB Daemon</div>
                  <div className="gs-hero-flow-node-sub">Routes & queues</div>
                </div>
                <div className="gs-hero-flow-arrow"><IconArrowRight/></div>
                <div className="gs-hero-flow-node">
                  <div className="gs-hero-flow-icon gs-hero-flow-icon-gold">
                    <IconSimulator/>
                  </div>
                  <div className="gs-hero-flow-node-label">Mock Simulator</div>
                  <div className="gs-hero-flow-node-sub">NSBSimClient</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Prerequisite ── */}
        <div className="gs-whatis animate-fade-up animate-delay-1">
          <p className="gs-whatis-text">
            <strong style={{ color: 'var(--text)' }}>Prerequisite:</strong>{' '}
            <Link to="/get-started">Completed Get Started</Link> — NSB installed and verified.{' '}
            Complete that guide first if you haven't already.
          </p>
        </div>

        {/* ── What You Will Build ── */}
        <div className="qs2-build-section animate-fade-up animate-delay-2">
          <div className="gs-section-header">
            <div className="gs-section-header-icon">
              <IconZap/>
            </div>
            <div>
              <h2 id = "what-you-will-build" className="gs-section-heading">What You Will Build</h2>
              <p className="gs-section-subheading">
                A complete message round-trip through NSB — from your application, through the daemon,
                through a mock simulator, and back.
              </p>
            </div>
          </div>

          <div className="qs2-flow-card">
            <div className="qs2-flow-horiz">
              <div className="qs2-flow-node qs2-flow-node-app">
                <div className="qs2-flow-icon"><IconAppClient/></div>
                <div className="qs2-flow-label">Application Client</div>
                <div className="qs2-flow-sublabel">NSBAppClient — sends payload</div>
              </div>
              <div className="qs2-flow-arrow-h"><IconArrowRight/></div>
              <div className="qs2-flow-node qs2-flow-node-daemon">
                <div className="qs2-flow-icon"><IconDaemon/></div>
                <div className="qs2-flow-label">NSB Daemon</div>
                <div className="qs2-flow-sublabel">Routes and queues messages</div>
              </div>
              <div className="qs2-flow-arrow-h"><IconArrowRight/></div>
              <div className="qs2-flow-node qs2-flow-node-sim">
                <div className="qs2-flow-icon"><IconSimulator/></div>
                <div className="qs2-flow-label">Mock Simulator</div>
                <div className="qs2-flow-sublabel">NSBSimClient — fetches, posts back</div>
              </div>
              <div className="qs2-flow-arrow-h"><IconArrowRight/></div>
              <div className="qs2-flow-node qs2-flow-node-daemon">
                <div className="qs2-flow-icon"><IconDaemon/></div>
                <div className="qs2-flow-label">NSB Daemon</div>
                <div className="qs2-flow-sublabel">Delivers to destination</div>
              </div>
              <div className="qs2-flow-arrow-h"><IconArrowRight/></div>
              <div className="qs2-flow-node qs2-flow-node-app">
                <div className="qs2-flow-icon"><IconAppClient/></div>
                <div className="qs2-flow-label">Application Client</div>
                <div className="qs2-flow-sublabel">NSBAppClient — receives payload</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main layout with sidebar ── */}
        <div className="gs-platform-layout animate-fade-up animate-delay-3">
          <div className="gs-platform-main" id = "gs-sidebar-toc-link">

            {/* ── Step 1: Config ── */}
            <Step id="step-1" n={1} title="Create Configuration" desc="Save the following as config.yaml in your working directory.">
              <CodeBlock lang="yaml" code={`---
system:
  daemon_address: 127.0.0.1   # address where the NSB daemon runs
  daemon_port: 65432           # port the daemon listens on
  mode: 0                      # 0 = PULL (clients request messages)
  simulator_mode: 1            # 1 = Per-Node (each node has its own SimClient)

database:
  use_db: false                # false = direct transmission, no Redis needed`} />

              <div className="gs-needs-table" style={{ marginBottom: '14px' }}>
                <div className="gs-needs-row gs-needs-row-head">
                  <div>Field</div>
                  <div>Value</div>
                </div>
                <div className="gs-needs-row" style={{ gridTemplateColumns: '180px 110px 1fr' }}>
                  <div className="gs-needs-pkg">mode: 0</div>
                  <div style={{ color: 'var(--nsb-blue)', fontWeight: 600, padding: '13px 20px' }}>PULL</div>
                  <div>Clients request messages — simplest mode</div>
                </div>
                <div className="gs-needs-row" style={{ gridTemplateColumns: '180px 110px 1fr' }}>
                  <div className="gs-needs-pkg">simulator_mode: 1</div>
                  <div style={{ color: 'var(--nsb-blue)', fontWeight: 600, padding: '13px 20px' }}>Per-Node</div>
                  <div>Each node has its own simulator client</div>
                </div>
                <div className="gs-needs-row" style={{ gridTemplateColumns: '180px 110px 1fr' }}>
                  <div className="gs-needs-pkg">use_db: false</div>
                  <div style={{ color: 'var(--nsb-blue)', fontWeight: 600, padding: '13px 20px' }}>disabled</div>
                  <div>Payloads sent directly — no Redis needed</div>
                </div>
              </div>

              <div className="gs-callout gs-callout-info">
                <IconAlert/>
                <div>
                  <strong>Redis is optional.</strong> For this Quickstart, <code>use_db: false</code> transmits
                  payloads directly through NSB without storage. Redis can be enabled later for large-payload
                  scenarios.{' '}
                  <Link to="/docs/configuration/database-settings">Database Settings →</Link>
                </div>
              </div>
              <div className="qs2-config-link">
                <Link to="/docs/configuration/config-reference">See all configuration fields →</Link>
              </div>
            </Step>

            {/* ── Step 2: Start Daemon ── */}
            <Step id="step-2" n={2} title="Start the NSB Daemon" desc="Open Terminal 1 and launch the daemon with your config file.">
              <div className="gs-step-note">From the build directory:</div>
              <CodeBlock code={`./build/nsb_daemon config.yaml`} />
              <div className="gs-step-note">Or from the install path:</div>
              <CodeBlock code={`/[your/install/path]/nsb/bin/nsb_daemon config.yaml`} />
              <div className="gs-callout gs-callout-success">
                <IconCheckCircle/>
                <span>The daemon starts up and begins listening for connections. Keep this terminal open.</span>
              </div>
            </Step>

            {/* ── Step 3: Start Mock Simulator ── */}
            <Step id="step-3" n={3} title="Start the Mock Simulator" desc="Open Terminal 2. This mock simulator fetches payloads from NSB and passes them straight through — no real network simulator needed.">
              <LangTabs
                python={
                  <>
                    <div className="qs2-file-label">simulator.py</div>
                    <CodeBlock lang="python" code={`import nsb_client as nsb
import time

# Connect to NSB as a simulator client
sim = nsb.NSBSimClient("node0", "127.0.0.1", 65432)
print("Mock simulator ready — waiting for messages...", flush=True)

while True:
    entry = sim.fetch(timeout=1)
    if entry:
        src = entry.src_id
        dst = entry.dest_id
        payload = entry.payload

        print(f"Simulating: {src} -> {dst}, payload: {payload}", flush=True)

        # For this quickstart, pass straight through.
        # In a real simulator, you would route via ns-3 or OMNeT++ here.
        sim.post(src, dst, payload)
        print("Posted payload as delivered", flush=True)
        break
    time.sleep(0.1)`} />
                    <div className="gs-callout gs-callout-info" style={{ marginBottom: '10px' }}>
                      <IconAlert/>
                      <span>
                        <code>fetch(timeout=1)</code> checks for a message and returns immediately if none is available yet — it does not mean the simulator gives up after one second. The surrounding loop keeps checking until a message arrives, so you can start the application whenever you are ready.
                      </span>
                    </div>
                    <CodeBlock code={`python3 simulator.py`} />
                  </>
                }
                cpp={
                  <>
                    <div className="qs2-file-label">sim_node.cpp</div>
                    <CodeBlock lang="cpp" code={`#include "nsb_client.h"
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    std::string server = "127.0.0.1";
    int port = 65432;

    nsb::NSBSimClient sim("node0", server, port);

    std::cout << "Mock simulator ready - waiting for messages...\\n";

    nsb::MessageEntry entry;

    while (true) {
        entry = sim.fetch(1);

        if (entry.exists()) {
            std::string src = entry.source;
            std::string dst = entry.destination;
            std::string payload = entry.payload_obj;

            std::cout << "Simulating: " << src << " -> " << dst << "\\n";

            // Pass through (in a real sim, route via simulator here)
            sim.post(src, dst, payload);

            std::cout << "Posted as delivered\\n";
            break;
        }

        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    return 0;
}`} />
                    <CodeBlock code={`g++ -std=c++17 sim_node.cpp \\
  $(pkg-config --cflags --libs nsb) \\
  -I/usr/local/nsb/include/proto \\
  -o sim_node
./sim_node`} />
                  </>
                }
              />
              <div className="gs-callout gs-callout-info">
                <IconAlert/>
                <span>Start the simulator <strong>before</strong> the application so it is ready to <code>fetch()</code> when messages arrive. Once the daemon and simulator are running, you can start the application whenever you are ready — there is no need to launch it immediately.</span>
              </div>
            </Step>

            {/* ── Step 4: Run Application ── */}
            <Step id="step-4" n={4} title="Run the Application Client" desc="Open Terminal 3. This sends a payload and waits to receive it back.">
              <LangTabs
                python={
                  <>
                    <div className="qs2-file-label">app.py</div>
                    <CodeBlock lang="python" code={`import nsb_client as nsb
import time

# Connect to NSB as an application client
app = nsb.NSBAppClient("node0", "127.0.0.1", 65432)

# Send a payload through the mock simulator
app.send("node0", b"Hello from node0!")
print("Sent payload")

# Poll for a response
print("Waiting for response...", flush=True)

while True:
    entry = app.receive()
    if entry:
        print(f"Received: {entry.payload} from {entry.src_id}", flush=True)
        break
    time.sleep(0.1)`} />
                    <CodeBlock code={`python3 app.py`} />
                  </>
                }
                cpp={
                  <>
                    <div className="qs2-file-label">app_node.cpp</div>
                    <CodeBlock lang="cpp" code={`#include "nsb_client.h"
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    std::string server = "127.0.0.1";
    int port = 65432;

    nsb::NSBAppClient app("node0", server, port);

    // Send a payload through the mock simulator
    std::string payload = "Hello from node0!";
    app.send("node0", payload);
    std::cout << "Sent payload\\n";

    // Wait and receive
    std::this_thread::sleep_for(std::chrono::seconds(1));
    nsb::MessageEntry entry = app.receive();
    if (entry.exists()) {
        std::cout << "Received: " << entry.payload_obj
                  << " from " << entry.source << "\\n";
    }
    return 0;
}`} />
                    <CodeBlock code={`g++ -std=c++17 app_node.cpp \\
  $(pkg-config --cflags --libs nsb) \\
  -I/usr/local/nsb/include/proto \\
  -o app_node
./app_node`} />
                  </>
                }
              />

              {/* Terminal order reminder */}
              <div style={{ marginTop: '20px' }}>
              <LangTabs
                python={
                  <div className="qs2-terminals" style={{ marginTop: 0 }}>
                    <div className="qs2-terminals-label">Run in this order:</div>
                    <div className="qs2-terminals-grid">
                      <div className="qs2-terminal-box">
                        <div className="qs2-terminal-num">Terminal 1</div>
                        <CodeBlock code={`./build/nsb_daemon config.yaml`} />
                      </div>
                      <div className="qs2-terminal-box">
                        <div className="qs2-terminal-num">Terminal 2</div>
                        <CodeBlock code={`python3 simulator.py`} />
                      </div>
                      <div className="qs2-terminal-box">
                        <div className="qs2-terminal-num">Terminal 3</div>
                        <CodeBlock code={`python3 app.py`} />
                      </div>
                    </div>
                  </div>
                }
                cpp={
                  <div className="qs2-terminals" style={{ marginTop: 0 }}>
                    <div className="qs2-terminals-label">Run in this order:</div>
                    <div className="qs2-terminals-grid">
                      <div className="qs2-terminal-box">
                        <div className="qs2-terminal-num">Terminal 1</div>
                        <CodeBlock code={`./build/nsb_daemon config.yaml`} />
                      </div>
                      <div className="qs2-terminal-box">
                        <div className="qs2-terminal-num">Terminal 2</div>
                        <CodeBlock code={`./sim_node`} />
                      </div>
                      <div className="qs2-terminal-box">
                        <div className="qs2-terminal-num">Terminal 3</div>
                        <CodeBlock code={`./app_node`} />
                      </div>
                    </div>
                  </div>
                }
              />
              </div>
            </Step>

            {/* ── Confirm Success (uses GS success card style) ── */}
            <div className="gs-success animate-fade-up">
              <div className="gs-section-header">
                <div className="gs-section-header-icon gs-section-header-icon-green">
                  <IconCheckCircle/>
                </div>
                <div>
                  <h2 id = "confirm-success" className="gs-section-heading">Confirm Success</h2>
                  <p className="gs-section-subheading">Check these outputs match before continuing.</p>
                </div>
              </div>

              <LangTabs
                python={
                  <div className="qs2-outputs">
                    <div className="qs2-output-col">
                      <div className="qs2-output-label">Terminal 2 (Simulator)</div>
                      <CodeBlock lang="text" code={`Mock simulator ready — waiting for messages...
Simulating: node0 -> node0, payload: b'Hello from node0!'
Posted payload as delivered`} />
                    </div>
                    <div className="qs2-output-col">
                      <div className="qs2-output-label">Terminal 3 (Application)</div>
                      <CodeBlock lang="text" code={`Sent payload
Waiting for response...
Received: b'Hello from node0!' from node0`} />
                    </div>
                  </div>
                }
                cpp={
                  <div className="qs2-outputs">
                    <div className="qs2-output-col">
                      <div className="qs2-output-label">Terminal 2 (Simulator)</div>
                      <CodeBlock lang="text" code={`Simulating: node0 -> node0
Posted as delivered`} />
                    </div>
                    <div className="qs2-output-col">
                      <div className="qs2-output-label">Terminal 3 (Application)</div>
                      <CodeBlock lang="text" code={`Sent payload
Received: Hello from node0! from node0`} />
                    </div>
                  </div>
                }
              />

              <div className="gs-success-card">
                <div className="gs-success-row">
                  <div className="gs-success-icon"><IconCheckCircle/></div>
                  <div className="gs-success-text">Message sent by application</div>
                </div>
                <div className="gs-success-row">
                  <div className="gs-success-icon"><IconCheckCircle/></div>
                  <div className="gs-success-text">Message fetched by simulator</div>
                </div>
                <div className="gs-success-row">
                  <div className="gs-success-icon"><IconCheckCircle/></div>
                  <div className="gs-success-text">Message delivered (posted back to daemon)</div>
                </div>
                <div className="gs-success-row">
                  <div className="gs-success-icon"><IconCheckCircle/></div>
                  <div className="gs-success-text">Message received by application</div>
                </div>
              </div>
            </div>

            {/* ── Step 5: Two-Node Example ── */}
            <Step id="step-5" n={5} title="Two-Node Example (Python)" desc="A complete round-trip where node0 sends to node1, and node1 replies back. This shows the full Per-Node simulator mode in action." last>

              <div className="gs-callout gs-callout-info" style={{ marginBottom: '20px' }}>
                <IconAlert/>
                <div>
                  <strong>Node 1 waits for you.</strong> Node 1 waits for an incoming message instead of exiting when no message is immediately available. This means you can start Node 1 first and start Node 0 later — you do not need to coordinate their startup timing.
                </div>
              </div>

              <div className="qs2-file-label">app_node0.py</div>
              <CodeBlock lang="python" code={`import nsb_client as nsb
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
    time.sleep(0.1)`} />

              <div className="qs2-file-label">app_node1.py</div>
              <CodeBlock lang="python" code={`import nsb_client as nsb
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
    time.sleep(0.1)`} />

              <div className="qs2-file-label">simulator.py — Per-Node, handles both nodes</div>
              <CodeBlock lang="python" code={`import nsb_client as nsb
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
            time.sleep(0.1)
            sim.post(entry.src_id, entry.dest_id, entry.payload)
            messages_processed += 1

    time.sleep(0.1)`} />

              <div className="qs2-terminals" style={{ marginTop: '24px' }}>
                <div className="qs2-terminals-label">Run the example — use four terminals:</div>
                <div className="gs-callout gs-callout-info" style={{ marginBottom: '16px' }}>
                  <IconAlert/>
                  <span>
                    Start the daemon first, then the simulator. You can start Node 1 before Node 0.
                    Node 1 waits for its incoming message, so you do not need to start Node 0 immediately.
                  </span>
                </div>
                <div className="qs2-terminals-grid" style={{ marginTop: '24px' }}>
                  <div className="qs2-terminal-box">
                    <div className="qs2-terminal-num">Terminal 1 — NSB Daemon</div>
                    <CodeBlock code={`./build/nsb_daemon config.yaml`} />
                    <div className="gs-step-note">Wait for the daemon to report that it is listening.</div>
                  </div>
                  <div className="qs2-terminal-box">
                    <div className="qs2-terminal-num">Terminal 2 — Per-Node Simulator</div>
                    <CodeBlock code={`python3 simulator.py`} />
                    <div className="gs-step-note">Wait for the simulator to print "Mock simulator ready".</div>
                  </div>
                  <div className="qs2-terminal-box">
                    <div className="qs2-terminal-num">Terminal 3 — Node 1</div>
                    <CodeBlock code={`python3 app_node1.py`} />
                    <div className="gs-step-note">Node 1 prints "[node1] Waiting for message..." and stays alive. Take your time before starting Node 0.</div>
                  </div>
                  <div className="qs2-terminal-box">
                    <div className="qs2-terminal-num">Terminal 4 — Node 0</div>
                    <CodeBlock code={`python3 app_node0.py`} />
                    <div className="gs-step-note">Start Node 0 whenever you are ready. It sends to Node 1, triggering the full round-trip.</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '28px' }}>
                <div className="qs2-terminals-label">Expected output:</div>
                <div className="gs-callout gs-callout-info" style={{ marginBottom: '16px' }}>
                  <IconAlert/>
                  <span>NSB itself may print additional <code>INFO</code> or <code>WARNING</code> log lines. The lines below are the important application-level output — your terminals will not be limited to only these lines.</span>
                </div>
                <div className="qs2-outputs">
                  <div className="qs2-output-col">
                    <div className="qs2-output-label">Terminal 2 (Simulator)</div>
                    <CodeBlock lang="text" code={`[sim] Mock simulator ready — waiting for messages...
[sim] Routing node0 -> node1
[sim] Routing node1 -> node0`} />
                  </div>
                  <div className="qs2-output-col">
                    <div className="qs2-output-label">Terminal 3 (Node 1)</div>
                    <CodeBlock lang="text" code={`[node1] Waiting for message...
[node1] Received: b'Hello, node1!'
[node1] Sent reply`} />
                  </div>
                  <div className="qs2-output-col">
                    <div className="qs2-output-label">Terminal 4 (Node 0)</div>
                    <CodeBlock lang="text" code={`[node0] Sent message
[node0] Waiting for reply...
[node0] Received reply: b'Hello back, node0!'`} />
                  </div>
                </div>
              </div>

            </Step>

          </div>{/* end gs-platform-main */}

          {/* ── Right Sidebar (mirrors GS style exactly) ── */}
          <div className="gs-platform-sidebar">

            {/* On This Page */}
            <div className="gs-sidebar-card">
              <div className="gs-sidebar-card-title">
                <IconBook/> On this page
              </div>
              <div className="gs-sidebar-toc">
                <a href="#what-you-will-build" className="gs-sidebar-toc-link">What You Will Build</a>
                <a href="#step-1" className="gs-sidebar-toc-link">1 · Create Configuration</a>
                <a href="#step-2" className="gs-sidebar-toc-link">2 · Start the Daemon</a>
                <a href="#step-3" className="gs-sidebar-toc-link">3 · Start Mock Simulator</a>
                <a href="#step-4" className="gs-sidebar-toc-link">4 · Run Application Client</a>
                <a href="#confirm-success" className="gs-sidebar-toc-link">Confirm Success</a>
                <a href="#step-5" className="gs-sidebar-toc-link">5 · Two-Node Example</a>
                <a href="#what-happened" className="gs-sidebar-toc-link">What Just Happened</a>
                <a href="#continue-learning" className="gs-sidebar-toc-link">Continue Learning</a>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="gs-sidebar-card gs-sidebar-card-checklist">
              <div className="gs-sidebar-card-title">
                <IconCheckCircle/> Prerequisites
              </div>
              <ul className="gs-sidebar-list">
                {['NSB installed & verified','Python 3.7+ or C++17','config.yaml ready','3 terminals (4 for the two-node example)'].map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div className="gs-sidebar-card gs-sidebar-card-help">
              <div className="gs-sidebar-card-title">
                <IconBolt/> Need help?
              </div>
              <p className="gs-sidebar-card-text">
                Stuck? See the Troubleshooting Guide for common issues and solutions.
              </p>
              <Link className="gs-sidebar-link gs-sidebar-link-cta" to="/docs/help/troubleshooting">
                Troubleshooting Guide <IconArrowRight/>
              </Link>
            </div>

            {/* Useful Links */}
            <div className="gs-sidebar-card">
              <div className="gs-sidebar-card-title">
                <IconExternalLink/> Useful links
              </div>
              <div className="gs-sidebar-links-list">
                <Link className="gs-sidebar-link" to="/docs/configuration/config-reference">
                  <IconSettings/> Configuration Reference <IconArrowRight/>
                </Link>
                <Link className="gs-sidebar-link" to="/docs/api-reference/python/overview">
                  <IconBook/> API Documentation <IconArrowRight/>
                </Link>
                <Link className="gs-sidebar-link" to="/tutorials">
                  <IconRocket/> Tutorials <IconArrowRight/>
                </Link>
              </div>
            </div>

          </div>
        </div>{/* end gs-platform-layout */}

        {/* ── What Just Happened ── */}
        <div className="qs2-explained animate-fade-up" id="what-happened">
          <div className="qs2-explained-banner">
            <div className="qs2-explained-icon"><IconZap/></div>
            <div>
              <div className="qs2-explained-title">You completed your first NSB co-simulation!</div>
              <div className="qs2-explained-sub">Here's what happened under the hood.</div>
            </div>
          </div>
          <div className="qs2-explained-steps">
            <div className="qs2-explained-step">
              <div className="qs2-explained-num">1</div>
              <div className="qs2-explained-text">
                <strong>Application called send()</strong> — NSB created a SEND message and transmitted it to the daemon. The daemon queued the payload, ready for the simulator to pick up.
              </div>
            </div>
            <div className="qs2-explained-step">
              <div className="qs2-explained-num">2</div>
              <div className="qs2-explained-text">
                <strong>Simulator called fetch()</strong> — the daemon responded with the queued payload. In a real integration, this is where ns-3 or OMNeT++ would route the payload through a simulated network topology with configurable latency, loss, and bandwidth.
              </div>
            </div>
            <div className="qs2-explained-step">
              <div className="qs2-explained-num">3</div>
              <div className="qs2-explained-text">
                <strong>Simulator called post()</strong> — NSB marked the payload as delivered. The daemon queued it for the destination application client.
              </div>
            </div>
            <div className="qs2-explained-step">
              <div className="qs2-explained-num">4</div>
              <div className="qs2-explained-text">
                <strong>Application called receive()</strong> — NSB returned the delivered payload. That complete loop — send → fetch → post → receive — is one NSB message round-trip.
              </div>
            </div>
          </div>
          <div className="qs2-explained-links">
            <Link className="qs2-explained-link" to="/docs/architecture/overview">
              <IconBook/> Architecture Overview
            </Link>
            <Link className="qs2-explained-link" to="/docs/architecture/message-flow">
              <IconBridge/> Message Flow
            </Link>
            <Link className="qs2-explained-link" to="/docs/architecture/payload-lifecycle">
              <IconCode/> Payload Lifecycle
            </Link>
          </div>
        </div>

        {/* ── Continue Learning ── */}
        <div className="qs2-next animate-fade-up" id="continue-learning">
          <div className="gs-section-header">
            <div className="gs-section-header-icon">
              <IconBook/>
            </div>
            <div>
              <h2 className="gs-section-heading">Continue Learning</h2>
              <p className="gs-section-subheading">Explore the full NSB documentation and tutorials.</p>
            </div>
          </div>

          <div className="qs2-cat-grid">

            {/* Learn NSB Fundamentals */}
            <div className="qs2-cat-card qs2-cat-card-green">
              <div className="qs2-cat-icon qs2-cat-icon-green"><IconBook/></div>
              <div className="qs2-cat-title">Learn NSB Fundamentals</div>
              <div className="qs2-cat-desc">Understand the core concepts, architecture, and how NSB components work together.</div>
              <ul className="qs2-cat-links">
                <li><Link to="/docs/architecture/overview">Architecture Overview</Link></li>
                <li><Link to="/docs/architecture/message-flow">Message Flow</Link></li>
                <li><Link to="/docs/architecture/deep-architecture">Deep Architecture</Link></li>
              </ul>
              <Link className="qs2-cat-btn qs2-cat-btn-green" to="/docs/architecture/overview">
                Explore Fundamentals <IconArrowRight/>
              </Link>
            </div>

            {/* Configure NSB */}
            <div className="qs2-cat-card qs2-cat-card-blue">
              <div className="qs2-cat-icon qs2-cat-icon-blue"><IconSettings/></div>
              <div className="qs2-cat-title">Configure NSB</div>
              <div className="qs2-cat-desc">Learn how to configure NSB to fit your simulation requirements and environment.</div>
              <ul className="qs2-cat-links">
                <li><Link to="/docs/configuration/overview">Configuration Overview</Link></li>
                <li><Link to="/docs/configuration/system-modes">System Modes</Link></li>
                <li><Link to="/docs/configuration/simulator-modes">Simulator Modes</Link></li>
                <li><Link to="/docs/configuration/database-settings">Database Settings</Link></li>
              </ul>
              <Link className="qs2-cat-btn qs2-cat-btn-blue" to="/docs/configuration/overview">
                Explore Configuration <IconArrowRight/>
              </Link>
            </div>

            {/* Develop with NSB */}
            <div className="qs2-cat-card qs2-cat-card-purple">
              <div className="qs2-cat-icon qs2-cat-icon-purple"><IconCode/></div>
              <div className="qs2-cat-title">Develop with NSB</div>
              <div className="qs2-cat-desc">Use NSB APIs and libraries to build applications and simulators.</div>
              <ul className="qs2-cat-links">
                <li><Link to="/docs/api-reference/python/overview">Python API</Link></li>
                <li><Link to="/docs/api-reference/cpp/setup">C++ API</Link></li>
                <li><Link to="/docs/api-reference/cpp/message-entry">MessageEntry Reference</Link></li>
              </ul>
              <Link className="qs2-cat-btn qs2-cat-btn-purple" to="/docs/api-reference/python/overview">
                Explore Development <IconArrowRight/>
              </Link>
            </div>

            {/* Integrate Simulators */}
            <div className="qs2-cat-card qs2-cat-card-gold">
              <div className="qs2-cat-icon qs2-cat-icon-gold"><IconBridge/></div>
              <div className="qs2-cat-title">Integrate Simulators</div>
              <div className="qs2-cat-desc">Integrate NSB with popular network simulators and frameworks.</div>
              <ul className="qs2-cat-links">
                <li><Link to="/docs/integrations/system-wide-vs-per-node">System-Wide vs Per-Node</Link></li>
                <li><Link to="/docs/integrations/ns3-overview">ns-3 Overview</Link></li>
                <li><Link to="/docs/integrations/omnet-overview">OMNET++ Overview</Link></li>
              </ul>
              <Link className="qs2-cat-btn qs2-cat-btn-gold" to="/docs/integrations/system-wide-vs-per-node">
                Explore Integrations <IconArrowRight/>
              </Link>
            </div>

            {/* Tutorials & Examples */}
            <div className="qs2-cat-card qs2-cat-card-teal">
              <div className="qs2-cat-icon qs2-cat-icon-teal"><IconRocket/></div>
              <div className="qs2-cat-title">Tutorials &amp; Examples</div>
              <div className="qs2-cat-desc">Step-by-step tutorials to help you get hands-on with NSB.</div>
              <ul className="qs2-cat-links">
                <li><Link to="/tutorials">All Tutorials</Link></li>
                <li><Link to="/tutorials/beginner/experiment-with-the-mock-simulator">Example Applications</Link></li>
                <li><Link to="/tutorials/intermediate/networkx-graph-simulator">Code Samples</Link></li>
              </ul>
              <Link className="qs2-cat-btn qs2-cat-btn-teal" to="/tutorials">
                Explore Tutorials <IconArrowRight/>
              </Link>
            </div>

            {/* Advanced Topics */}
            <div className="qs2-cat-card qs2-cat-card-green2">
              <div className="qs2-cat-icon qs2-cat-icon-green2"><IconZap/></div>
              <div className="qs2-cat-title">Advanced Topics</div>
              <div className="qs2-cat-desc">Deep dive into advanced features and backend implementations.</div>
              <ul className="qs2-cat-links">
                <li><Link to="/docs/backends/rabbitmq-backend">RabbitMQ Backend</Link></li>
                <li><Link to="/docs/backends/rabbitmq-enhancements">RabbitMQ Enhancements</Link></li>
                <li><Link to="/docs/protocol/protobuf-schema">Protobuf Reference</Link></li>
              </ul>
              <Link className="qs2-cat-btn qs2-cat-btn-green2" to="/docs/backends/rabbitmq-backend">
                Explore Advanced <IconArrowRight/>
              </Link>
            </div>

          </div>
        </div>

        {/* ── Need Help ── */}
        <div className="qs2-help animate-fade-up" id="need-help">
          <div className="gs-section-header">
            <div className="gs-section-header-icon">
              <IconHelp/>
            </div>
            <div>
              <h2 className="gs-section-heading">Need Help?</h2>
              <p className="gs-section-subheading">Get assistance and find answers to common questions.</p>
            </div>
          </div>

          <div className="qs2-help-grid">
            <div className="qs2-help-card qs2-help-card-gold">
              <div className="qs2-help-card-top">
                <div className="qs2-help-icon qs2-help-icon-gold">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                </div>
                <div>
                  <div className="qs2-help-card-title">Troubleshooting Guide</div>
                  <div className="qs2-help-card-desc">Common issues, error messages, and step-by-step solutions.</div>
                </div>
              </div>
              <Link className="qs2-help-btn qs2-help-btn-gold" to="/docs/help/troubleshooting">
                View Troubleshooting <IconArrowRight/>
              </Link>
            </div>

            <div className="qs2-help-card qs2-help-card-blue">
              <div className="qs2-help-card-top">
                <div className="qs2-help-icon qs2-help-icon-blue">
                  <IconHelp/>
                </div>
                <div>
                  <div className="qs2-help-card-title">Frequently Asked Questions</div>
                  <div className="qs2-help-card-desc">Answers to frequently asked questions about NSB concepts and usage.</div>
                </div>
              </div>
              <Link className="qs2-help-btn qs2-help-btn-blue" to="/docs/help/faq">
                View FAQ <IconArrowRight/>
              </Link>
            </div>
          </div>
        </div>

                {/* ── Final CTA (mirrors GS exactly) ── */}
        <div className="gs-cta animate-fade-up">
          <div className="gs-cta-card">
            <div className="gs-cta-left">
              <div className="gs-cta-eyebrow">You're all set</div>
              <div className="gs-cta-title">Explore the full documentation</div>
              <div className="gs-cta-desc">
                Dive deeper into architecture, configuration, API references, and real simulator integrations.
              </div>
            </div>
            <div className="gs-cta-right">
              <Link className="gs-btn-primary gs-cta-btn" to="/docs">
                Browse Docs <IconArrowRight/>
              </Link>
              <div className="gs-cta-icon-bg">
                <IconRocket/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}