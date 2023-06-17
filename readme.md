# [AcodeX - Terminal Emulator](https://github.com/bajrangCoder/acode-plugin-acodex)
<p align="center"><img src="https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/icon.png"/></p>

**AcodeX** is a plugin for the Acode app that adds `terminal support`, making coding more productive and efficient. This plugin allows developers to execute terminal commands directly within the Acode app, eliminating the need to switch between apps for coding and terminal access.

After `v1.1.0`, you will not regret after installing. I know before it was hard.

> Note: When you start a new terminal make sure to adjust terminal panel according to your screen. If its height is good for you then also just drag it , then it will run smoothly.

**Support this project with your small contribution - <a href='https://github.com/sponsors/bajrangCoder'>Click Me 💗</a>**

<details>
    <summary>
        Updates 🤩🤩
    </summary>
    <br/>
    <details>
        <summary>
            <code><strong>v1.1.4</strong></code>
        </summary>
        <ul>
            <li>little bit change in layout and icon</li>
            <li>maximise terminal button is now draggable and you can drag it and keep it wherever you want</li>
            <li>fixed bugs related to folder icon</li>
            <li>removed changing of font family of terminal</li>
            <li>some minor changes</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.1.1</strong></code>
        </summary>
        <ul>
            <li>changed icons</li>
            <li>improved context menu</li>
            <li>fixed bugs</li>
            <li>removed arrow button from terminal header, instead of this use acode arrow buttons</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.1.0</strong></code>
        </summary>
        <ul>
            <li>Fixed Android keyboard issue, now you can use any keyboard you want</li>
            <li>Fixed paste functionality issue</li>
            <li>Fixed terminal unwanted behaviour</li>
            <li>Many internal changes to improve performance</li>
            <li>improved styling</li>
            <li>Note: almost every encountered bugs are fixed</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.9</strong></code>
        </summary>
        <ul>
            <li>fixed bugs</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.8</strong></code>
        </summary>
        <ul>
            <li>fixed bugs</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.7</strong></code>
        </summary>
        <ul>
            <li>Added a button on terminal header for opening terminal in opened file directory.</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.6</strong></code>
        </summary>
        <ul>
            <li>Added Arrow button instead of input field on terminal header to use feature of <code>v1.0.5</code></li>
            <li>Now if you will close the app without closing terminal, then when you open app again the terminal will be start automatically from where you have closed app.</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.0.5</strong></code>
        </summary>
        <ul>
            <li>
                Now you can get previous command(history of command) same as Termux feature:
                <ul>
                    <li>For previous command -> <kbd>⇑</kbd></li>
                    <li>For next command -> <kbd>⇓</kbd></li>
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
                    <li><kbd>Enter key</kbd></li>
                    <li><kbd>Space key</kbd></li>
                    <li><kbd>Ctrl+C key</kbd></li>
                    <li><kbd>Delete/Backspace key</kbd></li>
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
- **Session**

## Prerequisites

To use **AcodeX**, you need to have the [Termux app](https://termux.dev/en/) installed on your Android device. However, you do not need to switch between apps to use the terminal, as **AcodeX** offers a convenient way to access the terminal directly within the **Acode app** with the help of **Termux**

## Installation

Install plugin in **Acode App** From `Acode > Settings > Plugins > AcodeX`
And Install server in termux via below command:

```bash
curl -sL https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/installServer.sh | bash
```
    
## How to use?

**New updated tutorial is comming soon**

<video src="https://user-images.githubusercontent.com/71929976/220828170-158cc64d-ed9b-4d48-b7b6-5d7a530b2d18.mp4" height="270" width="340" controls>
</video>
<br>

- First Start Server on Termux via : `acodeX-server`
- To use **AcodeX**, press `Ctrl+K` or search for `"Open Terminal"` in the command palette. 
- Then enter the port number, and the terminal will start running. 
- Use the minus icon button to hide the terminal while coding, and the terminal button to show it. 
- You can also **drag** the terminal panel around by clicking and dragging through the **terminal title area**. 
- The `✗` is for closing the terminal.
- folder icon - button on terminal header is for navigating to opened files(in editor) directory .

## Acknowledgements

**AcodeX** is made possible by the use of:

 - [xtermjs](https://xtermjs.org/)
 - [node-pty](https://github.com/microsoft/node-pty)
 - [Termux](https://termux.dev/en/)


## Authors

- **[@bajrangCoder](https://www.github.com/bajrangCoder)** - *AcodeX* is created by `Raunak Raj`, a passionate developer who aims to make coding more accessible and efficient for everyone even on Phones.


To contribute to **AcodeX**, visit the plugin's GitHub page and leave a star 🌟 to show your support. You can also report bugs, suggest improvements, or contribute to the codebase. **AcodeX** is an open-source project, and contributions are welcomes from the community

❤️❤️ Thanks for using AcodeX ❤️❤️
