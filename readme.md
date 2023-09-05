# AcodeX - Terminal Emulator

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/bajrangCoder)

> **Note**: Before installing, update your acodeX-server to version `v2.1.0` by running the following command in Termux: `npm update -g acodex-server` (**Note:** _Only for old AcodeX user_)

[AcodeX](https://github.com/bajrangCoder/acode-plugin-acodex) is a powerful plugin for the Acode app that enhances your coding productivity by adding terminal support. With AcodeX, you can execute terminal commands directly within the Acode app, eliminating the need to switch between apps for coding and terminal access.

> **Note**: When starting a new terminal, be sure to adjust the terminal panel according to your screen. You can drag it to your desired position, and it will automatically adjust the columns and rows according to your screen size.

### Support this project with your small contribution - [Click Me 💗](https://www.buymeacoffee.com/bajrangCoder)

<details>
    <summary>
        Updates v2.1.2
    </summary>
    <ul>
        <li>Improved readme</li>
        <li>Fixed Settings issue</li>
        <li>Some important internal changes</li>
    </ul>
</details>
<br/>

> For previous change logs/updates, visit: [Change Log](https://github.com/bajrangCoder/acode-plugin-acodex/ChangeLog.md)

## Features

- **Easy to use**: AcodeX offers a terminal in the form of a movable panel, accessible by pressing `Ctrl+K` or by searching for "Open Terminal" in the command palette.

- **Productivity**: Developers can save time by accessing the terminal directly within Acode and executing commands without switching between apps.

- **Terminal panel**: The terminal panel is customizable - you can move it, resize it, minimize it, and maximize it according to your preferences.

- **User-friendly interface**: AcodeX offers a simple and intuitive interface suitable for all levels of developers.

- **Customizable**: You can customize the AcodeX terminal to your preferences.

- **Easy Directory Changing**: You can open any folder with a button click.

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
6. `.closeTerminal()`: Close the opened terminal.
7. `.convertAcodeUriToTermReadable(path)`: Convert Acode file URI to an actual path.
8. `.addTheme(themeName: string, colorSchema: IXtermTheme)`: Add a new theme to AcodeX's theme list.
9. `.applyTheme(themeName: string)`: Apply the given theme to the terminal.

Example of addTheme & applyTheme:

```javascript
const acodex = acode.require("acodex");
const themeName = "Test"; // name of theme
const colorSchema  = {
    // Theme colors here
}
// Add theme
acodex.addTheme(themeName, colorSchema);
// Apply theme 
acodex.applyTheme(themeName);
```

## Custom Fonts

Custom fonts are provided to load font files required by the Termux theme you are using or If you want to change font of AcodeX terminal.

To load a custom font:

1. Download the font files(**Note: Download nerd font file in case if you are loadimg for termux theme**).
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

## How to Use

> **Tutorial link**: [https://youtu.be/sXlIhrbpjyw](https://youtu.be/sXlIhrbpjyw)

- Start the server in Termux using: `acodeX-server`.
- To use AcodeX, press `Ctrl+K` or search for `"Open Terminal"` in the command palette (press `Ctrl+Shift+P` to open the command palette).
- Enter the port number, and the terminal will start.
- Use the minus icon button to hide the terminal while coding and the terminal button to show it.
- You can also drag the terminal panel around by clicking and dragging through the terminal header area.
- The `✗` button is for closing the terminal.
- The folder icon button on the terminal header is for navigating to opened files (in the editor) directory.

> Don't change colors while using any predefined theme; only change in the case of a custom one.

## Acknowledgments

AcodeX is made possible by the use of:

- [xtermjs](https://xtermjs.org/)
- [node-pty](https://github.com/microsoft/node-pty)
- [Termux](https://termux.dev/en/)

## Authors

- [@bajrangCoder](https://www.github.com/bajrangCoder) - AcodeX is created by Raunak Raj, a passionate developer who aims to make coding more accessible and efficient for everyone, even on phones.

To contribute to AcodeX, visit the plugin's GitHub page, leave a star 🌟 to show your support, report bugs, suggest improvements, or contribute to the codebase. AcodeX is an open-source project
, and contributions are welcomed from the community.

❤️❤️ Thanks for using AcodeX ❤️❤️