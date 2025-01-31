#!/bin/bash
echo -e "\e[1;36m[*] Installing acodeX-server... \e[0m"
curl -L https://raw.githubusercontent.com/bajrangCoder/acodex_server/main/install.sh | bash
echo -e '\e[1;32m`acodeX-server` installed successfully. Run `axs` to start the server. \e[0m'

# Final GUI prompt after installation completes
echo -e "\e[1;36mDo you want to install GUI-related packages to run gui apps in acodex? (y/n)\e[0m"
read -r gui_response_acodex
if [[ "$gui_response_acodex" =~ ^[Yy]$ ]]; then
    echo -e "\e[1;36m[*] Installing GUI-related packages for acodeX-server...\e[0m"
    pkg install x11-repo -y
    pkg install tigervnc -y
    curl -L https://raw.githubusercontent.com/bajrangCoder/websockify_rs/main/install.sh | bash
    echo -e "\e[1;32mGUI packages for acodeX-server installed successfully. Run vncserver command and setup password to get started\e[0m"
else
    echo -e "\e[1;33mSkipping GUI installation for acodeX-server. You can install it later if needed.\e[0m"
fi
