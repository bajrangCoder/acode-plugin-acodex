import plugin from "../plugin.json";
import style from "./style.scss";

// xtermjs 
import { Terminal } from 'xterm';
// xtermjs addons
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { AttachAddon } from 'xterm-addon-attach';

// acode commopents & api
const alert = acode.require('alert');
const confirm = acode.require('confirm');
const helpers = acode.require('helpers');
const prompt = acode.require('prompt');
const appSettings = acode.require('settings');


/*
TODO:
- Fix keyboard issue
*/

class AcodeX {
    isDragging = false;
    startY;
    startHeight;
    // default settings for terminal
    CURSOR_BLINK = true;
    CURSOR_STYLE1 = "block";
    CURSOR_STYLE2 = "underline";
    CURSOR_STYLE3 = "bar";
    FONT_SIZE = 18;
    SCROLLBACK = 1000;
    SCROLL_SENSITIVITY = 1000;
    FONT_FAMILY = "Fira Code, monospace";
    // Terminal Theme Color
    BACKGROUND_COLOR = "#1c2431";
    FOREGROUND_COLOR = "#cccccc";
    SELECTIONBACKGROUND = "#399ef440";
    BLACK = "#666666";
    BLUE = "#399ef4";
    BRIGHT_BLACK = "#666666";
    BRIGHT_BLUE = "#399ef4";
    BRIGHT_CYAN = "#21c5c7";
    BRIGHT_GREEN = "#4eb071";
    BRIGHT_MAGENTA = "#b168df";
    BRIGHT_RED = "#da6771";
    BRIGHT_WHITE = "#efefef";
    BRIGHT_YELLOW = "#fff099";
    CYAN = "#21c5c7";
    GREEN = "#4eb071";
    MAGENTA = "#b168df";
    RED = "#da6771";
    WHITE = "#efefef";
    YELLOW = "#fff099";
    
    
    constructor() {
        if (!appSettings.value[plugin.id]) {
          appSettings.value[plugin.id] = {
            cursorBlink: this.CURSOR_BLINK,
            cursorStyle: this.CURSOR_STYLE1,
            fontSize: this.FONT_SIZE,
            scrollBack: this.SCROLLBACK,
            scrollSensitivity: this.SCROLL_SENSITIVITY,
            fontFamily: this.FONT_FAMILY,
            backgroundColor: this.BACKGROUND_COLOR,
            foregroundColor: this.FOREGROUND_COLOR,
            selectionBackground: this.SELECTIONBACKGROUND,
            black: this.BLACK,
            blue: this.BLUE,
            brightBlack: this.BRIGHT_BLACK,
            brightBlue: this.BRIGHT_BLUE,
            brightCyan: this.BRIGHT_CYAN,
            brightGreen: this.BRIGHT_GREEN,
            brightMagenta: this.BRIGHT_MAGENTA,
            brightRed: this.BRIGHT_RED,
            brightWhite: this.BRIGHT_WHITE,
            brightYellow: this.BRIGHT_YELLOW,
            cyan: this.CYAN,
            green: this.GREEN,
            magenta: this.MAGENTA,
            red: this.RED,
            white: this.WHITE,
            yellow: this.YELLOW,
          };
          appSettings.update(false);
        }
    }
    
