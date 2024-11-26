# Change Logs

## `Update v3.1.8`

- Added a new keybinds ctrl+a to select all
- touch selection support 
- Gui viewer support 
- added local ai support using ollama

## `Update v3.1.7`

- Fixed settings not saving issue (First backup your settings before updating)
- Added a new settings to control `letterSpacing`
- Some improvement to fallback font

## `Update v3.1.6`
- Image rendering support 
- Option to hide maximise terminal button 
- Added Key binding for maximising terminal - `Ctrl-Shift-T`

## `Update v3.1.5`
- Now it will handle automatically closing of server
- 🆕 key-bindings `Ctrl+Shift+I` to clear the terminal 
- updated xterm and its styling

## `Update v3.1.3 & v3.1.4`
- Enhanced AcodeX by integrating AI into the terminal, making it a standout option in the modern era. (Check `How to use AI section` for refrence)
- Updated the default font family for the Terminal to `Meslo NF Regular`.
- Resolved the issue with the `exit` command; now, typing `exit` in the terminal will promptly close the current session. 
- fixed settings issue (v3.1.4)

## `Update v3.1.2`
- added new api and there are some api changes , check Api section

## `Update v3.1.1`
- Fixed Font issue
- Fized the acodex not opening bug

## `Update v3.1.0`
- Fixed panel issue when changing the file tab position [#44](https://github.com/bajrangCoder/acode-plugin-acodex/pull/44)
- fixed plugin api problem of `acodex.openTerminal()` which was using deprecated method
- Added option to modify server host name from settings
- Added new keybindings such as <kbd>Ctrl-+</kbd>, <kbd>Ctrl--</kbd>, <kbd>Ctrl-Shift-C</kbd>
- Modified paste shortcut to <kbd>Ctrl+Shift+V</kbd>
- And in shortcuts you can use either capital letter or small for eg: <kbd>Ctrl-Shift-c</kbd> and <kbd>Ctrl-Shift-C</kbd> both will work fine
- redesigned the panel ui and chnaged icons
- lots of inner improvement, to improve overall performance and stability
- Added a Search functionality to search inside terminal
- fixed ui bug (of transparent mode)
- Fixed all known issues

## `Update v3.0.1`
- fixed [#38](https://github.com/bajrangCoder/acode-plugin-acodex/issues/38) in `v3.0.1`

## `Update v3.0.0`

- updated xtermjs and its addons
- added a `fontWeight` option in plugin settings
- added a `cursorInactiveStyle` option in plugin settings
- internal changes and improvement
- fixed transparent terminal Bug
- fixed resizing issue
- fixed minimising and maximising issue
- added a setting to change show terminal button/maximise button size from plugin settings
- fixed settings page issue
- now no any need of restarting terminal after changing its settings (except: transparency option and scroll option)
- added some additional keybindings for terminal for easy usability(read Additional Keybindings section in description for more)

## `Update v2.3.0` & `Update v2.3.1`

- Removed port prompt from starting of terminal, now you can only change port from Settings
- Added a setting to make terminal transparent
- Fixed loading of custom font issue
- Added many new themes like Ayulight, Ayudark, Ayu Mirage, Catppuccin, Dracula, NekonakoDjancoeg, SiduckOneDark, Elementary, Everblush, One Dark and modified `snazzy theme`
- Added some nerd fonts like FiraCode, VictorMono, Jetbrains, SauceCodePro, Meslo
- reduced the plugin size

## `Update v2.2.1`

- Fixed critical minimising issue (clear cache then try)
- Now no need to restart app after installing plugin

## `Update v2.2.0`

- Introducing the brand new **Multiple Sessions** which is power efficient and effective
- New Feature to keep track of terminal either you close acode accidentally
- Some Internal Improvement and Bug fixes
- Terminal will follow acode font if you aren't using any custom one
- You can use live-server in Acodex in background

## `Update v2.1.2`

-   Improved readme
-   Fixed Settings issue
-   Some important internal changes

## `Update v2.1.1`

-   fixed Settings issue
-   exposed api for creating theme for acodex by other theme plugin.

## `Update v2.1.0`

-   exposed more terminal api 🔌
-   make sure to update acodex server , otherwise it will not going to work.
-   removed every limitations, now you can run vim , etc 😅
-   added support for loading external custom fonts
-   now acodex comes with some predefined themes, you can chose it from Settings

## `Update v2.0.0`

-   exposed terminal api 🔌
-   improved Terminal and updated xtermjs library 🔼
-   now the web link in the terminal will be hyper linked onclicking it, it will open link in browser 🔗
-   added low budget Autocompletion 😂 , i.e tab autocompletion
-   now you can also use left & right arrow to navigate 🧭
-   fixed prompt bug 🐞
-   some minor improvements and changes 🤫
-   Added new AcodeX own logo, now no more copied logo 😅
-   added these shortcut(Read <strong>Supported key shortcut</strong> section of readme for more ☺️): <kbd>Ctrt+f</kbd>, <kbd>Right Arrow</kbd>, <kbd>Alt+f</kbd>, <kbd>Ctrl+Right arrow</kbd>, <kbd>Ctrl+b</kbd>, <kbd>Left arrow</kbd>, <kbd>Alt+b</kbd>, <kbd>Ctrl+Left arrow</kbd>, <kbd>Ctrl+a</kbd>, <kbd>Ctrl+e</kbd>, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Tab</kbd>,

## `Update v1.2.0`

-   fixed issue related to saving state
-   added color picker in plugin setting for themeing
-   now it will remember your terminal state for better experience
-   added two shortcut:
    -   <kbd>Ctrl+I</kbd> - to clear the terminal
    -   <kbd>Ctrl+P</kbd> - to copy text from the terminal

## `Update v1.1.8`

-   improved accessibility
-   floating button and terminal panel issue fixed
-   minor twicks

## `Update v1.1.7`

-   brand new tutorial link added in the readme of the plugin

## `Update v1.1.6`

-   terminal issue fixed
-   floating button improved, now it will be not hidden by keyboard
-   internal changes

## `Update v1.1.5`

Nothing fancy just a simple bugs 😑

## `Update v1.1.4`

-   little bit change in layout and icon
-   maximise terminal button is now draggable and you can drag it and keep it wherever you want
-   fixed bugs related to folder icon
-   removed changing of font family of terminal
-   some minor changes

## `Update v1.1.1`

-   changed icons
-   improved context menu
-   fixed bugs
-   removed arrow button from terminal header, instead of this use acode arrow buttons

## `Update v1.1.0`

-   Fixed Android keyboard issue, now you can use any keyboard you want
-   Fixed paste functionality issue
-   Fixed terminal unwanted behaviour
-   Many internal changes to improve performance
-   improved styling
-   Note: almost every encountered bugs are fixed

## `Update v1.0.9`

-   fixed bugs

## `Update v1.0.8`

-   fixed bugs

## `Update v1.0.7`

-   Added a button on terminal header for opening terminal in opened file directory.

## `Update v1.0.6`

-   Added Arrow button instead of input field on terminal header to use feature of <code>v1.0.5</code>
-   Now if you will close the app without closing terminal, then when you open app again the terminal will be start automatically from where you have closed app.

## `Update v1.0.5`

-   Now you can get previous command(history of command) same as Termux feature:
    -   For previous command -> <kbd>⇑</kbd>
    -   For next command -> <kbd>⇓</kbd>

## `Update v1.0.4`

-   Now you can use any keyboard in terminal(recommend -> keyboard which cantains ctrl key and so on)
-   Some Improvement
-   There is little bit limitations with keys that will be fixed in next update
-   Supported Keys
    -   <kbd>Enter key</kbd>
    -   <kbd>Space key</kbd>
    -   <kbd>Ctrl+C key</kbd>
    -   <kbd>Delete/Backspace key</kbd>
    -   Others treated as normal printable keys

## `Update v1.0.3`

-   Removed deprecated Acode API for smooth functioning in latest Acode

## `Update v1.0.2`

-   Plugin Setting Ui improved
-   For closing the terminal use <code>Ctrl+J</code>

## `Update v1.0.1`

-   Now you can customise terminal, by changing:
    -   Font Size
    -   Font Family
    -   Cursor Style
    -   Cursor Blink
    -   Scroll back
    -   Scroll Sensitivity
    -   Theme
