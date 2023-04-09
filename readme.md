# [AcodeX - Terminal Emulator](https://github.com/bajrangCoder/acode-plugin-acodex)
<p align="center"><img src="https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/icon.png"/></p>

**AcodeX** is a plugin for the Acode app that adds `terminal support`, making coding more productive and efficient. This plugin allows developers to execute terminal commands directly within the Acode app, eliminating the need to switch between apps for coding and terminal access.

> Note: Please you should set terminal height according to your screen , for smooth functioning.

**Support this project with your small contribution - <a href='https://github.com/sponsors/bajrangCoder'>Click Me 💗</a>**

<details>
    <summary>
        Updates 🤩🤩
    </summary>
    <details>
        <summary>
            <code><strong>v1.0.5</strong></code>
        </summary>
        <ul>
            <li>
                Now you can get previous command(history of command) same as Termux feature:
                <ul>
                    <li>For previous command -> ⇑</li>
                    <li>For next command -> ⇓</li>
                </ul>
            </li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.4</strong></code>
        </summary>
        <ul>
            <li>Now you can use any keyboard in terminal(recommend -> keyboard which cantains ctrl key and so on)</li>
            <li>Some Improvement</li>
            <li>There is little bit limitations with keys that will be fixed in next update</li>
            <li>
                Supported Keys
                <ul>
                    <li>Enter key</li>
                    <li>Space key</li>
                    <li>Ctrl+C key</li>
                    <li>Delete/Backspace key</li>
                    <li>Others treated as normal printable keys</li>
                </ul>
            </li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.3</strong></code>
        </summary>
        <ul>
            <li>Removed deprecated Acode API for smooth functioning in latest Acode</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.2</strong></code>
        </summary>
        <ul>
            <li>Plugin Setting Ui improved</li>
            <li>For closing the terminal use <code>Ctrl+J</code></li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.1</strong></code>
        </summary>
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
</details>

## Features

- **Easy to use**: _AcodeX_ offers a terminal in the form of a movable panel, which can be accessed easily by pressing `Ctrl+K` or by searching for "Open Terminal" in the command palette.
- **Productivity**: By using _AcodeX_, developers can save time by accessing the terminal directly within _Acode_ and executing commands without switching between apps.
- **Terminal panel**: The terminal panel can be moved around, resized, minimized, and maximized based on the developer's preferences
- **User-friendly interface**: _AcodeX_ offers a simple and intuitive interface, making it easy to use for all levels of developers.
- **Customisable**: You can customise AcodeX terminal according to your preference 

## Known Issues

When there is a lot of data on the terminal or your terminal panel height is too small, the cursor may be hidden behind the bottom app bar. While this issue only occurs in some cases, it can be frustrating for users.

To fix this issue, users can simply drag the terminal panel slightly to bring the cursor back into view. This is a temporary workaround and will be fixed in a future release of the plugin.

Alternatively, users can enter the command `clear` in the terminal and then tap once to fix the issue. This will clear the terminal screen and bring the cursor back into view.

We apologize for any inconvenience caused by this issue and appreciate your patience as we work to address it.

## Prerequisites

To use **AcodeX**, you need to have the **Termux app** installed on your Android device. However, you do not need to switch between apps to use the terminal, as **AcodeX** offers a convenient way to access the terminal directly within the **Acode app** with the help of **Termux**

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