    async init() {
        try{
            // load xterm.css
            helpers.loadStyles(this.baseUrl+'xterm.css')
            this.$style = tag("style",{
                textContent: style
            });
            document.head.append(this.$style);
            // add command in command Pallete for opening and closing terminal
            editorManager.editor.commands.addCommand({
                name: "acodex:open_terminal",
                description: "Open Terminal",
                bindKey: {win: 'Ctrl-K'},
                exec: this.openTerminal.bind(this)
            });
            editorManager.editor.commands.addCommand({
                name: "acodex:close_terminal",
                description: "Close Terminal",
                bindKey: {win: 'Ctrl-X'},
                exec: this.closeTerminal.bind(this)
            });
            // main terminal container
            this.$terminalContainer = tag("div",{
                className: "terminal-container"
            });
            this.$terminalHeader = tag("div",{
                className: "terminal-header"
            });
            this.$terminalTitle = tag("h3",{
                textContent: "AcodeX"
            });
            this.$cmdInput = tag("input",{
                type:'text',
                placeholder: 'Type your command here..'
            });
            this.$cmdInput.onchange = this.runCmdByInp.bind(this);
            const $controlBtn = tag("div",{
                className: "control-btn"
            });
            this.$hideTermBtn = tag("button",{
                className: "hide-terminal-btn",
                textContent: "⇓"
            });
            this.$closeTermBtn = tag("button",{
                className: "close-terminal-btn",
                textContent: "✗"
            });
            $controlBtn.append(...[this.$hideTermBtn,this.$closeTermBtn])
            this.$terminalHeader.append(...[this.$terminalTitle,this.$cmdInput,$controlBtn]);
            this.$terminalContent = tag("div",{
                className: "terminal-content",
            });
            this.$terminalContainer.append(...[this.$terminalHeader,this.$terminalContent]);
            // show terminal button
            this.$showTermBtn = tag("button",{
                className: "show-terminal-btn",
                textContent: "⇑"
            });
            // append Terminal panel to app main
            app.get("main").append(...[this.$terminalContainer,this.$showTermBtn]);
            
            this.$showTermBtn.classList.add("hide");
            this.$terminalContainer.classList.add("hide");
            // add event listnner to all buttons and terminal panel header
            this.$terminalTitle.addEventListener('mousedown', this.startDragging.bind(this));
            this.$terminalTitle.addEventListener('touchstart', this.startDragging.bind(this));
            this.$closeTermBtn.addEventListener('click',this.closeTerminal.bind(this));
            this.$hideTermBtn.addEventListener('click',this.minimise.bind(this));
            this.$showTermBtn.addEventListener('click',this.maxmise.bind(this));
            window.addEventListener('mousemove', this.drag.bind(this));
            window.addEventListener('touchmove', this.drag.bind(this));
            window.addEventListener('mouseup', this.stopDragging.bind(this));
            window.addEventListener('touchend', this.stopDragging.bind(this));
        }catch(err){
            alert("Please Restart the App")
        }
    }
    
    async openTerminal(){
        /*
        open terminal in app
        */
        try{
            const port = await prompt("Port","8767","number",{required: true,});
            if(port){
                this.$terminalContainer.classList.remove('hide');
                this.$terminalContainer.style.height = "270px";
                // initialise xtermjs Terminal class
                this.$terminal = new Terminal({
                    cursorBlink: this.settings.cursorBlink,
                    cursorStyle: this.settings.cursorStyle,
                    scrollBack: this.settings.scrollBack,
                    scrollSensitivity: this.settings.scrollSensitivity,
                    fontSize: this.settings.fontSize,
                    fontFamily: this.settings.fontFamily,
                    theme: {
                        background: this.settings.backgroundColor,
                        foreground: this.settings.foregroundColor,
                        selectionBackground: this.settings.selectionBackground,
                        black: this.settings.black,
                        blue: this.settings.blue,
                        brightBlack: this.settings.brightBlack,
                        brightBlue: this.settings.brightBlue,
                        brightCyan: this.settings.brightCyan,
                        brightGreen: this.settings.brightGreen,
                        brightMagenta: this.settings.brightMagenta,
                        brightRed: this.settings.brightRed,
                        brightWhite: this.settings.brightWhite,
                        brightYellow: this.settings.brightYellow,
                        cyan: this.settings.cyan,
                        green: this.settings.green,
                        magenta: this.settings.magenta,
                        red: this.settings.red,
                        white: this.settings.white,
                        yellow: this.settings.yellow
                    }
                });
                this.$fitAddon = new FitAddon();
                this.$terminal.loadAddon(this.$fitAddon);
                this.$terminal.open(this.$terminalContent);
                this.$terminal.loadAddon(new WebglAddon());
                this.ws = new WebSocket(`ws://localhost:${port}/`);
                const attachAddon = new AttachAddon(this.ws);
                this.$terminal.loadAddon(attachAddon);
                this.$fitAddon.fit();
            }
        } catch(err){
            window.alert(err);
        }
    }
    
