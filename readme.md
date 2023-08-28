# [AcodeX - Terminal Emulator](https://github.com/bajrangCoder/acode-plugin-acodex)

> First Update your acodeX-server to use `v2.1.0`, by running `npm update -g acodex-server` in termux

**AcodeX** is a plugin for the Acode app that adds `terminal support`, making coding more productive and efficient. This plugin allows developers to execute terminal commands directly within the Acode app, eliminating the need to switch between apps for coding and terminal access.

After `v1.1.0`, you will not regret after installing. I know before it was hard.

**Brand New Tutorial: [Click me](https://youtu.be/sXlIhrbpjyw)**

> Note: When you start a new terminal make sure to adjust terminal panel according to your screen. If its height is good for you then also just drag it , then it will run smoothly.
and It will also adjust the cols and rows according to your screen in backend 

**Support this project with your small contribution - <a href='https://github.com/sponsors/bajrangCoder'>Click Me 💗</a>**

<details>
    <summary>
        Updates 🤩🤩
    </summary>
    <br/>
    <details>
        <summary>
            <code><strong>v2.1.0</strong></code>
        </summary>
        <ul>
            <li>exposed more terminal api 🔌</li>
            <li>make sure to update acodex server , otherwise it will not going to work.</li>
            <li>removed every limitations, now you can run vim , etc 😅</li>
            <li>added support for loading external custom fonts</li>
            <li>now acodex comes with some predefined themes, you can chose it from Settings</li>
        </ul>
    </details>
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
- **Easy Directory Changing**: You can open any folder with a button click.

### Api Docs

**AcodeX Plugin** provides an API to run commands in a terminal through another plugin.

**Usage:**

To use the AcodeX API:
1. Import the **`acodex`** module from the `acode` library.

```js
const termController = acode.require("acodex");
```

**Methods:**

1. `.execute(command)` : execute given command in terminal
2. `.isMinimized()` : returns whether Terminal is minimised or not
3. `.isTerminalOpened()` : returns whether Terminal is opened or not 
4. `.maximiseTerminal()` : if Terminal is minimized then this will maximise it 
5. `.openTerminal(termContainerHeight,port)` : opens a new Terminal, both termContainerHeight and port are optional
6. `.closeTerminal()` : close opened Terminal
7. `.convertAcodeUriToTermReadable(path)` : convert acode file uri to actual path

## Custom Fonts 

Mainly custom font is provided to load font files which are required by the termux theme, you are using.

For loading custom font , follow the given instructions:
1. Download the font files 
2. Create a `css` file(any where in the internal storage)
3. Write css code to load font files, and use relative url of font file in css, for eg:

```css
@font-face {
    font-family: "MesloLGS NF Regular";
    src: url("./MesloLGS NF Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}
```

4. Open AcodeX Settings page and there you will find option `"Custom Font StyleSheet"`
5. Click it and it will open file browser and from there, you just select your css file which you have created in **Step 3**
6. And also write font name on same AcodeX Settings page , in Font Family option.
7. Hence done :) , Now just restart terminal.

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

> Don't change colors while using any predefined theme, only change in case of custom one.

## Acknowledgements

**AcodeX** is made possible by the use of:

 - [xtermjs](https://xtermjs.org/)
 - [node-pty](https://github.com/microsoft/node-pty)
 - [Termux](https://termux.dev/en/)


## Authors

- **[@bajrangCoder](https://www.github.com/bajrangCoder)** - *AcodeX* is created by `Raunak Raj`, a passionate developer who aims to make coding more accessible and efficient for everyone even on Phones.


To contribute to **AcodeX**, visit the plugin's GitHub page and leave a star 🌟 to show your support. You can also report bugs, suggest improvements, or contribute to the codebase. **AcodeX** is an open-source project, and contributions are welcomes from the community

❤️❤️ Thanks for using AcodeX ❤️❤️
