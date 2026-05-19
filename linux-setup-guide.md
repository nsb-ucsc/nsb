# Linux Installation

## Prerequisites
Make sure you have a supported Linux distribution (using apt or pacman).

## Steps

1. **Download the install script** for your distribution:
   - Arch Linux: `arch_nsb_install.sh`
   - Ubuntu: `ubuntu_nsb_install.sh`

2. **Open a terminal** and navigate to the directory the script downloaded to:
   ```bash
   cd ~/Downloads/
   ```

3. **Make the script executable:**
   ```bash
   chmod +x <distro>_nsb_install.sh
   ```

4. **Run the script:**
   ```bash
   ./<distro>_nsb_install.sh
   ```

5. **Follow any on-screen instructions** that appear during installation.

6. **Reload your shell** after installation completes:
   ```bash
   source ~/.bashrc
   ```
