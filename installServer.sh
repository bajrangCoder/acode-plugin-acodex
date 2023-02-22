#!/bin/bash

# check for packages and install if not found
if ! [ -x "$(command -v wget)" ]; then
  echo -e "\e[1;36m[*] Installing wget\e[0m"
  pkg install wget -y
fi

if ! [ -x "$(command -v unzip)" ]; then
  echo "\e[1;36m[*] Installing unzip\e[0m"
  pkg install unzip -y
fi

if ! [ -x "$(command -v npm)" ]; then
  echo '\e[31m[!] Error: npm is not installed.\e[0m' >&2
  exit 1
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

if ! [ -x "$(command -v build-essential)" ]; then
  echo -e "\e[1;36m[*] Installing build-essential\e[0m"
  pkg install build-essential -y
fi

# check if directory exists
if [ -d "~/.acodeX-server" ]; then
	echo -e "\e[31m[!] acodeX-server Installation exists already. \e[0m"
else
	echo -e "\e[1;36m[*] Installing acodeX-server... \e[0m"
	mkdir .acodeX-server
    wget https://github.com/bajrangCoder/acode-plugin-acodex/blob/main/server/acodeXServer.zip
	unzip acodeXServer.zip -d .acodeX-server
    rm -rf acodeXServer.zip
fi
cd ~/.acodeX-server
echo -e "\e[1;36m[*] Installing Dependencies... \e[0m"
npm install
npm link .
cd ~/
chmod +x /data/data/com.termux/files/usr/bin/acodeX-server
echo -e '\e[1;32m`acodeX-server` installed successfully. Run `acodeX-server` to start the server. \e[0m'
