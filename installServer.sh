#!/bin/bash

# Check if --gui flag is provided
INSTALL_GUI=false
for arg in "$@"; do
    if [[ "$arg" == "--gui" ]]; then
        INSTALL_GUI=true
    fi
done

echo -e "\e[1;36m[*] Installing axs(acodeX-server)... \e[0m"
curl -L https://raw.githubusercontent.com/bajrangCoder/acodex_server/main/install.sh | bash
echo -e '\e[1;32m`axs(acodeX-server)` installed successfully. Run `axs` to start the server. \e[0m'

if $INSTALL_GUI; then
    echo -e "\e[1;36m[*] Installing GUI-related packages for axs(acodeX-server)...\e[0m"
    pkg install x11-repo -y
    pkg install tigervnc -y
    curl -L https://raw.githubusercontent.com/bajrangCoder/websockify_rs/main/install.sh | bash
    echo -e "\e[1;32mGUI packages for axs(acodeX-server) installed successfully. Run vncserver command and setup password to get started\e[0m"
else
    echo -e "\e[1;33mSkipping GUI installation for axs(acodeX-server). You can install it later using --gui flag.\e[0m"
fi
