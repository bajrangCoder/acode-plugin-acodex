# [AcodeX - Terminal Emulator](https://github.com/bajrangCoder/acode-plugin-acodex)
<p align="center"><img src="https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/icon.png"/></p>

**AcodeX** is a plugin for the Acode app that adds `terminal support`, making coding more productive and efficient. This plugin allows developers to execute terminal commands directly within the Acode app, eliminating the need to switch between apps for coding and terminal access.

After `v1.1.0`, you will not regret after installing. I know before it was hard.

**Brand New Tutorial: [Click me](https://youtu.be/sXlIhrbpjyw)**

> Note: When you start a new terminal make sure to adjust terminal panel according to your screen. If its height is good for you then also just drag it , then it will run smoothly.

**Support this project with your small contribution - <a href='https://github.com/sponsors/bajrangCoder'>Click Me 💗</a>**

<details>
    <summary>
        Updates 🤩🤩
    </summary>
    <br/>
    <details>
        <summary>
            <code><strong>v2.0.0</strong></code>
        </summary>
        <ul>
            <li>exposed terminal api 🔌</li>
            <li>improved Terminal and updated xtermjs library 🔼</li>
            <li>now the web link in the terminal will be hyper linked onclicking it, it will open link in browser 🔗</li>
            <li>added low budget Autocompletion 😂 , i.e tab autocompletion</li>
            <li>now you can also use left & right arrow to navigate 🧭</li>
            <li>fixed prompt bug 🐞</li>
            <li>some minor improvements and changes 🤫</li>
            <li>Added new AcodeX own logo, now no more copied logo 😅</li>
            <li>
            added these shortcut(Read <strong>Supported key shortcut</strong> section of readme for more ☺️): <kbd>Ctrt+f</kbd>, <kbd>Right Arrow</kbd>, <kbd>Alt+f</kbd>, <kbd>Ctrl+Right arrow</kbd>, <kbd>Ctrl+b</kbd>, <kbd>Left arrow</kbd>, <kbd>Alt+b</kbd>, <kbd>Ctrl+Left arrow</kbd>, <kbd>Ctrl+a</kbd>, <kbd>Ctrl+e</kbd>, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Tab</kbd>, 
            </li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.2.0</strong></code>
        </summary>
        <ul>
            <li>fixed issue related to saving state</li>
            <li>added color picker in plugin setting for themeing</li>
            <li>now it will remember your terminal state for better experience</li>
            <li>
            added two shortcut:
                <ul>
                    <li><kbd>Ctrl+I</kbd> - to clear the terminal</li>
                    <li><kbd>Ctrl+P</kbd> - to copy text from the terminal</li>
                </ul>
            </li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.1.8</strong></code>
        </summary>
        <ul>
            <li>improved accessibility</li>
            <li>floating button and terminal panel issue fixed</li>
            <li>minor twicks</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.1.7</strong></code>
        </summary>
        <ul>
            <li>brand new tutorial link added in the readme of the plugin</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.1.6</strong></code>
        </summary>
        <ul>
            <li>terminal issue fixed</li>
            <li>floating button improved, now it will be not hidden by keyboard</li>
            <li>internal changes</li>
        </ul>
    </details>
    <details>
        <summary>
            <code><strong>v1.1.5</strong></code>
        </summary>
        <p>Nothing fancy just a simple bugs 😑</p>
    </details>
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
- **Session**: It will automatically open from where you had closed the app.
- **Easy Directory Changing**: You can open any folder with a button click.
- **Use Previous commands**: it will remember your previously used command , you can get them by using arrow button.

### Api Docs

**AcodeX Plugin** provides an API to run commands in a terminal through another plugin. This functionality is available when the user has **opened the terminal** (either minimized or opened).

**Usage:**

To use the AcodeX API, follow these steps:
1. Import the **`acodex`** module from the `acode` library.
2. Use the **`execute`** method to run a command in the terminal.

```js
const terminalExecutor = acode.require("acodex");
// run Command
terminalExecutor.execute("ls");
```

### Supported key shortcuts

The following key shortcuts are supported within the terminal:

- <kbd>Backspace</kbd>: remove one character in left direction
- <kbd>Delete</kbd>: remove one character in right direction
- <kbd>Ctrl+C</kbd>: to intrupt the running process
- <kbd>Up Arrow (↑)</kbd>: Navigate through past command history (upwards)
- <kbd>Down Arrow (↓)</kbd>: Navigate through past command history (downwards)
- <kbd>Ctrl+F</kbd> or <kbd>Right Arrow (→)</kbd>: Move cursor one character to the right
- <kbd>Alt+F</kbd> or <kbd>Ctrl + Right Arrow (→)</kbd>: Move cursor one word to the right
- <kbd>Ctrl+B</kbd> or <kbd>Left Arrow (←)</kbd>: Move cursor one character to the left
- <kbd>Alt+B</kbd> or <kbd>Ctrl + Left Arrow (←)</kbd>: Move cursor one word to the left
- <kbd>Ctrl+A</kbd> or <kbd>Home</kbd>: Move cursor to the beginning of the line
- <kbd>Ctrl+E</kbd> or <kbd>End</kbd>: Move cursor to the end of the line
- <kbd>Tab</kbd>: Perform autocompletion or give tab

## Prerequisites

To use **AcodeX**, you need to have the [Termux app](https://termux.dev/en/) installed on your Android device. However, you do not need to switch between apps to use the terminal, as **AcodeX** offers a convenient way to access the terminal directly within the **Acode app** with the help of **Termux**

## Installation

Install plugin in **Acode App** From `Acode > Settings > Plugins > AcodeX`
And Install server in termux via below command:

```bash
curl -sL https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/installServer.sh | bash
```
    
## How to use?

**New updated tutorial link: [https://youtu.be/sXlIhrbpjyw](https://youtu.be/sXlIhrbpjyw)**

- First Start Server on Termux via : `acodeX-server`
- To use **AcodeX**, press `Ctrl+K` or search for `"Open Terminal"` in the command palette(Press `ctrl-shift-p` to open command palette). 
- Then enter the port number, and the terminal will start. 
- Use the minus icon button to hide the terminal while coding, and the terminal button to show it. 
- You can also **drag** the terminal panel around by clicking and dragging through the **terminal header area**. 
- The `✗` is for closing the terminal.
- folder icon - button on terminal header is for navigating to opened files(in editor) directory .

## Limitations

- you can't backspace if the command wraped in the new line
- You can't use arrow button except the prompt area.

## Acknowledgements

**AcodeX** is made possible by the use of:

 - [xtermjs](https://xtermjs.org/)
 - [node-pty](https://github.com/microsoft/node-pty)
 - [Termux](https://termux.dev/en/)


## Authors

- **[@bajrangCoder](https://www.github.com/bajrangCoder)** - *AcodeX* is created by `Raunak Raj`, a passionate developer who aims to make coding more accessible and efficient for everyone even on Phones.


To contribute to **AcodeX**, visit the plugin's GitHub page and leave a star 🌟 to show your support. You can also report bugs, suggest improvements, or contribute to the codebase. **AcodeX** is an open-source project, and contributions are welcomes from the community

❤️❤️ Thanks for using AcodeX ❤️❤️