    async runCmdByInp(){
        let cmd = this.$cmdInput.value;
        this.ws.send(cmd);
        this.$cmdInput.value = '';
    }
    
    async closeTerminal(){
        /*
        remove terminal from  app
        */
        let confirmation = await confirm("Warning","Are you sure ?");
        if(!confirmation) return;
        this.$terminalContent.innerHTML = '';
        this.$terminalContainer.classList.add('hide');
        this.$showTermBtn.classList.add('hide');
    }
    
    startDragging(e) {
        if (e.type === 'touchstart') {
            this.startY = e.touches[0].clientY;
        } else {
            e.preventDefault();
            this.startY = e.clientY;
        }
        this.startHeight = this.$terminalContainer.clientHeight;
        this.isDragging = true;
    }
    
    drag(e) {
        if (!this.isDragging) {
            return;
        }
        
        e.preventDefault();
        
        let currentY;
        if (e.type === 'touchmove') {
            currentY = e.touches[0].clientY;
        } else {
            currentY = e.clientY;
        }
        
        // Calculate the difference between the current and initial touch/mouse position
        const diffY = currentY - this.startY;
        
        // Get the new height of the panel container
        let newHeight = this.startHeight - diffY;
        
        // Restrict the height of the panel container to the screen height
        const screenHeight = window.innerHeight;
        newHeight = Math.min(newHeight, screenHeight);
        
        // Set the new height of the panel container
        if(newHeight<=100){
            return;
        }
        this.$terminalContainer.style.height = newHeight + 'px';
        this.$terminalContent.style.height = (newHeight - 50)+'px';
        this.$fitAddon.fit();
    }
    
    stopDragging(e) {
        this.isDragging = false;
    }
    
    minimise(){
        /*
        hide terminal and active the show terminal button
        */
        try{
            let contHeight = window.getComputedStyle(this.$terminalContainer).height;
            if(contHeight != '0px'){
                this.$terminalContainer.style.height = 0;
                this.$terminalContent.style.height = 0;
                this.$fitAddon.fit();
                this.$showTermBtn.classList.remove('hide')
            }
        }catch(err){
            window.alert(err)
        }
    }
    
    maxmise() {
        /*
        show terminal and hide the show terminal button
        */
        let contHeight = window.getComputedStyle(this.$terminalContainer).height;
        if (contHeight === '0px') {
            this.$terminalContainer.style.height = '270px';
            this.$terminalContent.style.height = '230px';
            this.$fitAddon.fit();
            this.$showTermBtn.classList.add('hide')
        }
    }
    
    async destroy() {
        editorManager.editor.commands.removeCommand("terminal:open_terminal");
        editorManager.editor.commands.removeCommand("terminal:close_terminal");
        this.$terminalContainer.remove();
        this.$showTermBtn.remove();
        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('touchmove', this.drag);
        window.removeEventListener('mouseup', this.stopDragging);
        window.removeEventListener('touchend', this.stopDragging);
    }
    
