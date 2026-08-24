import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import '../css/get-started.css';

/* ─────────────────────────── Icons ─────────────────────────── */

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconAlert = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconCopy = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="12" x2="22" y2="12" />
    <polyline points="14 5 21 12 14 19" />
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconBridge = () => (
  <svg
    width="54"
    height="54"
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Deck */}
    <line x1="3" y1="18" x2="25" y2="18" strokeWidth="1.4"/>

    {/* Towers */}
    <line x1="10" y1="18" x2="10" y2="6" strokeWidth="1.6"/>
    <line x1="18" y1="18" x2="18" y2="6" strokeWidth="1.6"/>

    {/* Suspension cable */}
    <path d="M3 11 C7 11 9 8 10 6 C11.5 10 16.5 10 18 6 C19 8 21 11 25 11" strokeWidth="1.4"/>

    {/* Hangers */}
    <line x1="7" y1="11" x2="7" y2="18" strokeWidth="1.0"/>
    <line x1="12.5" y1="10" x2="12.5" y2="18" strokeWidth="1.0"/>
    <line x1="15.5" y1="10" x2="15.5" y2="18" strokeWidth="1.0"/>
    <line x1="21" y1="11" x2="21" y2="18" strokeWidth="1.0"/>

    {/* Bottom rods (stands) */}
    <line x1="10" y1="18" x2="10" y2="22" strokeWidth="1.2"/>
    <line x1="18" y1="18" x2="18" y2="22" strokeWidth="1.2"/>

    {/* Feet */}
    <line x1="8.5" y1="22" x2="11.5" y2="22" strokeWidth="1.2"/>
    <line x1="16.5" y1="22" x2="19.5" y2="22" strokeWidth="1.2"/>
  </svg>
);



const IconNetSim = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"/>
    <circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/>
    <circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/>
    <line x1="6" y1="6" x2="10" y2="11"/><line x1="18" y1="6" x2="14" y2="11"/>
    <line x1="6" y1="18" x2="10" y2="13"/><line x1="18" y1="18" x2="14" y2="13"/>
  </svg>
);
const IconNetwork = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="5.5" y2="17"/><line x1="12" y1="7" x2="18.5" y2="17"/>
  </svg>
);
const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const IconBook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconCode = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconPackage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);
const IconExternalLink = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconRocket = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

/* ─────────────────────── Copy-to-clipboard code block ─────────────────────── */

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

/* ─────────────────────────── Step wrapper ─────────────────────────── */

