#!/bin/bash

function install_packages {
    # check for packages and install if not found
    if ! [ -x "$(command -v unzip)" ]; then
      echo -e "\e[1;36m[*] Installing unzip\e[0m"
      pkg install unzip -y
    fi
    
    if ! [ -x "$(command -v node)" ]; then
      echo -e "\e[1;36m[*] Installing Nodejs\e[0m"
      pkg install nodejs -y
    fi
    
    if ! [ -x "$(command -v python)" ]; then
      echo -e "\e[1;36m[*] Installing Python\e[0m"
      pkg install python -y
    fi
    
    if ! [ -x "$(command -v make)" ]; then
      echo -e "\e[1;36m[*] Installing make\e[0m"
      pkg install make -y
    fi
    
    echo -e "\e[1;36m[*] Installing build-essential\e[0m"
    pkg install build-essential -y
}

# check if directory exists
if [ -d "$HOME/.acodeX-server" ]; then
	echo -e "\e[31m[!] acodeX-server Installation already exists. \e[0m"
	exit 1
else
    install_packages
	echo -e "\e[1;36m[*] Installing acodeX-server... \e[0m"
	mkdir "$HOME/.acodeX-server"
    curl -L -o acodeXServer.zip https://github.com/bajrangCoder/acode-plugin-acodex/raw/main/server/acodeXServer.zip
    unzip acodeXServer.zip -d "$HOME/.acodeX-server"
    rm -rf acodeXServer.zip
    cd "$HOME/.acodeX-server"
    echo -e "\e[1;36m[*] Installing Dependencies... \e[0m"
    npm install
    npm link .
    cd ~/
    chmod +x /data/data/com.termux/files/usr/bin/acodeX-server
    echo -e '\e[1;32m`acodeX-server` installed successfully. Run `acodeX-server` to start the server. \e[0m'
fi
