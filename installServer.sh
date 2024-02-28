#!/bin/bash

function install_packages {
    if ! [ -x "$(command -v node)" ]; then
        echo -e "\e[1;36m[*] Installing Nodejs\e[0m"
        pkg install nodejs -y
    fi
    if ! [ -x "$(command -v python)" ]; then
        echo -e "\e[1;36m[*] Installing Python\e[0m"
        pkg install python -y
    fi
}

function setup_gyp_folder {
    cd $HOME && mkdir -p .gyp && echo "{'variables': {'android_ndk_path': ''}}" > .gyp/include.gypi
}

if [[ "$OSTYPE" == "linux-android"* ]]; then
    setup_gyp_folder
fi

install_packages

echo -e "\e[1;36m[*] Installing acodeX-server... \e[0m"
npm install -g acodex-server
echo -e '\e[1;32m`acodeX-server` installed successfully. Run `acodeX-server` to start the server. \e[0m'
