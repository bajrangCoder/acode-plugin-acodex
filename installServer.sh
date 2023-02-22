#!/bin/bash

# check for packages and install if not found
if ! [ -x "$(command -v wget)" ]; then
  echo "[*] Installing wget"
  pkg install wget -y
  echo "wget installed"
fi

if ! [ -x "$(command -v unzip)" ]; then
  echo "[*] Installing unzip"
  pkg install unzip -y
  echo "unzip installed"
fi

if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed.' >&2
  exit 1
fi

if ! [ -x "$(command -v node)" ]; then
  echo "[*] Installing Nodejs"
  pkg install nodejs -y
  echo "nodejs installed"
fi

if ! [ -x "$(command -v python)" ]; then
  echo "[*] Installing Python"
  pkg install python -y
  echo "python installed"
fi

# check if directory exists
if [ -d "~/.acodeX-server" ]; then
	echo "[*] acodeX-server Installation exists already."
else
	echo "[*] Installing acodeX-server..."
    pkg install -y make build-essential
	mkdir .acodeX-server
    wget https://github.com/bajrangCoder/acode-plugin-acodex/blob/main/server/acodeXServer.zip
	unzip acodeXServer.zip -d .acodeX-server
    rm -rf acodeXServer.zip
fi
cd ~/.acodeX-server
echo "[*] Installing Dependencies..."
npm install
npm link .
cd ~/
chmod +x /data/data/com.termux/files/usr/bin/acodeX-server
echo '`acodeX-server` installed successfully. Run `acodeX-server` to start the server.'
