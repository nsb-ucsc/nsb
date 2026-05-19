#!/bin/bash
set -e # Exit immediately on error

# If running as root (e.g. Docker), make sudo a no-op
if [ "$(id -u)" -eq 0 ]; then
  sudo() { "$@"; }
  export -f sudo
fi

echo "=== NSB Installation Script (Ubuntu) ==="

# ── 1. System Packages ──────────────────────────────────────────────────────
echo "[1/7] Installing system packages..."
sudo apt update
sudo apt install -y \
  build-essential \
  cmake \
  pkg-config \
  libsqlite3-dev \
  libyaml-cpp-dev \
  libhiredis-dev \
  python3 \
  python3-pip \
  redis-server \
  git \
  wget

pip install protobuf --break-system-packages

# ── 2. Abseil ────────────────────────────────────────────────────────────────
echo "[2/7] Building & installing Abseil..."
cd ~
if [ ! -d "abseil-cpp" ]; then
  git clone --depth 1 --branch 20240116.0 https://github.com/abseil/abseil-cpp.git
fi
cd abseil-cpp
mkdir -p build
cd build
cmake .. \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -DCMAKE_CXX_STANDARD=17 \
  -DCMAKE_BUILD_TYPE=Release \
  -DABSL_ENABLE_INSTALL=ON \
  -DBUILD_TESTING=OFF
cmake --build . -j2
sudo cmake --install .
sudo ldconfig

echo "Sanity check - Abseil:"
ls /usr/local/lib/libabsl_log* /usr/local/lib/libabsl_base* 2>/dev/null

# ── 3. Protobuf ──────────────────────────────────────────────────────────────
echo "[3/7] Building & installing Protobuf v27.5..."
cd ~
if [ ! -f "protobuf-27.5.tar.gz" ]; then
  wget https://github.com/protocolbuffers/protobuf/releases/download/v27.5/protobuf-27.5.tar.gz
fi
if [ ! -d "protobuf-27.5" ]; then
  tar -xvf protobuf-27.5.tar.gz
fi
cd protobuf-27.5
mkdir -p build
cd build
cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -Dprotobuf_BUILD_SHARED_LIBS=ON \
  -Dprotobuf_BUILD_TESTS=OFF \
  -Dprotobuf_ABSL_PROVIDER=package \
  -DCMAKE_CXX_STANDARD=17 \
  -DCMAKE_INSTALL_PREFIX=/usr/local
cmake --build . -j2
sudo cmake --install .
sudo ldconfig

echo "Sanity check - Protobuf:"
which protoc
protoc --version
ls /usr/local/lib/libprotobuf.so*

# ── 4. Clone NSB ─────────────────────────────────────────────────────────────
echo "[4/7] Cloning NSB..."
cd ~
if [ ! -d "nsb" ]; then
  #git clone https://github.com/nsb-ucsc/nsb_beta.git nsb # Update URL if needed
  git clone -b test https://github.com/spencertjohnson/nsb.git nsb # Update URL if needed
fi
cd nsb

# ── 5. Build NSB ─────────────────────────────────────────────────────────────
echo "[5/7] Building NSB..."
rm -rf build
mkdir build
cd build
cmake -DProtobuf_PROTOC_EXECUTABLE=/usr/local/bin/protoc ..
cmake --build . -j2

# ── 6. Install NSB ───────────────────────────────────────────────────────────
echo "[6/7] Installing NSB..."
sudo cmake --install .
sudo ldconfig

# ── 7. PYTHONPATH ────────────────────────────────────────────────────────────
# Detect shell rc file
case "$SHELL" in
*/zsh) RC_FILE="$HOME/.zshrc" ;;
*/bash) RC_FILE="$HOME/.bashrc" ;;
*) RC_FILE="$HOME/.profile" ;;
esac

echo "[7/7] Setting PYTHONPATH..."
touch "$RC_FILE"
PROTO_PATH="$HOME/nsb/python"
if ! grep -q "nsb/python" "$RC_FILE"; then
  echo "export PYTHONPATH=$PROTO_PATH:\$PYTHONPATH" >>"$RC_FILE"
fi
export PYTHONPATH=$PROTO_PATH:$PYTHONPATH

source $RC_FILE

# ── 8. Redis ─────────────────────────────────────────────────────────────────
echo "Starting Redis on port 5050..."
redis-server --port 5050 --daemonize yes
redis-cli -p 5050 ping

# ── Final Test ───────────────────────────────────────────────────────────────
echo "Testing Python proto import..."
python3 - <<'EOF'
import proto.nsb_pb2 as nsb_pb2
print("NSB Python proto loaded from:", nsb_pb2.__file__)
EOF

echo ""
echo "=== Installation complete! ==="
echo "To run the daemon: cd ~/nsb/build && ./nsb_daemon ../config.yaml"
echo "Remember to run: source $RC_FILE"
