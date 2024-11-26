# AcodeX - Terminal Emulator

<p align="center">
  <a href="https://github.com/bajrangCoder/acode-plugin-acodex/stargazers"><img src="https://img.shields.io/github/stars/bajrangCoder/acode-plugin-acodex?colorA=363a4f&colorB=b7bdf8&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KPHBhdGggZD0iTTIzNS4yNCw4NC4zOGwtMjguMDYsMjMuNjgsOC41NiwzNS4zOWExMy4zNCwxMy4zNCwwLDAsMS01LjA5LDEzLjkxLDEzLjU0LDEzLjU0LDAsMCwxLTE1LC42OUwxNjQsMTM5bC0zMS42NSwxOS4wNmExMy41MSwxMy41MSwwLDAsMS0xNS0uNjksMTMuMzIsMTMuMzIsMCwwLDEtNS4xLTEzLjkxbDguNTYtMzUuMzlMOTIuNzYsODQuMzhhMTMuMzksMTMuMzksMCwwLDEsNy42Ni0yMy41OGwzNi45NC0yLjkyLDE0LjIxLTMzLjY2YTEzLjUxLDEzLjUxLDAsMCwxLDI0Ljg2LDBsMTQuMjEsMzMuNjYsMzYuOTQsMi45MmExMy4zOSwxMy4zOSwwLDAsMSw3LjY2LDIzLjU4Wk04OC4xMSwxMTEuODlhOCw4LDAsMCwwLTExLjMyLDBMMTguMzQsMTcwLjM0YTgsOCwwLDAsMCwxMS4zMiwxMS4zMmw1OC40NS01OC40NUE4LDgsMCwwLDAsODguMTEsMTExLjg5Wm0tLjUsNjEuMTlMMzQuMzQsMjI2LjM0YTgsOCwwLDAsMCwxMS4zMiwxMS4zMmw1My4yNi01My4yN2E4LDgsMCwwLDAtMTEuMzEtMTEuMzFabTczLTEtNTQuMjksNTQuMjhhOCw4LDAsMCwwLDExLjMyLDExLjMybDU0LjI4LTU0LjI4YTgsOCwwLDAsMC0xMS4zMS0xMS4zMloiIHN0eWxlPSJmaWxsOiAjQ0FEM0Y1OyIvPgo8L3N2Zz4="></a>
  <a href="https://acode.app/plugin/bajrangcoder.acodex"><img src="https://img.shields.io/github/v/release/bajrangCoder/acode-plugin-acodex?colorA=363a4f&colorB=a6da95&style=for-the-badge&logo=github&logoColor=cad3f5"></a>
  <a href="https://github.com/bajrangCoder/acode-plugin-acodex/issues"><img src="https://img.shields.io/github/issues/bajrangCoder/acode-plugin-acodex?colorA=363a4f&colorB=f5a97f&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KPHBhdGggZD0iTTIxNiwzMlYxOTJhOCw4LDAsMCwxLTgsOEg3MmExNiwxNiwwLDAsMC0xNiwxNkgxOTJhOCw4LDAsMCwxLDAsMTZINDhhOCw4LDAsMCwxLTgtOFY1NkEzMiwzMiwwLDAsMSw3MiwyNEgyMDhBOCw4LDAsMCwxLDIxNiwzMloiIHN0eWxlPSJmaWxsOiAjQ0FEM0Y1OyIvPgo8L3N2Zz4="></a>
  <a href="https://acode.app/plugin/bajrangcoder.acodex"><img alt="Download Counts" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Facode.app%2Fapi%2Fplugin%2Fbajrangcoder.acodex&query=downloads&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYWQzZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcnJvdy1kb3duLXRvLWxpbmUiPjxwYXRoIGQ9Ik0xMiAxN1YzIi8+PHBhdGggZD0ibTYgMTEgNiA2IDYtNiIvPjxwYXRoIGQ9Ik0xOSAyMUg1Ii8+PC9zdmc+&logoColor=cad3f5&label=Downloads&labelColor=363a4f&color=c6a0f6"></a>
</p>

