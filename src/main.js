import plugin from "../plugin.json";
import style from "./style.scss";

// xtermjs 
import { Terminal } from 'xterm';
// xtermjs addons
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { SerializeAddon } from "xterm-addon-serialize";

// acode commopents & api
const alert = acode.require('alert');
const confirm = acode.require('confirm');
const prompt = acode.require('prompt');
const appSettings = acode.require('settings');
const helpers = acode.require('helpers');
const fsOperation = acode.require('fsOperation');

// constants
const TERMINAL_STORE_PATH = window.DATA_STORAGE+"terminals";

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
            this.xtermCss = tag("link",{
                rel: "stylesheet",
                href: this.baseUrl+"xterm.css"
            });
            this.$style = tag("style",{
                textContent: style
            });
            document.head.append(this.xtermCss,this.$style);
            // add command in command Pallete for opening and closing terminal
            editorManager.editor.commands.addCommand({
                name: "acodex:open_terminal",
                description: "Open Terminal",
                bindKey: {win: 'Ctrl-K'},
                exec: this.openNewTerminal.bind(this)
            });
            editorManager.editor.commands.addCommand({
                name: "acodex:close_terminal",
                description: "Close Terminal",
                bindKey: {win: 'Ctrl-J'},
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
            const $arrowBtns = tag("div",{
                className: "arrowBtns"
            });
            this.$upArrowBtn = tag("button",{
                className: "upArrowBtn",
                textContent: "↑"
            });
            this.$downArrowBtn = tag("button",{
                className: "downArrowBtn",
                textContent: "↓"
            });
            const $controlBtn = tag("div",{
                className: "control-btn"
            });
            this.$cdBtn = tag("button",{
              className: "cd-btn",
              textContent: "cd"
            });
            this.$hideTermBtn = tag("button",{
                className: "hide-terminal-btn",
                textContent: "⇓"
            });
            this.$closeTermBtn = tag("button",{
                className: "close-terminal-btn",
                textContent: "✗"
            });
            $arrowBtns.append(...[this.$upArrowBtn,this.$downArrowBtn]);
            $controlBtn.append(...[this.$cdBtn,this.$hideTermBtn,this.$closeTermBtn]);
            this.$terminalHeader.append(...[this.$terminalTitle,$arrowBtns,$controlBtn]);
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
            
            this.$showTermBtn.classList.add("hide");
            this.$terminalContainer.classList.add("hide");
            // add event listnner to all buttons and terminal panel header
            this.$terminalHeader.addEventListener('mousedown', this.startDragging.bind(this));
            this.$terminalHeader.addEventListener('touchstart', this.startDragging.bind(this));
            
            this.$closeTermBtn.addEventListener('click',this.closeTerminal.bind(this));
            this.$hideTermBtn.addEventListener('click',this.minimise.bind(this));
            this.$showTermBtn.addEventListener('click',this.maxmise.bind(this));
            this.$cdBtn.addEventListener('click',this._cdToActiveDir.bind(this));
            this.$upArrowBtn.addEventListener('click',this.upArrowKeyWorker.bind(this));
            this.$downArrowBtn.addEventListener('click',this.downArrowKeyWorker.bind(this));
            
            window.addEventListener('mousemove', this.drag.bind(this));
            window.addEventListener('touchmove', this.drag.bind(this));
            window.addEventListener('mouseup', this.stopDragging.bind(this));
            window.addEventListener('touchend', this.stopDragging.bind(this));

            const fs = fsOperation(TERMINAL_STORE_PATH);
            if(await fs.exists()){
                const sessionFile = await fs.lsDir();
                if(sessionFile != []){
                    let terminalFileData = await fsOperation(TERMINAL_STORE_PATH+"/session1.json").readFile('utf8');
                    let terminalState = JSON.parse(terminalFileData);
                    this.openPreviousTerminal(terminalState.wsPort,terminalState.terminalContainerHeight,terminalState.terminalContentHeight,terminalState.terminalData);
                } else {
                    await fsOperation(TERMINAL_STORE_PATH).delete();
                }
            }
        }catch(err){
            alert("Warning","Please Restart the app to use AcodeX")
        }
    }
    
    async openNewTerminal(termContainerHeight="270px",termContentHeight="230px"){
        /*
        open a new terminal in app
        */
        try{
            const port = await prompt("Port","8767","number",{required: true,});
            if (port) {
                this.$terminalContainer.classList.remove('hide');
                this.$terminalContainer.style.height = termContainerHeight;
                this.$terminalContent.style.height = termContentHeight;
                // initialise xtermjs Terminal class
                this.$terminal = this.terminalObj;
                this.$fitAddon = new FitAddon();
                this.$serializeAddon = new SerializeAddon();
                this.$terminal.loadAddon(this.$fitAddon);
                this.$terminal.loadAddon(this.$serializeAddon);
                this.$terminal.loadAddon(new WebglAddon());
                this.$terminal.open(this.$terminalContent);
                this.ws = new WebSocket(`ws://localhost:${port}/`);
                this.ws.binaryType = 'arraybuffer';
                this.checkTerminalFolder();
                this._checkForWSMessage(this.ws,this.$terminal,this.$serializeAddon,port)
                this._actionForOnTerminalData(this.$terminal);
                this.$fitAddon.fit();
            }
        } catch(err){
            window.alert(err);
        }
    }
    
    async openPreviousTerminal(port,terminalContainerHeight,terminalContentHeight,previousTermState){
        try{
            if (port) {
                this.$terminalContainer.classList.remove('hide');
                this.$terminalContainer.style.height = terminalContainerHeight;
                this.$terminalContent.style.height = terminalContentHeight;
                // initialise xtermjs Terminal class
                this.$terminal = this.terminalObj;
                this.$fitAddon = new FitAddon();
                this.$serializeAddon = new SerializeAddon();
                this.$terminal.loadAddon(this.$fitAddon);
                this.$terminal.loadAddon(this.$serializeAddon);
                this.$terminal.loadAddon(new WebglAddon());
                this.$terminal.open(this.$terminalContent);
                this.$terminal.write(previousTermState);
                this.ws = new WebSocket(`ws://localhost:${port}/`);
                this.ws.binaryType = 'arraybuffer';
                this.checkTerminalFolder();
                this._checkForWSMessage(this.ws,this.$terminal,this.$serializeAddon,port)
                this._actionForOnTerminalData(this.$terminal);
                this.$fitAddon.fit();
            }
        } catch(err){
            window.alert(err);
        }
    }
    
    async _checkForWSMessage($ws,$terminal,$serializeAddon,port){
        $ws.onmessage = async (ev) => {
            let data = ev.data;
            $terminal.write(typeof data === 'string' ? data : new Uint8Array(data));
            let terminalState = $serializeAddon.serialize();
            let terminalCont = {
                "wsPort": port,
                "terminalContainerHeight": this.$terminalContainer.offsetHeight+"px",
                "terminalContentHeight": this.$terminalContent.offsetHeight+"px",
                "terminalData": terminalState
            }
            //this.checkTerminalFolder();
            const fs = fsOperation(TERMINAL_STORE_PATH+"/session1.json");
            if(!await fs.exists()){
                await fsOperation(TERMINAL_STORE_PATH).createFile('session1.json', terminalCont);
            }else{
                await fs.writeFile(terminalCont);
            }
            //window.alert(terminalState)
        }
    }

    async checkTerminalFolder(){
        if (!await fsOperation(TERMINAL_STORE_PATH).exists()) {
            await fsOperation(window.DATA_STORAGE).createDirectory('terminals');
        }
    }
    
    async _actionForOnTerminalData($terminal){
        let cmdHistory = JSON.parse(localStorage.getItem("cmdHistory")) || [];
        let currentInputIndex = cmdHistory.length;
        
        let command = '';
        $terminal.onData((data) => {
            switch (data) {
                case '\u0003': // Ctrl+C
                    $terminal.write('^C');
                    this._sendData(data);
                    break;
                case '\r': // Enter
                    this._runCommand(this.$terminal, command);
                    cmdHistory.push(command);
                    if (cmdHistory.length > 50) {
                        cmdHistory.shift();
                    }
                    currentInputIndex = cmdHistory.length;
                    localStorage.setItem("cmdHistory", JSON.stringify(cmdHistory));
                    command = '';
                    break;
                case '\u007F': // Backspace (DEL)
                    // Do not delete the prompt
                    if ($terminal._core.buffer.x > 4) {
                        $terminal.write('\b \b');
                        if (command.length > 0) {
                            command = command.substr(0, command.length - 1);
                        }
                    }
                    break;
                case '\u001B[A':
                    if (currentInputIndex > 0) { // Only go back in history if we're not at the beginning
                        currentInputIndex--;
                        this._clearInput($terminal,command);
                        $terminal.write(cmdHistory[currentInputIndex]); // Clear the current input and print the previous one
                        command = cmdHistory[currentInputIndex];
                    }
                    break;
                case "\u001b[B": // If user pressed the down arrow key
                    if (currentInputIndex < cmdHistory.length) { // Only go forward in history if we're not at the end
                        currentInputIndex++;
                        if (currentInputIndex === cmdHistory.length) { // If we're at the end, clear the input
                            this._clearInput($terminal,command);
                            command = '';
                        } else {
                            this._clearInput($terminal,command);
                            command = cmdHistory[currentInputIndex];
                            $terminal.write(cmdHistory[currentInputIndex]); // Clear the current input and print the next one
                        }
                    }
                    break;
                default:
                    if (data >= String.fromCharCode(0x20) && data <= String.fromCharCode(0x7E) || data >= '\u00a0') {
                        command += data;
                        $terminal.write(data);
                    }
            }
        })
        $terminal.onBinary((data) => { return this._sendBinary(data); });
    }
    
    _clearInput(term, cmd) {
        /*
        clear the input area of terminal
        */
        let inputLengh = cmd.length;
        for (let i = 0; i < inputLengh; i++) {
            term.write('\b \b');
        }
    }
    
    _runCommand(term, cmd) {
        /*
        run guven `cmd` in terminal
        */
        if (cmd.length > 0) {
            this._clearInput(term, cmd);
            this._sendData(cmd);
            return;
        }
    }
    
    _sendData(data) {
        /*
        send command to backend via websocket
        */
        if (!this._checkOpenSocket()) {
            return;
        }
        this.ws.send(data);
    }
    
    _sendBinary(data) {
        /*
        send binary data to backend via websocket
        */
        if (!this._checkOpenSocket()) {
            return;
        }
        let buffer = new Uint8Array(data.length);
        for (var i = 0; i < data.length; ++i) {
            buffer[i] = data.charCodeAt(i) & 255;
        }
        this.ws.send(buffer);
    }
    
    _checkOpenSocket() {
        switch (this.ws.readyState) {
            case WebSocket.OPEN:
                return true;
            case WebSocket.CONNECTING:
                throw new Error('script was loaded before socket was open');
            case WebSocket.CLOSING:
                console.warn('socket is closing');
                return false;
            case WebSocket.CLOSED:
                throw new Error('socket is closed');
            default:
                throw new Error('Unexpected socket state');
        }
    };
    
    async closeTerminal(){
        /*
        remove terminal from  app
        */
        let confirmation = await confirm("Warning","Are you sure ?");
        if(!confirmation) return;
        this.$terminalContent.innerHTML = '';
        this.$terminalContainer.classList.add('hide');
        this.$showTermBtn.classList.add('hide');
        await fsOperation(TERMINAL_STORE_PATH).delete();
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
    
    _convertPath(path){
        if (path.startsWith("content://com.termux.documents/tree/%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome::/data/data/com.termux/files/home/")) {
            return "$HOME/" + path.substr("content://com.termux.documents/tree/%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome::/data/data/com.termux/files/home/".length).split('/').slice(0, -1).join('/') + '/';
        } else if (path.startsWith("file:///storage/emulated/0/")) {
            return "/sdcard" + path.substr("file:///storage/emulated/0".length).replace(/\.[^/.]+$/, "").split('/').slice(0, -1).join('/') + '/';
        } else {
            return false;
        }
    }
    
    async _cdToActiveDir(){
        const { activeFile } = editorManager;
        const realPath = this._convertPath(activeFile.location);
        if(!realPath){
            window.toast("unsupported path type.",3000);
            return;
        }
        this._sendData(`cd "${realPath}"`);
        //this._sendData(`clear`);
    }
    
    async upArrowKeyWorker(){
        /*
        up arrow key worker function
        */
        if(!this.$terminal) return;
        const event = new KeyboardEvent('keydown', { keyCode: 38 });
        this.$terminal.textarea.dispatchEvent(event);
        this.$terminal.focus();
    }
    
    async downArrowKeyWorker(){
        /*
        down arrow key worker function
        */
        if(!this.$terminal) return;
        const event = new KeyboardEvent('keydown', { keyCode: 40 });
        this.$terminal.textarea.dispatchEvent(event);
        this.$terminal.focus();
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
        if(await fsOperation(TERMINAL_STORE_PATH).exists()){
            await fsOperation(TERMINAL_STORE_PATH).delete();
        }
    }
    
    get terminalObj(){
        return new Terminal({
            allowProposedApi: true,
            scrollOnUserInput: true,
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
    }
    
    get settingsObj() {
        return {
            list: [
                {
                    index: 0,
                    key: 'cursorBlink',
                    text: 'Cursor Blink',
                    info: 'Whether the cursor blinks.',
                    checkbox: !!this.settings.cursorBlink
                },
                {
                    index: 1,
                    key: 'cursorStyle',
                    text: 'Cursor Style',
                    value: this.settings.cursorStyle,
                    info: 'The style of the cursor.',
                    select: [this.CURSOR_STYLE1,this.CURSOR_STYLE2,this.CURSOR_STYLE3]
                },
                {
                    index: 2,
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
                    index: 3,
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
                    index: 4,
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
                    index: 5,
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
                    index: 6,
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
                    index: 7,
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
                    index: 8,
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
                    index: 9,
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
                    index: 10,
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
                    index: 11,
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
                    index: 12,
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
                    index: 13,
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
                    index: 14,
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
                    index: 15,
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
                    index: 16,
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
                    index: 17,
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
                    index: 18,
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
                    index: 19,
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
                    index: 20,
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
                    index: 21,
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
                    index: 22,
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
                    index: 23,
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
                    index: 24,
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
