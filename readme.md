# AcodeX - Terminal Emulator

> [!Warning]
> This plugin requires the [acodex-server](https://github.com/bajrangCoder/AcodeX-server) NodeJS package to be installed and running on [Termux](https://termux.dev).

[AcodeX](https://github.com/bajrangCoder/acode-plugin-acodex) is a powerful and AI integrated terminal plugin with **70k++ downloads** for [Acode](https://acode.foxdebug.com/) that enhances your coding productivity by adding in-app Termux terminal integration. With AcodeX, you can execute terminal commands directly from within the Acode app, eliminating the need to switch between apps for coding and terminal access.

> [!Note]
> When starting a new terminal, be sure to adjust the terminal panel according to your screen. You can drag it to your desired position, and it will automatically adjust the columns and rows according to your screen size.

<a href="https://www.buymeacoffee.com/bajrangCoder" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" width="170"/></a>

<a href='https://ko-fi.com/M4M3QPI7K' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### If you can then support this project financially with any of the payment method ☺️ - [Click Me 💗](https://www.buymeacoffee.com/bajrangCoder)


<details>
    <summary>
      <h3 style="display:inline">Update v3.1.7</h3>
    </summary>

- Fixed settings not saving issue (First backup your settings before updating)
- Added a new settings to control `letterSpacing`
- Some improvement to fallback font

</details>
<br/>

> For previous change logs/updates, visit: [Change Log](https://github.com/bajrangCoder/acode-plugin-acodex/blob/main/ChangeLog.md)

## 💥 Features

- **User-Friendly Terminal**: AcodeX provides a seamless terminal experience within Acode. You can open the terminal panel with a simple `Ctrl+K` shortcut or by searching for "Open Terminal" in the command palette.

- **Integrated AI**: if you don't know any command, just ask the ai and ai will write ✍️ it

- **Enhanced Productivity**: With AcodeX, developers can save time by executing commands directly within Acode, eliminating the need to switch between multiple applications.

- **Customizable Terminal Panel**: The terminal panel in AcodeX is fully customizable. You can easily move, resize, minimize, or maximize it to suit your workflow.

- **Intuitive Interface**: AcodeX offers an intuitive and user-friendly interface suitable for developers of all skill levels.

- **Tailored to Your Preferences**: Customize the AcodeX terminal to match your personal preferences, making it your own.

- **Efficient Session Management**: Create and manage multiple sessions efficiently, minimizing resource consumption and power usage.

- **Background Persistence**: AcodeX ensures that your terminal session stays active even if you close Acode. When you reopen Acode, you can continue seamlessly without interruption.

- **Easy Directory Navigation**: Navigate to any folder with a simple button click, simplifying directory changes.

- **Beautiful Themes**: AcodeX comes with a selection of stunning themes (10+) to personalize your coding environment.

- **Transparency Options**: Customize the terminal panel's transparency to your liking, adding a touch of visual elegance to your workspace.

- **Nerd Fonts Support**: Preloaded with a collection of Nerd Fonts and the ability to load your own custom fonts, ensuring your terminal looks and feels the way you want.

- **Keyboard Shortcuts**: Perform mouse-like tasks using keyboard shortcuts, streamlining your workflow and boosting efficiency.

- **Extensible**: AcodeX is highly pluggable, allowing other plugins to harness its API for creating innovative extensions and enhancing functionality.

- **Easy Search**: Easily search inside the terminal 

- Supports image rendering but by default its disabled

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

But if you are installing it on termux then make sure to run this command first to bypass the termux specific issue:

```bash
cd $HOME && mkdir -p .gyp && echo "{'variables': {'android_ndk_path': ''}}" > .gyp/include.gypi
```

> [!Note]
> You can uninstall python after successful installation of `acodex-server`

## How to Use

> **Tutorial link**: [https://youtu.be/sXlIhrbpjyw](https://youtu.be/sXlIhrbpjyw)

- Start the server in Termux using: `acodeX-server`.
- To use AcodeX, press `Ctrl+K` or search for `"Open Terminal"` in the command palette (press `Ctrl+Shift+P` to open the command palette).
- Enter the port number, and the terminal will start.
- Plus `+` icon to create new session 
- Use the minus icon button to hide the terminal while coding and the terminal button or `Ctrl-Shift-T` to show it.
- You can also drag the terminal panel around by clicking and dragging through the terminal header area.
- The `✗` button is for closing the terminal.
- The folder icon button on the terminal header is for navigating to opened files (in the editor) directory.

## Additional Terminal Keybindings

AcodeX provides some additional Keybindings for easy usability of terminal features.

> [!Note]
> These keybindings will only work if you will use these inside terminal only. except the * marked one

Following are the supported Keybindings :

- <kbd>Ctrl+N</kbd> : opens a new terminal session 
- <kbd>Ctrl+W</kbd> : close opened terminal session 
- <kbd>Ctrl+Shift+V</kbd> : paste something from clipboard inside your terminal
- <kbd>Ctrl+Shift+C</kbd> : copy selected text from terminal
- <kbd>Ctrl+Left Arrow</kbd> : open previous session corresponding to current one like if current one is session 2 then it will open session 1(if exists)
- <kbd>Ctrl+Right Arrow</kbd> : open next session corresponding to current one like if current one is session 2 then it will open session 2(if exists)
- <kbd>Ctrl+1</kbd> : opens session 1
- <kbd>Ctrl+2</kbd> : opens session 2 if exists
- <kbd>Ctrl+3</kbd> : opens session 3 if exists
- <kbd>Ctrl+4</kbd> : opens session 4 if exists
- <kbd>Ctrl+5</kbd> : opens session 5 if exists
- <kbd>Ctrl+Shift+I</kbd> : clear the terminal 
- <kbd>Ctrl+Shift+T</kbd> : Maximise the terminal *

### How to Use AI

To leverage the power of artificial intelligence within `AcodeX Terminal` Plugin, follow these steps:

1. **Obtain API Key**: Before using the AI capabilities, you need to acquire an API key for the respective model you wish to utilize. Visit the website of your chosen model and obtain the API key. Once obtained, navigate to the AcodeX settings and input the API key. Additionally, you can select your preferred model from the list of currently supported models, which include:
   - Deepseek : [Get API key 🚀](https://platform.deepseek.com/api_keys)
   - Chatgpt : [Get API key 🚀](https://platform.openai.com/account/api-keys)
   - Gemini-Pro(default) : [Get API key 🚀](https://aistudio.google.com/app/apikey)

2. **Accessing AI in the Terminal**:
   - To access the AI functionality within the terminal, simply type `#`. This action will prompt a popup window to appear.
   - Within the popup window, you can input your prompt or query.
   - Upon entering your prompt, click the button provided to prompt the AI to generate a command based on your input.
   - The generated command will be written into the terminal. From there, you have the option to execute the command as is or modify it according to your requirements.

> [!Warning]
> Avoid prompts that may lead the AI to provide descriptive or explanatory responses instead of actionable commands.

> [!Note]
> Use AI wisely, as there may be token limits associated with your API key. Be mindful of your usage to avoid exceeding token limits and potential interruptions in service.

We value your feedback! Please provide any suggestions or feedback to help us improve the AI integration and suggest additional AI models for future enhancements.

Stay tuned for more AI integrations and improvements coming soon 😊!

## API Docs
The `acodex` plugin provides a set of api to interact with the AcodeX terminal.

#### `execute(cmd: string, withEnter?: boolean = true) => void`

Executes a command in the AcodeX terminal.

- **Parameters:**
  - `cmd` (string): The command to be executed.
  - `withEnter` (boolean, optional): Whether to append an Enter keypress. Defaults to `true`.

#### `isMinimized() => boolean`

Returns a boolean indicating whether the AcodeX terminal is currently minimized or not.

#### `isTerminalOpened() => boolean`

Returns a boolean indicating whether the AcodeX terminal is currently opened or not.

#### `maximiseTerminal() => void`

Maximizes the AcodeX terminal if it is opened and minimized.

#### `openTerminal(termContainerHeight: number = 270, port: number = this.settings.port) => Promise<SessionAPI>`

Opens the AcodeX terminal.

- **Parameters:**
  - `termContainerHeight` (number, optional): Height of the terminal container. Defaults to `270`.
  - `port` (number, optional): Port number for the terminal server. Defaults to the value from `this.settings.port`.

- **Returns:**
  - A `Promise` resolving to a `SessionAPI` object.

#### `createSession() => Promise<SessionAPI>`

Creates a new terminal session.

- **Returns:**
  - A `Promise` resolving to a `SessionAPI` object.

#### `changeSession(sessionName: string) => Promise<SessionAPI>`

Changes the active terminal session.

- **Parameters:**
  - `sessionName` (string): Name of the session to switch to.

- **Returns:**
  - A `Promise` resolving to a `SessionAPI` object.

#### `closeTerminal() => void`

Closes the AcodeX terminal if it is opened.

#### `convertAcodeUriToTermReadable(path: string) => string`

Converts an Acode URI to a format readable by the terminal.

- **Parameters:**
  - `path` (string): Acode URI path.

- **Returns:**
  - A string representing the converted path.

#### `addTheme(themeName: string, colorSchema: object) => void`

Adds a new theme to the AcodeX terminal.

- **Parameters:**
  - `themeName` (string): Name of the theme.
  - `colorSchema` (object): Color schema object for the theme.

#### `applyTheme(themeName: string) => void`

Applies a theme to the AcodeX terminal.

- **Parameters:**
  - `themeName` (string): Name of the theme to apply.

### SessionAPI Object

The `SessionAPI` object provides methods for interacting with the terminal session.

#### `onmessage(callback: (data: string | Uint8Array) => void) => void`

Registers a callback function to be called when a message is received form server.

- **Parameters:**
  - `callback` ((data: string | Uint8Array) => void): Callback function to handle incoming messages.

#### `write(cmd: string, withEnter: boolean = true) => void`

Writes/Executes a command to the terminal.

- **Parameters:**
  - `cmd` (string): The command to write.
  - `withEnter` (boolean, optional): Whether to append an Enter keypress. Defaults to `true`.

### Example Usage

```javascript
const acodex = acode.require("acodex");

acodex.execute("ls"); // execute the ls command in terminal
const isMinimized = acodex.isMinimized();
const isOpened = acodex.isTerminalOpened();
acodex.maximiseTerminal();

const session = await acodex.openTerminal();
session.onmessage(data => console.log(data));
session.write("ls");

const sessionSocket = await acodex.createSession();
sessionSocket.onmessage(data => console.log(data));
sessionSocket.write("ls");

const changeSessionSocket = await acodex.changeSession("AcodeX2");
changeSessionSocket.onmessage(data => console.log(data));
changeSessionSocket.write("ls");

acodex.closeTerminal();
const termReadablePath = acodex.convertAcodeUriToTermReadable("file://storage/emulated/0/myTheme/acode/file/path");
acodex.addTheme("myTheme", { background: "#fff", text: "#000" }); // you can find more colors in themes.js
acodex.applyTheme("myTheme");
```

## Custom Fonts

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

## Acknowledgments

AcodeX is made possible by the use of:

- [xtermjs](https://xtermjs.org/)
- [Termux](https://termux.dev/en/)

## Authors

- [@bajrangCoder](https://github.com/bajrangCoder) - AcodeX is created by Raunak Raj


## 🚀 Feature Requests

We welcome your suggestions for enhancing AcodeX. If you have an idea for a new feature or improvement, please consider opening a feature request on our [GitHub Issues](https://github.com/bajrangCoder/acode-plugin-acodex/issues) page. Be sure to provide detailed information about the feature you'd like to see, along with any use cases or scenarios that could benefit from it.

## 🐞 Bug Reports

If you encounter any issues or unexpected behavior while using AcodeX, please help us by reporting the problem. To report a bug, visit our [GitHub Issues](https://github.com/bajrangCoder/acode-plugin-acodex/issues) page and create a new issue. Please include the following information in your bug report:

- A clear and concise description of the issue.
- Steps to reproduce the problem.
- Information about your environment, including your operating system and AcodeX version.
- Screenshots or error messages, if applicable.

## 🚀 Contribute to AcodeX

Your contributions are highly appreciated and welcome! You can contribute to the AcodeX Plugin in various ways:

### 👨‍💻 Contribute Code

1. **Fork the Repository**: Start by forking the [AcodeX Plugin](https://github.com/bajrangCoder/acode-plugin-acodex) repository

2. **Create an Issue**: If you plan to add new features or fix a bug, it's a good practice to create an issue first. Describe the problem or feature you want to work on. This allows for discussion and collaboration with the maintainers.

3. **Make Changes**: After forking the repo, create a new branch, and start working on your changes.

4. **Open a Pull Request**: Once your changes are ready, open a pull request (PR) on the original repository. Reference the issue you created if relevant.

5. **Code Review**: Your PR will be reviewed by the maintainers, and feedback may be provided. Be prepared to make adjustments if needed.

6. **Merge**: Once your PR is approved, it will be merged into the main branch. Congratulations, your contribution is now part of AcodeX Plugin!

### Steps to setup AcodeX locally

1. Fork it and Clone the repo
```bash
git clone https://github.com/bajrangCoder/acode-plugin-acodex.git
```

2. navigate to acodex directory and install the dependency
```bash
pnpm install
```
3. For building the plugin zip
```bash
pnpm build
```

> [!Warning]
> You will need [acodex-server](https://github.com/bajrangCoder/AcodeX-server) NodeJS package to be installed and running on [Termux](https://termux.dev) to test the plugin.


### 💰 Contribute Financially

You can also support the development of AcodeX Plugin by making a financial contribution. Donations help in maintenance and further development.

<a href="https://www.buymeacoffee.com/bajrangCoder" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" width="170"/></a>

<a href='https://ko-fi.com/M4M3QPI7K' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### ⭐ Star on GitHub

If you find AcodeX Plugin useful, consider giving it a star on GitHub. It's a simple way to show your appreciation and help others discover the project. and You can review AcodeX on https://acode.app 

Your contributions, whether through code, financial support, or a simple star, make AcodeX Plugin better for the entire community. Thank you for your support!

### License

[MIT](https://github.com/bajrangCoder/acode-plugin-acodex/License.md)

❤️❤️ Thanks for using AcodeX ❤️❤️