> [!Warning]
> This plugin requires the [acodex-server](https://github.com/bajrangCoder/AcodeX-server) NodeJS package to be installed and running on [Termux](https://termux.dev).

[AcodeX](https://github.com/bajrangCoder/acode-plugin-acodex) is a powerful and AI integrated terminal plugin with **90k++ downloads** for [Acode](https://acode.foxdebug.com/) that enhances your coding productivity by adding in-app Termux terminal integration. With AcodeX, you can execute terminal commands directly from within the Acode app, eliminating the need to switch between apps for coding and terminal access. AcodeX has almost every terminal feature and also it is more feature rich when it comes to rendering things compared termux etc (Thanks to xtermjs)

> [!NOTE]
> When starting a new terminal, be sure to adjust the terminal panel according to your screen. You can drag it to your desired position, and it will automatically adjust the columns and rows according to your screen size.

<a href="https://www.buymeacoffee.com/bajrangCoder" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" width="170"/></a>

<a href='https://ko-fi.com/M4M3QPI7K' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

---

## Table of Contents
- [Features](#-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [For Existing Users: Enabling GUI Features](#for-existing-users-enabling-gui-features)
- [How to Use](#how-to-use)
- [Running GUI Apps](#how-to-run-gui-apps-in-acodex)
- [Selection Context Menu](#why-is-there-no-selection-context-menu)
- [Keybindings](#additional-terminal-keybindings)
- [Using AI](#how-to-use-ai)
- [Api Docs](#api-docs)
- [Custom Fonts](#custom-fonts)
- [Support Project](#-contribute-financially)
- [License](#license)

---

<details>
    <summary>
      <h3 style="display:inline">Update v3.1.9</h3>
    </summary>

- First backup your settings before updating
- fixed some bugs related to disposing of terminal reported by Users
- Added font ligatures support (you can disable it from settings)
- fix: ctrl - k issue when terminal is minimised or opened
- now ctrl-k can also be used as shortcut to maximise terminal if it is open and minimised 
- new settings to on/off haptic(vibration) on Selection start
- some minor fixes and few typos adjustments

</details>
<br/>

> For previous change logs/updates, visit: [Change Log](https://github.com/bajrangCoder/acode-plugin-acodex/blob/main/ChangeLog.md)

### Roadmap 

- full page mode for AcodeX similar to other terminal plugins 
- fix bugs related to touch selection and gui viewer
- ssh based Terminal support 
- config(dotfiles) for acodex to customise everything from the config file 
- suggest more 🙌

## 💥 Features

- **User-Friendly Terminal**: Seamlessly integrated terminal within Acode. Open it with `Ctrl+K` or search `"Open Terminal"` in the command palette.

- **AI Assistance**: Unsure about a command? Just ask, and AI will write it for you.

- **Boost Productivity**: Execute commands directly in Acode without switching apps, saving valuable time.

- **Customizable Terminal Panel**: Move, resize, minimize, or maximize the terminal panel to fit your workflow.

- **Intuitive Interface**: Designed for developers of all skill levels with an easy-to-use interface.

- **Personalization**: Tailor the terminal’s appearance and behavior to your preferences.

- **Efficient Session Management**: Manage multiple sessions smoothly while minimizing resource usage.

- **Persistent Sessions**: Terminal sessions stay active even when Acode is closed. Resume where you left off when reopened.

- **Easy Directory Navigation**: Change directories with a single click for hassle-free navigation.

- **Beautiful Themes**: Choose from 10+ stunning themes to personalize your coding environment.

- **Transparency Options**: Adjust panel transparency for a sleek, customized look.(it will take resources)

- **Nerd Fonts Support**: Preloaded with Nerd Fonts and options to add your own custom fonts.

- **Keyboard Shortcuts**: Use shortcuts to perform tasks efficiently without relying on the mouse.

- **Extensible**: Highly pluggable for other plugins to integrate and extend functionality.

- **Search Functionality**: Quickly search within the terminal for easy access to commands.

- **Mouse/Touch Selection**: Supports selection within the terminal using mouse or touch.

- **GUI App Support**: Run GUI apps via VNC (for learning and experimentation).

- **Image Rendering**: Supports rendering images in the terminal (enable in settings).

- **Font Ligatures**: Supports font ligatures in supported font family


## Prerequisites

To use AcodeX, you need to have the [Termux app](https://termux.dev/en/) installed on your Android device. However, you don't need to switch between apps to use the terminal, as AcodeX offers a convenient way to access the terminal directly within the Acode app with the help of Termux.

## Installation

1. **Install the Plugin in Acode**  
   Open the Acode App and navigate to:  
   `Acode > Settings > Plugins > AcodeX`, then install the plugin.

2. **Install the Server in Termux**  
   To install everything required, including prompts for GUI-related tools like TigerVNC and Websockify (if needed), run the following command in Termux:

   ```bash
   curl -sL https://raw.githubusercontent.com/bajrangCoder/acode-plugin-acodex/main/installServer.sh | bash
   ```

   Alternatively, you can manually install the required packages:

   ```bash
   pkg update && pkg upgrade -y
   pkg install python nodejs -y
   npm i -g acodex-server
   pkg install x11-repo
   pkg install tigervnc -y
   curl -L https://raw.githubusercontent.com/bajrangCoder/websockify_rs/main/install.sh | bash
   ```

   The key steps are:
   - Install `python` and `nodejs`.
   - Install the `acodex-server` package globally using npm.
   - If you plan to run GUI apps, also install `tigervnc` and `websockify_rs`.

> [!IMPORTANT]
> After installing TigerVNC, make sure to set a password by running the `vncserver` command the first time.

4. **Termux Specific Step**  
   Before installing on Termux, run this command to bypass a Termux-specific issue:

   ```bash
   cd $HOME && mkdir -p .gyp && echo "{'variables': {'android_ndk_path': ''}}" > .gyp/include.gypi
   ```

> [!TIP]
> After successfully installing `acodex-server`, you can uninstall Python if it's no longer needed.


## For Existing Users: Enabling GUI Features

If you're an existing user and want to start using the new GUI features, follow these steps to install the required packages:

1. **Install TigerVNC and Websockify**  
   Run the following commands in Termux to install the necessary packages:

   ```bash
   pkg install x11-repo
   pkg install tigervnc -y
   curl -L https://raw.githubusercontent.com/bajrangCoder/websockify_rs/main/install.sh | bash
   ```

2. **Setup VNC Server**  
   After installation, run the `vncserver` command for the first time to set up a password:

   ```bash
   vncserver
   ```

   This will prompt you to create a password for your VNC server.

3. **Start Using GUI Features**  
   Once you’ve set up the VNC server, AcodeX will handle everything for you automatically, enabling the use of GUI apps seamlessly. but you will need to enable this feature from AcodeX settings.(after enabling you will get an image like icon on AcodeX header for viewing the gui)

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

## How to Run GUI Apps in AcodeX?

To run GUI apps within AcodeX, follow the steps below:

1. **Install the Required Packages**  
   Ensure that you have installed the necessary packages by following the instructions in the [Installation](#installation) or [Existing Users Setup](#for-existing-users-enabling-gui-features) sections.

2. **Enable GUI Viewer Settings**  
   - Navigate to `Acode > Settings > Plugins > AcodeX`.  
   - Tap the ⚙️ icon at the top-right corner of the AcodeX header to access the plugin settings.  
   - Enable the **GUI Viewer** option from the settings.

3. **Open AcodeX Terminal**  
   - Open the AcodeX terminal using the `Ctrl+K` shortcut, or search for "Open Terminal" in the command palette.

4. **Launch the GUI Viewer**  
   - In the terminal header, you'll see a small **image-like icon**.  
   - Click the icon. The first time you do this, it will set up the necessary configurations and prompt you for the VNC password.  
   - Enter your VNC password, which will be saved securely in the local storage for future sessions.

5. **Using the GUI Viewer**  
   After setup, the GUI Viewer page will open. On this page, you’ll find multiple interactive elements such as:

   - **Display Variable Button**:  
     This button copies the `DISPLAY` environment variable needed for running GUI apps.  
     
     **Before launching a GUI app**, always click the **Display Button** to set up the display environment in the terminal. If you skip this step, the GUI app will fail with a "No display variable" error.

   - **Keyboard Icon**:  
     A keyboard icon is available to activate your mobile keyboard for typing within GUI applications.

6. **Run Your GUI App**  
   - In the AcodeX terminal, **click the Display button**, which will copy and execute the `export DISPLAY` command.  
   - Start your GUI app in the terminal, and it will open in the integrated viewer.

> [!TIP]
> Always verify that the `export DISPLAY` command was executed successfully before launching your GUI application.
   
> [!NOTE]
> the display env variable command needs to run once in a terminal session 

### Why is there no selection context menu?

On small screens, the context menu can clutter the interface. Additionally, since the AcodeX panel is adjustable, the menu can behave unpredictably. We believe in prioritizing **keyboard shortcuts** over UI buttons for efficiency.

However, you can still perform all tasks using the following key shortcuts:

- **Select All**: <kbd>Ctrl + A</kbd>
- **Copy**: <kbd>Ctrl + Shift + C</kbd>
- **Paste**: <kbd>Ctrl + Shift + V</kbd>

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
- <kbd>Ctrl+a</kbd> : select all

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
- [noVnc](https://github.com/novnc/noVnc)

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

You can also support the development of AcodeX Plugin by making a financial contribution. Donations help in maintenance and further development. Also you can mention your GitHub handle when making contribution

<a href="https://www.buymeacoffee.com/bajrangCoder" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40" width="170"/></a>

<a href='https://ko-fi.com/M4M3QPI7K' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi1.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

### ⭐ Star on GitHub

If you find AcodeX Plugin useful, consider giving it a star on GitHub. It's a simple way to show your appreciation and help others discover the project. and You can review AcodeX on https://acode.app 

Your contributions, whether through code, financial support, or a simple star, make AcodeX Plugin better for the entire community. Thank you for your support!

### License

[MIT](https://github.com/bajrangCoder/acode-plugin-acodex/License.md)

❤️❤️ Thanks for using AcodeX ❤️❤️
