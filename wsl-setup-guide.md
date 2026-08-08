# Setup for Windows via WSL (Ubuntu 24.04)

This guide covers setting up NSB on **Windows** using **Windows Subsystem for Linux (WSL2)** with Ubuntu 24.04. Since NSB currently does not have native Windows support, WSL is the recommended way to run NSB on Windows.

> **Note:** This guide assumes you have WSL2 already installed. If not, open PowerShell as Administrator and run:  
> ```powershell
> wsl --install -d Ubuntu-24.04
> ```

---

## 0. Configure WSL Memory

Building Protobuf from source requires sufficient memory. The default WSL memory allocation may cause the build to be terminated. Before starting, create or edit the file `C:\Users\<YourUsername>\.wslconfig` with the following content:

```ini
[wsl2]
memory=4GB
swap=4GB
```

After saving, restart WSL from PowerShell:
```powershell
wsl --shutdown
```

Then reopen your Ubuntu terminal.

---

## 1. Install System Packages

```bash
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
```

---

## 2. Build & Install Abseil (LTS 20240116.0)

```bash
cd ~
git clone --depth 1 --branch 20240116.0 https://github.com/abseil/abseil-cpp.git
cd abseil-cpp
mkdir build && cd build
cmake .. \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -DCMAKE_CXX_STANDARD=17 \
  -DCMAKE_BUILD_TYPE=Release \
  -DABSL_ENABLE_INSTALL=ON \
  -DBUILD_TESTING=OFF
cmake --build . --parallel 2
sudo cmake --install .
sudo ldconfig
```

> **Note:** You may see a warning about `/usr/lib/wsl/lib/libcuda.so.1 is not a symbolic link` after running `ldconfig`. This is a known WSL issue and can be safely ignored.

#### Sanity Check
```bash
ls /usr/local/lib/libabsl_log* /usr/local/lib/libabsl_base* 2>/dev/null
```

---

## 3. Build & Install Protobuf v27.5

```bash
cd ~
wget https://github.com/protocolbuffers/protobuf/releases/download/v27.5/protobuf-27.5.tar.gz
tar -xvf protobuf-27.5.tar.gz
cd protobuf-27.5
mkdir build && cd build
cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_POSITION_INDEPENDENT_CODE=ON \
  -Dprotobuf_BUILD_SHARED_LIBS=ON \
  -Dprotobuf_BUILD_TESTS=OFF \
  -Dprotobuf_ABSL_PROVIDER=package \
  -DCMAKE_CXX_STANDARD=17 \
  -DCMAKE_INSTALL_PREFIX=/usr/local
cmake --build . --parallel 2
sudo cmake --install .
sudo ldconfig
```

> **Important:** If the build is terminated during `cmake --build`, your WSL instance likely does not have enough memory. See [Step 0](#0-configure-wsl-memory) to increase the allocation. You can also try building with `--parallel 1` to reduce memory usage.

#### Sanity Check
```bash
which protoc
protoc --version      # Expect libprotoc 27.5
ls /usr/local/lib/libprotobuf.so*
```

---

## 4. Clone NSB

```bash
cd ~
git clone https://github.com/nsb-ucsc/nsb_beta.git
cd nsb_beta
```

---

## 5. Configure & Build NSB

```bash
mkdir build && cd build
cmake -DProtobuf_PROTOC_EXECUTABLE=/usr/local/bin/protoc ..
cmake --build . --parallel 2
```

> **Known Issue:** On some systems, the generated protobuf files may be placed in a nested subdirectory (e.g., `cpp/proto/proto/` instead of `cpp/proto/`). If the build fails with `fatal error: nsb.pb.h: No such file or directory`, run:
> ```bash
> cp ~/nsb_beta/cpp/proto/proto/* ~/nsb_beta/cpp/proto/
> cmake --build . --parallel 2
> ```

---

## 6. Install NSB (Optional but Recommended)

```bash
sudo cmake --install .
sudo ldconfig
```

Install locations:
- Lib: `/usr/local/nsb/lib/libnsb.so`
- Headers: `/usr/local/nsb/include/...`
- Binary: `/usr/local/nsb/bin/nsb_daemon`

---

## 7. Set Up Python Environment

Install the required Python packages:
```bash
pip3 install protobuf redis --break-system-packages
```

Copy the generated proto files to the Python source directory:
```bash
cp ~/nsb_beta/python/proto/proto/* ~/nsb_beta/python/proto/ 2>/dev/null
```

#### Test
```bash
cd ~/nsb_beta/python
python3 -c "import proto.nsb_pb2; print('Python proto: OK')"
```

---

## 8. Start Redis on Port 5050

```bash
redis-server --port 5050 --daemonize yes
```

#### Verify
```bash
redis-cli -p 5050 ping  # Should return: PONG
```

---

## 9. Run NSB Daemon

```bash
cd ~/nsb_beta/build
./nsb_daemon ../config.yaml
```

You should see output like:
```
[HH:MM:SS]    (info) Starting daemon...
[HH:MM:SS]    (info) Server started on port 65432
```

NSB is now running and ready for use. You can connect clients from another terminal using the Python or C++ client APIs.
