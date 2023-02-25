# [AcodeX - Terminal Emulator](https://github.com/bajrangCoder/acode-plugin-acodex)
<p align="center"><img src="https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/icon.png"/></p>

**AcodeX** is a plugin for the Acode app that adds `terminal support`, making coding more productive and efficient. This plugin allows developers to execute terminal commands directly within the Acode app, eliminating the need to switch between apps for coding and terminal access.

<details>
    <summary>
        Updates
    </summary>
    <code><strong>v1.0.1</strong></code>
    <ul>
        <li>
            Now you can customise terminal, by changing:
                <ul>
                    <li>Font Size</li>
                    <li>Font Family</li>
                    <li>Cursor Style</li>
                    <li>Cursor Blink</li>
                    <li>Scroll back</li>
                    <li>Scroll Sensitivity</li>
                    <li>Theme</li>
                </ul>
        </li>
    </ul>
</details>

## Features

- **Easy to use**: _AcodeX_ offers a terminal in the form of a movable panel, which can be accessed easily by pressing `Ctrl+K` or by searching for "Open Terminal" in the command palette.
- **Productivity**: By using _AcodeX_, developers can save time by accessing the terminal directly within _Acode_ and executing commands without switching between apps.
- **Terminal panel**: The terminal panel can be moved around, resized, minimized, and maximized based on the developer's preferences
- **User-friendly interface**: _AcodeX_ offers a simple and intuitive interface, making it easy to use for all levels of developers.
- **Customisable**: You can customise AcodeX terminal according to your preference 

## Prerequisites

To use **AcodeX**, you need to have the **Termux app** installed on your Android device. However, you do not need to switch between apps to use the terminal, as **AcodeX** offers a convenient way to access the terminal directly within the **Acode app** with the help of **Termux**

## Limitations

Although **AcodeX** is a useful plugin but there is a limitation with the `mobile keyboard` when using the terminal. This is a known issue, and the developer is working to fix it. For the time being, users can use the `input fields` to enter commands if the mobile keyboard is not working. Note that this limitation is not specific to **AcodeX**, but rather an issue with xtermjs, the terminal emulator used by the plugin.

## Installation

Install plugin in **Acode App** From `Acode > Settings > Plugins > AcodeX`
And Install server in termux via below command:

```bash
curl -sL https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/installServer.sh | bash
```
    
## How to use?

<video src="https://user-images.githubusercontent.com/71929976/220828170-158cc64d-ed9b-4d48-b7b6-5d7a530b2d18.mp4" height="270" width="340" controls>
</video>
<br>

- First Start Server on Termux via : `acodeX-server`
- To use **AcodeX**, press `Ctrl+K` or search for `"Open Terminal"` in the command palette. 
- Then enter the port number, and the terminal will start running. 
- Use the `⇓` button to hide the terminal while coding, and the `⇑` button to show it. 
- You can also **drag** the terminal panel around by clicking and dragging through the **terminal title area**. 
- The `✗` is for closing the terminal.

## Acknowledgements

**AcodeX** is made possible by the use of:

 - [xtermjs](https://xtermjs.org/)
 - [node-pty](https://github.com/microsoft/node-pty)



## How it works?

**AcodeX** runs a *Node.js* script in **Termux**, which connects with the plugin via a *WebSocket* and communicates with each other to work. 
**Termux** is an Android terminal emulator and Linux environment app, which enables users to access the terminal directly from their Android devices.

## Authors

- **[@bajrangCoder](https://www.github.com/bajrangCoder)** - *AcodeX* is created by `Raunak Raj`, a passionate developer who aims to make coding more accessible and efficient for everyone even on Phones.


To contribute to **AcodeX**, visit the plugin's GitHub page and leave a star 🌟 to show your support. You can also report bugs, suggest improvements, or contribute to the codebase. **AcodeX** is an open-source project, and contributions are welcomes from the community

❤️❤️ Thanks for using AcodeX ❤️❤️