function Step({
  n, title, desc, last = false, children,
}: {
  n: number;
  title: string;
  desc?: string;
  last?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="gs-step">
      <div className="gs-step-left">
        <div className="gs-step-num">{n}</div>
        {!last && <div className="gs-step-connector" />}
      </div>
      <div className="gs-step-card">
        <div className="gs-step-title">{title}</div>
        {desc && <div className="gs-step-desc">{desc}</div>}
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

type Platform = 'macos' | 'linux' | 'windows';

export default function GetStarted() {
  const [platform, setPlatform] = useState<Platform>('macos');

  return (
    <Layout
      title="Get Started — NSB"
      description="Install NSB and prepare your environment in just a few minutes."
    >
      <div className="gs-page">

        {/* ── Hero ── */}
        <div className="gs-hero animate-fade-up">
          <div className="gs-hero-left">
            <div className="gs-stage-badge">
              <span className="gs-stage-dot" />
              Stage 1 &bull; Setup Environment
            </div>
            <h1 className="gs-hero-title">Get Started with NSB</h1>
            <p className="gs-hero-sub">
              Install NSB and prepare your environment in just a few minutes.
              Pick your platform, install dependencies, build from source,
              and verify each step before moving on.
            </p>
            <div className="gs-hero-actions">
              <Link className="gs-btn-primary" to="/quickstart">
                Continue to Quickstart <IconArrowRight/>
              </Link>
              <Link className="gs-btn-secondary" to="/docs">
                Browse Documentation
              </Link>
            </div>
            <div className="gs-hero-meta">
              <span className="gs-hero-meta-item">
                <IconClock/> Estimated time: 10–15 minutes
              </span>
              <span className="gs-hero-meta-sep" />
              <span className="gs-hero-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                macOS &bull; Linux &bull; Windows (WSL2)
              </span>
            </div>
          </div>

          <div className="gs-hero-right">
            <div className="gs-hero-flow-card">
              <div className="gs-hero-flow-label">How NSB Connects</div>
              <div className="gs-hero-flow-nodes">
                <div className="gs-hero-flow-node gs-hero-flow-node-app">
                  <div className="gs-hero-flow-icon"><IconMonitor/></div>
                  <div className="gs-hero-flow-node-label">Application</div>
                </div>
                <div className="gs-hero-flow-arrow"><IconArrowRight/></div>
                <div className="gs-hero-flow-node gs-hero-flow-node-nsb">
                  <div className="gs-hero-flow-icon"><IconBridge/></div>
                  <div>
                    <div className="gs-hero-flow-node-label">NSB</div>
                    <div className="gs-hero-flow-node-sub">(Daemon)</div>
                  </div>
                </div>
                <div className="gs-hero-flow-arrow"><IconArrowRight/></div>
                <div className="gs-hero-flow-node gs-hero-flow-node-sim">
                  <div className="gs-hero-flow-icon"><IconNetSim/></div>
                  <div className="gs-hero-flow-node-label">Network<br/>Simulator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── What is NSB ── */}
        <div className="gs-whatis animate-fade-up animate-delay-1">
          <div className="gs-whatis-body">
            <p className="gs-whatis-text">
              NSB (Network Simulation Bridge) is open-source middleware that connects
              real applications to network simulators. It lets your application send
              and receive messages through a simulated network without changing your
              application code.
            </p>
            <Link className="gs-whatis-learn" to="/docs/introduction/what-is-nsb">
              Learn more in the docs →
            </Link>
          </div>
        </div>

        {/* ── What You'll Need ── */}
        <div id="what-youll-need" className="gs-needs animate-fade-up animate-delay-2">
          <div className="gs-section-header">
            <div className="gs-section-header-icon"><IconPackage/></div>
            <div>
              <h2 className="gs-section-heading">What You'll Need</h2>
              <p className="gs-section-subheading">
                The following packages must be installed before building NSB.
                Also requires Python 3.7+ or a C++17 compiler.
              </p>
            </div>
          </div>
          <div className="gs-needs-table">
            <div className="gs-needs-row gs-needs-row-head">
              <div>Package</div>
              <div>Purpose</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">CMake</div>
              <div>Configure and build the project</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">pkg-config</div>
              <div>Package configuration (required on macOS)</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">Protobuf</div>
              <div>Message serialization</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">Redis</div>
              <div>In-memory storage of payloads via Redis server</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">Abseil</div>
              <div>Required for Protobuf support and logging</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">yaml-cpp</div>
              <div>Parses YAML configuration files</div>
            </div>
            <div className="gs-needs-row">
              <div className="gs-needs-pkg">hiredis</div>
              <div>C client library to connect to the Redis server</div>
            </div>
          </div>
          <div className="gs-callout gs-callout-warn">
            <IconAlert/>
            <span>
              If you have a previous installation of gRPC (which bundles Protobuf),
              conflicting Protobuf versions may cause build errors.
              Use the platform-specific instructions below to manage this.
            </span>
          </div>
        </div>

        {/* ── Installation ── */}
        <div  id="installation" className="gs-platform animate-fade-up animate-delay-3">
          <div className="gs-section-header">
            <div className="gs-section-header-icon"><IconShield/></div>
            <div>
              <h2 className="gs-section-heading">Installation</h2>
              <p className="gs-section-subheading">
                Choose your platform and follow the steps.
              </p>
            </div>
          </div>

          <div className="gs-platform-layout">
            <div className="gs-platform-main">
              <div className="gs-tabs">
                <button
                  className={`gs-tab${platform === 'macos' ? ' active' : ''}`}
                  onClick={() => setPlatform('macos')}
                >
                  macOS
                </button>
                <button
                  className={`gs-tab${platform === 'linux' ? ' active' : ''}`}
                  onClick={() => setPlatform('linux')}
                >
                  Linux (Ubuntu 24.04)
                </button>
                <button
                  className={`gs-tab${platform === 'windows' ? ' active' : ''}`}
                  onClick={() => setPlatform('windows')}
                >
                  Windows (WSL2)
                </button>
              </div>

              <div className="gs-tab-panel">

                {/* ════════════ macOS ════════════ */}
                {platform === 'macos' && (
                  <div className="gs-tab-content">

                    <Step
                      n={1}
                      title="Install Dependencies"
                      desc="Install all prerequisites in a single command using Homebrew."
                    >
                      <CodeBlock code={`brew install cmake pkg-config abseil protobuf yaml-cpp redis hiredis`} />
                    </Step>

                    <Step
                      n={2}
                      title="Clone and Build NSB"
                      desc="Clone the repository, create the build directory, and configure with CMake."
                    >
                      <CodeBlock code={`git clone https://github.com/nsb-ucsc/nsb_beta.git
cd nsb_beta`} />
                      <div className="gs-step-note">Create the build directory at the top level of the project:</div>
                      <CodeBlock code={`mkdir build`} />
                      <div className="gs-step-note">Your directory should now look like:</div>
                      <div className="gs-codeblock gs-codeblock-tree">
                        <div className="gs-codeblock-top">
                          <span className="gs-codeblock-lang">text</span>
                        </div>
                        <pre className="gs-codeblock-pre"><code>{`nsb/
├── build/
├── proto/
├── python/
├── cpp/
├── CMakeLists.txt
├── config.yaml
└── README.md`}</code></pre>
                      </div>
                      <CodeBlock code={`cd build
cmake ..
cmake --build . --parallel`} />
                      <div className="gs-step-note">For a clean rebuild instead, use <code>cmake --build . --clean-first</code>.</div>
                      <div className="gs-expected">
                        <div className="gs-expected-label">Expected output</div>
                        <CodeBlock lang="text" code={`[cmake] -- Checking target libraries:
[cmake] -- ✓ Found target: yaml-cpp::yaml-cpp
[cmake] -- ✓ Found target: protobuf::libprotobuf
[cmake] -- ✓ Found target: absl::base
[cmake] -- ✓ Found target: absl::log
[cmake] -- ✓ Found target: absl::time
[cmake] -- ✓ Found target: absl::log_internal_check_op
[cmake] -- ✓ Found target: absl::log_initialize
[cmake] -- ✓ Found target: PkgConfig::hiredis`} />
                      </div>
                    </Step>

                    <Step
                      n={3}
                      title="Install NSB"
                      desc="Install the compiled library, headers, and daemon binary."
                    >
                      <CodeBlock code={`cmake --install .`} />
                      <div className="gs-step-note">Installed to:</div>
                      <div className="gs-needs-table gs-needs-table-compact">
                        <div className="gs-needs-row gs-needs-row-head">
                          <div>Type</div>
                          <div>Location</div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">Library</div>
                          <div><code>[install_path]/nsb/lib/libnsb.*</code></div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">Headers</div>
                          <div><code>[install_path]/nsb/include/</code></div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">NSB Daemon</div>
                          <div><code>[install_path]/nsb/bin/nsb_daemon</code></div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">pkg-config</div>
                          <div><code>[install_path]/lib/pkgconfig/nsb.pc</code></div>
                        </div>
                      </div>
                    </Step>

                    <Step
                      n={4}
                      title="Python Setup"
                      desc="Install the Python client library in development mode."
                    >
                      <CodeBlock code={`cd python/
pip install -r requirements.txt
pip install -e .
echo 'export PYTHONPATH="\${PYTHONPATH}:/.../nsb/python"' >> ~/.zshrc`} />
                    </Step>

                    <Step
                      n={5}
                      title="Verify Installation"
                      desc="Start the daemon with a valid configuration file to confirm the installation works correctly."
                      last
                    >
                      <div className="gs-step-note">
                        The NSB daemon expects a configuration file path as its argument. Starting it
                        successfully with a valid <code>config.yaml</code> is the correct way to verify
                        the daemon installation.
                      </div>
                      <CodeBlock code={`/[your/install/path]/nsb/bin/nsb_daemon config.yaml`} />
                      <div className="gs-callout gs-callout-success">
                        <IconCheckCircle/>
                        <span>
                          Expected: the daemon loads the configuration and reports that it is listening.
                          You should see output similar to:
                        </span>
                      </div>
                      <CodeBlock lang="text" code={`[...] (info) Starting daemon...
[...] (info) Server started on port 65432`} />
                      <div className="gs-step-note" style={{ marginTop: '16px' }}>Test the Python proto bindings:</div>
                      <CodeBlock lang="python" code={`python3 - <<'EOF'
import proto.nsb_pb2 as nsb_pb2
print("NSB Python proto loaded from:", nsb_pb2.__file__)
EOF`} />
                      <div className="gs-callout gs-callout-success">
                        <IconCheckCircle/>
                        <span>Expected: prints the proto file path without error.</span>
                      </div>
                    </Step>

                  </div>
                )}

                {/* ════════════ Linux ════════════ */}
                {platform === 'linux' && (
                  <div className="gs-tab-content">

                    <div className="gs-callout gs-callout-warn" style={{ marginBottom: '8px' }}>
                      <IconAlert/>
                      <span>
                        Linux requires building Abseil and Protobuf from source — the versions
                        available via <code>apt</code> may be too old. Follow these steps carefully and in order.
                      </span>
                    </div>

                    <Step
                      n={1}
                      title="Install System Packages"
                      desc="Update apt and install all required system dependencies."
                    >
                      <CodeBlock code={`sudo apt update
sudo apt install -y \\
  build-essential \\
  cmake \\
  pkg-config \\
  libsqlite3-dev \\
  libyaml-cpp-dev \\
  libhiredis-dev \\
  python3 \\
  python3-pip \\
  redis-server \\
  git`} />
                    </Step>

                    <Step
                      n={2}
                      title="Build & Install Abseil (LTS 20240116.0)"
                      desc="Linux requires building Abseil from source — the apt version is too old."
                    >
                      <CodeBlock code={`cd ~
git clone --depth 1 --branch 20240116.0 https://github.com/abseil/abseil-cpp.git
cd abseil-cpp
mkdir build && cd build
cmake .. \\
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \\
  -DCMAKE_CXX_STANDARD=17 \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DABSL_ENABLE_INSTALL=ON \\
  -DBUILD_TESTING=OFF
cmake --build . --parallel
sudo cmake --install .
sudo ldconfig`} />
                      <div className="gs-step-note">Sanity check:</div>
                      <CodeBlock code={`ls /usr/local/lib/libabsl_log* /usr/local/lib/libabsl_base* 2>/dev/null`} />
                    </Step>

                    <Step
                      n={3}
                      title="Build & Install Protobuf v27.5"
                      desc="Linux also requires building Protobuf from source."
                    >
                      <CodeBlock code={`cd ~
wget https://github.com/protocolbuffers/protobuf/releases/download/v27.5/protobuf-27.5.tar.gz
tar -xvf protobuf-27.5.tar.gz
cd protobuf-27.5
mkdir build && cd build
cmake .. \\
  -DCMAKE_BUILD_TYPE=Release \\
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \\
  -Dprotobuf_BUILD_SHARED_LIBS=ON \\
  -Dprotobuf_BUILD_TESTS=OFF \\
  -Dprotobuf_ABSL_PROVIDER=package \\
  -DCMAKE_CXX_STANDARD=17 \\
  -DCMAKE_INSTALL_PREFIX=/usr/local
cmake --build . --parallel
sudo cmake --install .
sudo ldconfig`} />
                      <div className="gs-step-note">Sanity check:</div>
                      <CodeBlock code={`which protoc
protoc --version      # Expect: libprotoc 27.5
ls /usr/local/lib/libprotobuf.so*`} />
                    </Step>

                    <Step
                      n={4}
                      title="Build & Install NSB"
                      desc="Clone the repository and build with the Linux-specific CMake config."
                    >
                      <CodeBlock code={`git clone https://github.com/nsb-ucsc/nsb_beta.git
cd nsb_beta
# Linux: use the Linux-specific CMakeLists
cp LinuxCMakeLists.txt CMakeLists.txt
mkdir build && cd build
cmake -DProtobuf_PROTOC_EXECUTABLE=/usr/local/bin/protoc ..
cmake --build . --parallel`} />
                      <div className="gs-expected">
                        <div className="gs-expected-label">Expected output</div>
                        <CodeBlock lang="text" code={`[cmake] -- Checking target libraries:
[cmake] -- ✓ Found target: yaml-cpp::yaml-cpp
[cmake] -- ✓ Found target: protobuf::libprotobuf
[cmake] -- ✓ Found target: absl::base
[cmake] -- ✓ Found target: absl::log
[cmake] -- ✓ Found target: absl::time
[cmake] -- ✓ Found target: absl::log_internal_check_op
[cmake] -- ✓ Found target: absl::log_initialize
[cmake] -- ✓ Found target: PkgConfig::hiredis`} />
                      </div>
                      <div className="gs-step-note">Install (Linux requires sudo and ldconfig):</div>
                      <CodeBlock code={`sudo cmake --install .
sudo ldconfig`} />
                      <div className="gs-step-note">Linux install locations:</div>
                      <div className="gs-needs-table gs-needs-table-compact">
                        <div className="gs-needs-row gs-needs-row-head">
                          <div>Type</div>
                          <div>Location</div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">Library</div>
                          <div><code>/usr/local/nsb/lib/libnsb.so</code></div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">Headers</div>
                          <div><code>/usr/local/nsb/include/</code></div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">NSB Daemon</div>
                          <div><code>/usr/local/nsb/bin/nsb_daemon</code></div>
                        </div>
                        <div className="gs-needs-row">
                          <div className="gs-needs-pkg">Python proto</div>
                          <div><code>/usr/local/nsb/bin/python_proto/</code></div>
                        </div>
                      </div>
                    </Step>

                    <Step
                      n={5}
                      title="Python Setup"
                      desc="Install the Python client library and set the proto stub path."
                    >
                      <CodeBlock code={`cd python/
pip install -r requirements.txt
pip install -e .`} />
                      <div className="gs-step-note">Set the Python path for generated proto stubs:</div>
                      <CodeBlock code={`export PYTHONPATH=/path/to/nsb_beta/build/generated/python:$PYTHONPATH
# To persist:
echo 'export PYTHONPATH=/path/to/nsb_beta/build/generated/python:$PYTHONPATH' >> ~/.bashrc
source ~/.bashrc`} />
                      <div className="gs-step-note">Or copy the stubs directly:</div>
                      <CodeBlock code={`cp -r build/generated/python/proto python/`} />
                    </Step>

                    <Step
                      n={6}
                      title="Verify Installation"
                      desc="Start the daemon with a valid configuration file to confirm the installation works correctly."
                      last
                    >
                      <div className="gs-step-note">
                        The NSB daemon expects a configuration file path as its argument. Starting it
                        successfully with a valid <code>config.yaml</code> is the correct way to verify
                        the daemon installation.
                      </div>
                      <CodeBlock code={`/usr/local/nsb/bin/nsb_daemon config.yaml`} />
                      <div className="gs-callout gs-callout-success">
                        <IconCheckCircle/>
                        <span>
                          Expected: the daemon loads the configuration and reports that it is listening.
                          You should see output similar to:
                        </span>
                      </div>
                      <CodeBlock lang="text" code={`[...] (info) Starting daemon...
[...] (info) Server started on port 65432`} />
                      <div className="gs-step-note" style={{ marginTop: '16px' }}>Test the Python proto bindings:</div>
                      <CodeBlock lang="python" code={`python3 - <<'EOF'
import proto.nsb_pb2 as nsb_pb2
print("NSB Python proto loaded from:", nsb_pb2.__file__)
EOF`} />
                      <div className="gs-callout gs-callout-success">
                        <IconCheckCircle/>
                        <span>Expected: prints the proto file path without error.</span>
                      </div>
                    </Step>
                  </div>
                )}

                {/* ════════════ Windows / WSL2 ════════════ */}
                {platform === 'windows' && (
                  <div className="gs-tab-content">
                    <div className="gs-callout gs-callout-warn" style={{ marginBottom: '28px' }}>
                      <IconAlert/>
                      <span>
                        Windows native support via vcpkg is coming soon. The current recommended
                        path for Windows users is <strong>WSL2 with Ubuntu 24.04</strong>.
                      </span>
                    </div>

                    <Step
                      n={1}
                      title="Install WSL2 with Ubuntu 24.04"
                      desc="Run this command in PowerShell or Windows Terminal as Administrator."
                    >
                      <CodeBlock lang="powershell" code={`wsl --install -d Ubuntu-24.04`} />
                      <div className="gs-callout gs-callout-info" style={{ marginTop: '12px' }}>
                        <IconAlert/>
                        <span>
                          After installation, restart your machine and open the Ubuntu 24.04 app from the Start menu to complete setup.
                        </span>
                      </div>
                    </Step>

                    <Step
                      n={2}
                      title="Follow the Linux (Ubuntu 24.04) Steps"
                      desc="Once inside your WSL2 Ubuntu terminal, all paths and commands are identical to the Linux tab."
                    >
                      <div className="gs-callout gs-callout-success">
                        <IconCheckCircle/>
                        <span>
                          Switch to the <strong>Linux (Ubuntu 24.04)</strong> tab and follow Steps 1–6 exactly.
                          Everything works the same inside a WSL2 terminal.
                        </span>
                      </div>
                      <button
                        className="gs-switch-tab-btn"
                        onClick={() => setPlatform('linux')}
                      >
                        Switch to Linux Tab <IconArrowRight/>
                      </button>
                    </Step>

                    <Step
                      n={3}
                      title="Access Your Files from Windows"
                      desc="Your WSL2 home directory is accessible from Windows Explorer."
                      last
                    >
                      <CodeBlock lang="text" code={`\\\\wsl$\\Ubuntu-24.04\\home\\<your-username>\\`} />
                      <div className="gs-step-note">
                        You can also open Windows Explorer from any WSL2 directory by running:
                      </div>
                      <CodeBlock code={`explorer.exe .`} />
                    </Step>
                  </div>
                )}

              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="gs-platform-sidebar">

              <div className="gs-sidebar-card gs-sidebar-card-checklist">
                <div className="gs-sidebar-card-title">
                  <IconCheckCircle/> Prerequisites Checklist
                </div>
                <ul className="gs-sidebar-list">
                  <li>CMake</li>
                  <li>pkg-config</li>
                  <li>Protobuf</li>
                  <li>Redis</li>
                  <li>Abseil</li>
                  <li>yaml-cpp</li>
                  <li>hiredis</li>
                </ul>
              </div>

              <div className="gs-sidebar-card">
                <div className="gs-sidebar-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  On This Page
                </div>
                <div className="gs-sidebar-toc">
                  <a className="gs-sidebar-toc-link" href="#what-youll-need">What You'll Need</a>
                  <a className="gs-sidebar-toc-link" href="#installation">Installation (by platform)</a>
                  <a className="gs-sidebar-toc-link" href="#success-checkpoint">Success Checkpoint</a>
                  <a className="gs-sidebar-toc-link" href="#common-issues">Common Issues</a>
                  <a className="gs-sidebar-toc-link" href="#next-step">Next Step</a>
                </div>
              </div>

              <div className="gs-sidebar-card gs-sidebar-card-help">
                <div className="gs-sidebar-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Need Help?
                </div>
                <p className="gs-sidebar-card-text">
                  See the Troubleshooting Guide for detailed solutions to common build and installation errors.
                </p>
                <Link className="gs-sidebar-link gs-sidebar-link-cta" to="/docs/help/troubleshooting">
                  Troubleshooting Guide <IconArrowRight/>
                </Link>
              </div>

              <div className="gs-sidebar-card">
                <div className="gs-sidebar-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Useful Links
                </div>
                <div className="gs-sidebar-links-list">
                  <a className="gs-sidebar-link" href="https://github.com/nsb-ucsc/nsb_beta" target="_blank" rel="noopener noreferrer">
                    <IconGithub/> NSB on GitHub <IconExternalLink/>
                  </a>
                  <Link className="gs-sidebar-link" to="docs/api-reference/python/overview">
                    <IconBook/> API Documentation <IconArrowRight/>
                  </Link>

                  <Link className="gs-sidebar-link" to="docs/help/uninstallation">
                    <IconCode/> Uninstallation <IconArrowRight/>
                  </Link>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Success Checkpoint ── */}
        <div className="gs-success animate-fade-up animate-delay-4" id="success-checkpoint">
          <div className="gs-section-header">
            <div className="gs-section-header-icon gs-section-header-icon-green"><IconCheckCircle/></div>
            <div>
              <h2 className="gs-section-heading">Success Checkpoint</h2>
              <p className="gs-section-subheading">
                Confirm all steps before continuing to the Quickstart.
              </p>
            </div>
          </div>
          <div className="gs-success-card">
            <div className="gs-success-row">
              <div className="gs-success-icon"><IconCheckCircle/></div>
              <div className="gs-success-text">Dependencies installed without errors</div>
            </div>
            <div className="gs-success-row">
              <div className="gs-success-icon"><IconCheckCircle/></div>
              <div className="gs-success-text">Build successful — all targets found</div>
            </div>
            <div className="gs-success-row">
              <div className="gs-success-icon"><IconCheckCircle/></div>
              <div className="gs-success-text">Installation completed — NSB daemon ready</div>
            </div>
            <div className="gs-success-row">
              <div className="gs-success-icon"><IconCheckCircle/></div>
              <div className="gs-success-text">Verification passed — daemon starts and Python proto loads</div>
            </div>
          </div>
        </div>

        {/* ── Common Issues ── */}
        <div className="gs-issues animate-fade-up animate-delay-4" id="common-issues">
          <div className="gs-section-header">
            <div className="gs-section-header-icon gs-section-header-icon-gold"><IconAlert/></div>
            <div>
              <h2 className="gs-section-heading">Common Issues</h2>
              <p className="gs-section-subheading">
                The most frequently encountered problems during installation.{' '}
              </p>
            </div>
          </div>
          <div className="gs-issues-list">

            <div className="gs-issue-card">
              <div className="gs-issue-favicon gs-issue-favicon-amber">
                <span>CM</span>
              </div>
              <div className="gs-issue-title">cmake says "could not find Protobuf"</div>
              <div className="gs-issue-body">
                CMake cannot locate Protobuf. Verify the required version is installed and rebuild your project configuration.
              </div>
              <Link className="gs-issue-action" to="/docs/help/troubleshooting#cmake-says-could-not-find-protobuf">
                View solution <IconArrowRight/>
              </Link>
            </div>

            <div className="gs-issue-card">
              <div className="gs-issue-favicon gs-issue-favicon-teal">
                <span>gP</span>
              </div>
              <div className="gs-issue-title">gRPC / Protobuf version conflict</div>
              <div className="gs-issue-body">
                Older gRPC installations may introduce conflicting Protobuf headers. Remove previous installations and rebuild.
              </div>
              <Link className="gs-issue-action" to="/docs/help/troubleshooting#grpc--protobuf-version-conflict">
                View solution <IconArrowRight/>
              </Link>
            </div>

            <div className="gs-issue-card">
              <div className="gs-issue-favicon gs-issue-favicon-blue">
                <span>Py</span>
              </div>
              <div className="gs-issue-title">Python proto import fails</div>
              <div className="gs-issue-body">
                Generated Python proto bindings are not being discovered. Verify your PYTHONPATH and generated files.
              </div>
              <Link className="gs-issue-action" to="/docs/help/troubleshooting#python-proto-import-fails">
                View solution <IconArrowRight/>
              </Link>
            </div>

            <div className="gs-issue-card">
              <div className="gs-issue-favicon gs-issue-favicon-gray">
                <span>NSB</span>
              </div>
              <div className="gs-issue-title">nsb_daemon: command not found</div>
              <div className="gs-issue-body">
                The daemon binary is not available from your current shell. Use the installation path or update PATH.
              </div>
              <Link className="gs-issue-action" to="/docs/help/troubleshooting#nsb_daemon-command-not-found">
                View solution <IconArrowRight/>
              </Link>
            </div>

          </div>
          <div className="gs-issues-more">
            <Link className="gs-sidebar-link" to="/docs/help/troubleshooting">
              View all troubleshooting topics <IconArrowRight/>
            </Link>
          </div>
        </div>

        {/* ── Final CTA ── */}
        <div className="gs-cta animate-fade-up animate-delay-5" id="next-step">
          <div className="gs-cta-card">
            <div className="gs-cta-glow" />
            <div className="gs-cta-left">
              <div className="gs-cta-eyebrow">Ready for your first simulation?</div>
              <div className="gs-cta-title">Continue to Quickstart</div>
              <div className="gs-cta-desc">
                Launch NSB, start a mock simulator, and send your first message in under 10 minutes.
              </div>
            </div>
            <div className="gs-cta-right">
              <Link className="gs-btn-primary gs-cta-btn" to="/quickstart">
                Start Quickstart <IconArrowRight/>
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