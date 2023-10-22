# AcodeX - Terminal Emulator

<a href="https://www.buymeacoffee.com/bajrangCoder" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" width="170"/></a>

> **Warning**
> This plugin requires the [AcodeX-Server](https://github.com/bajrangCoder/AcodeX-server) NodeJS package to be installed and running on [Termux](https://termux.dev).

[AcodeX](https://github.com/bajrangCoder/acode-plugin-acodex) is a powerful plugin for [Acode](https://acode.foxdebug.com/) that enhances your coding productivity by adding in-app Termux terminal integration. With AcodeX, you can execute terminal commands directly from within the Acode app, eliminating the need to switch between apps for coding and terminal access.

> **Note**
> When starting a new terminal, be sure to adjust the terminal panel according to your screen. You can drag it to your desired position, and it will automatically adjust the columns and rows according to your screen size.

<details>
    <summary>
        <h3 style="display:inline">What's on this page?</h3>
    </summary>
    <ul>
        <li>Support this project</li>
        <li>Whats new?</li>
        <li>Features</li>
        <li>Api Docs</li>
        <li>Loading Custom font</li>
        <li>Installation</li>
        <li>How to use?</li>
        <li>Acknowledgement</li>
        <li>Authors</li>
        <li>Contribution</li>
    </ul>
</details>


### Support this project with your small contribution - [Click Me 💗](https://www.buymeacoffee.com/bajrangCoder)


<details>
    <summary>
        <h3 style="display:inline">What's New (v2.3.0)?</h3>
    </summary>
    <ul>
        <li>Removed port prompt from starting of terminal, now you can only change port from Settings</li>
        <li>Added a setting to make terminal transparent</li>
        <li>Fixed loading of custom font issue</li>
        <li>Add many new themes and modified <code>snazzy theme</code> like Ayulight, Ayudark, Ayu Mirage, Catppuccin, Dracula, NekonakoDjancoeg, SiduckOneDark, Elementary, Everblush, One Dark</li>
        <li>Added some nerd fonts like FiraCode, VictorMono, Jetbrains, SauceCodePro, Meslo</li>
    </ul>
</details>
<br/>

> For previous change logs/updates, visit: [Change Log](https://github.com/bajrangCoder/acode-plugin-acodex/blob/main/ChangeLog.md)

## Features

- **Easy to use**: AcodeX offers a terminal in the form of a movable panel, accessible by pressing `Ctrl+K` or by searching for "Open Terminal" in the command palette.

- **Productivity**: Developers can save time by accessing the terminal directly within Acode and executing commands without switching between apps.

- **Terminal panel**: The terminal panel is customizable - you can move it, resize it, minimize it, and maximize it according to your preferences.

- **User-friendly interface**: AcodeX offers a simple and intuitive interface suitable for all levels of developers.

- **Customizable**: You can customize the AcodeX terminal to your preferences.

- **Multiple sessions**: You can create multiple sessions and session are managed judicially to minimise power drain.

- **Background Process**: If you will close acode without closing acodex server or terminal in acode then it will be live and when you will open acode again then you can continue without any interuption.

- **Easy Directory Changing**: You can open any folder with a button click.

- **Themes**: Comes with beautiful themes (10+)

- **Transparent Terminal**: You can also make the termianl panel transparent
- **Nerd Fonts**: Comes preloaded with some nerd fonts and you can also load your custom fonts

### API Docs

```javascript
const termController = acode.require("acodex");
```

**Methods**:

1. `.execute(command)`: Execute the given command in the terminal.
2. `.isMinimized()`: Check if the terminal is minimized.
3. `.isTerminalOpened()`: Check if the terminal is opened.
4. `.maximizeTerminal()`: Maximize the terminal if it's minimized.
5. `.openTerminal(termContainerHeight, port)`: Open a new terminal (both `termContainerHeight` and `port` are optional).
6. `.createSession()`: creates a sessionif terminal is opened 
7. `.closeTerminal()`: Close the opened terminal.
8. `.convertAcodeUriToTermReadable(path)`: Convert Acode file URI to an actual path.
9. `.addTheme(themeName: string, colorSchema: IXtermTheme)`: Add a new theme to AcodeX's theme list.
10. `.applyTheme(themeName: string)`: Apply the given theme to the terminal.

Example of addTheme & applyTheme:

```javascript
const acodex = acode.require("acodex");
const themeName = "Test"; // name of theme
const colorSchema  = {
    // Theme colors here, you can find colors in themes.js
}
// Add theme
acodex.addTheme(themeName, colorSchema);
// Apply theme 
acodex.applyTheme(themeName);
```

## Custom Fonts

> **Note**
> It will be changed in comming updates to user-friendly method 

Custom fonts are provided to load any other external fonts 

To load a custom font:

1. Download the font files(**Note: Download nerd font file in case if you are loading for termux theme**).
2. Create a `css` file anywhere in the internal storage.
3. Write CSS code to load font files using relative URLs in the CSS, for example:

```css
@font-face {
    font-family: "MesloLGS NF Regular";
    src: url("./MesloLGS NF Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}
```

4. Open AcodeX Settings page and find the option `"Custom Font StyleSheet"`.
5. Select your CSS file created in step 3.
6. Enter the font name in the Font Family option.
7. Restart the terminal.

## Prerequisites

To use AcodeX, you need to have the [Termux app](https://termux.dev/en/) installed on your Android device. However, you don't need to switch between apps to use the terminal, as AcodeX offers a convenient way to access the terminal directly within the Acode app with the help of Termux.

## Installation

1. Install the plugin in the Acode App from `Acode > Settings > Plugins > AcodeX`.

2. Install the server in Termux using the following command:

```bash
curl -sL https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/installServer.sh | bash
```

or 

```bash
pkg update && pkg upgrade -y
pkg install python nodejs -y
npm i -g acodex-server
```

Basically just install `python` & `nodejs` and then just install `acodex-server` npm package globally

## How to Use

> **Tutorial link**: [https://youtu.be/sXlIhrbpjyw](https://youtu.be/sXlIhrbpjyw)

- Start the server in Termux using: `acodeX-server`.
- To use AcodeX, press `Ctrl+K` or search for `"Open Terminal"` in the command palette (press `Ctrl+Shift+P` to open the command palette).
- Enter the port number, and the terminal will start.
- Plus `+` icon to create new session 
- Use the minus icon button to hide the terminal while coding and the terminal button to show it.
- You can also drag the terminal panel around by clicking and dragging through the terminal header area.
- The `✗` button is for closing the terminal.
- The folder icon button on the terminal header is for navigating to opened files (in the editor) directory.

> Don't change colors while using any predefined theme; only change in the case of a custom one.

## Acknowledgments

AcodeX is made possible by the use of:

- [xtermjs](https://xtermjs.org/)
- [Termux](https://termux.dev/en/)

## Authors

- [@bajrangCoder](https://www.github.com/bajrangCoder) - AcodeX is created by Raunak Raj, a passionate developer who aims to make coding more accessible and efficient for everyone, even on phones.

To contribute to AcodeX, visit the plugin's GitHub page, leave a star 🌟 to show your support, report bugs, suggest improvements, or contribute to the codebase. AcodeX is an open-source project
, and contributions are welcomed from the community.

❤️❤️ Thanks for using AcodeX ❤️❤️
