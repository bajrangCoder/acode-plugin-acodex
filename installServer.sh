#!/bin/bash

# Default to not installing GUI
INSTALL_GUI=false

# Check for arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --gui) INSTALL_GUI=true ;;
    esac
    shift
done

echo -e "\e[1;36m[*] Installing acodeX-server... \e[0m"
curl -L https://raw.githubusercontent.com/bajrangCoder/acodex_server/main/install.sh | bash
echo -e '\e[1;32m`acodeX-server` installed successfully. Run `axs` to start the server. \e[0m'

# Only install GUI if the --gui flag was provided
if $INSTALL_GUI; then
    echo -e "\e[1;36m[*] Installing GUI-related packages for acodeX-server...\e[0m"
    pkg install x11-repo -y
    pkg install tigervnc -y
    curl -L https://raw.githubusercontent.com/bajrangCoder/websockify_rs/main/install.sh | bash
    echo -e "\e[1;32mGUI packages for acodeX-server installed successfully. Run vncserver command and setup password to get started\e[0m"
else
    echo -e "\e[1;33mSkipping GUI installation for acodeX-server. Use --gui flag to install later.\e[0m"
fi