    get settingsObj() {
        return {
            list: [
                {
                    key: 'cursorBlink',
                    text: 'Cursor Blink',
                    value: this.settings.cursorBlink,
                    info: 'Whether the cursor blinks.',
                    checkbox: true
                },
                {
                    key: 'cursorStyle',
                    text: 'Cursor Style',
                    value: this.settings.cursorStyle,
                    info: 'The style of the cursor.',
                    select: [this.CURSOR_STYLE1,this.CURSOR_STYLE2,this.CURSOR_STYLE3]
                },
                {
                    key: 'fontSize',
                    text: 'Font Size',
                    value: this.settings.fontSize,
                    info: "The font size used to render text.",
                    prompt: "Font Size",
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^[0-9]+$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'scrollBack',
                    text: 'Scroll Back',
                    value: this.settings.scrollBack,
                    info: "The amount of scrollback in the terminal. Scrollback is the amount of rows that are retained when lines are scrolled beyond the initial viewport.",
                    prompt: 'Scroll Back',
                    promptType: "number",
                    promptOption: [
                        {
                            match: /^[0-9]+$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'scrollSensitivity',
                    text: 'Scroll Sensitivity',
                    value: this.settings.scrollSensitivity,
                    info: "The scrolling speed multiplier used for adjusting normal scrolling speed.",
                    prompt: 'Scroll Sensitivity',
                    promptType: "number",
                    promptOption: [
                        {
                            match: /^[0-9]+$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'fontFamily',
                    text: 'Font Family',
                    value: this.settings.fontFamily,
                    info: "The font family used to render text.",
                    prompt: "Font Family",
                    promptType: "text",
                    promptOption: [
                        {
                            required: true
                        }
                    ]
                },
                {
                    key: 'backgroundColor',
                    text: 'Background Color',
                    value: this.settings.backgroundColor,
                    prompt: 'Background Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'foregroundColor',
                    text: 'Foreground Color',
                    value: this.settings.foregroundColor,
                    prompt: 'Foreground Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'selectionBackground',
                    text: 'Selection Background Color',
                    value: this.settings.selectionBackground,
                    prompt: 'Selection Background Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'black',
                    text: 'Black Color',
                    value: this.settings.black,
                    prompt: 'Black Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'blue',
                    text: 'Blue Color',
                    value: this.settings.blue,
                    prompt: 'Blue Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightBlack',
                    text: 'Bright Black Color',
                    value: this.settings.brightBlack,
                    prompt: 'Bright Black Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightBlue',
                    text: 'Bright Blue Color',
                    value: this.settings.brightBlue,
                    prompt: 'Bright Blue Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightCyan',
                    text: 'Bright Cyan Color',
                    value: this.settings.brightCyan,
                    prompt: 'Bright Cyan Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightGreen',
                    text: 'Bright Green Color',
                    value: this.settings.brightGreen,
                    prompt: 'Bright Green Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightMagenta',
                    text: 'Bright Magenta Color',
                    value: this.settings.brightMagenta,
                    prompt: 'Bright Magenta Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightRed',
                    text: 'Bright Red Color',
                    value: this.settings.brightRed,
                    prompt: 'Bright Red Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightWhite',
                    text: 'Bright White Color',
                    value: this.settings.brightWhite,
                    prompt: 'Bright White Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'brightYellow',
                    text: 'Bright Yellow Color',
                    value: this.settings.brightYellow,
                    prompt: 'Bright Yellow Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'cyan',
                    text: 'Cyan Color',
                    value: this.settings.cyan,
                    prompt: 'Cyan Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'green',
                    text: 'Green Color',
                    value: this.settings.green,
                    prompt: 'Green Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'magenta',
                    text: 'Magenta Color',
                    value: this.settings.magenta,
                    prompt: 'Magenta Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'red',
                    text: 'Red Color',
                    value: this.settings.red,
                    prompt: 'Red Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'white',
                    text: 'White Color',
                    value: this.settings.white,
                    prompt: 'White Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
                {
                    key: 'yellow',
                    text: 'Yellow Color',
                    value: this.settings.yellow,
                    prompt: 'Yellow Color',
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^#([0-9A-Fa-f]{3}){1,2}$/,
                            required: true
                        }
                    ]
                },
            ],
            cb: (key, value) => {
                this.settings[key] = value;
                appSettings.update();
            },
        }
    }
    
    get settings() {
        return appSettings.value[plugin.id];
    }
    
}

if (window.acode) {
    const acodePlugin = new AcodeX();
    acode.setPluginInit(
        plugin.id,
        (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
            if (!baseUrl.endsWith("/")) {
                baseUrl += "/";
            }
            acodePlugin.baseUrl = baseUrl;
            acodePlugin.init($page, cacheFile, cacheFileUrl);
        },acodePlugin.settingsObj
    );
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
