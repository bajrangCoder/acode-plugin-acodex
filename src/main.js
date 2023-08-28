import plugin from "../plugin.json";
import style from "./style.scss";
import { themes } from "./themes.js";

//import { AceLanguageClient } from "ace-linters/build/ace-language-client";

// xtermjs
import { Terminal } from "xterm";
// xtermjs addons
import { FitAddon } from "xterm-addon-fit";
import { WebglAddon } from "xterm-addon-webgl";
//import { SerializeAddon } from "xterm-addon-serialize";
import { WebLinksAddon } from "xterm-addon-web-links";
import { Unicode11Addon } from "xterm-addon-unicode11";
import { AttachAddon } from "xterm-addon-attach";

// acode commopents & api
const alert = acode.require("alert");
const confirm = acode.require("confirm");
const prompt = acode.require("prompt");
const appSettings = acode.require("settings");
const helpers = acode.require("helpers");
const fsOperation = acode.require("fsOperation");
const toInternalUrl = acode.require("toInternalUrl");

const { editor } = editorManager;

class AcodeX {
    // constants for dragable Terminal panel
    isDragging = false;
    startY;
    startHeight;
    // constants for dragable show terminal button
    isFlotBtnDragging = false;
    btnStartPosX;
    btnStartPosY;
    // terminal constant
    isTerminalMinimized = false;
    isTerminalOpened = false;
    previousTerminalHeight;
    pid;
    terminal = null;
    socket = null;
    //activeLSPConnections = {};
    // default settings for terminal
    //LSP = false;
    CURSOR_BLINK = true;
    SHOW_ARROW_BTN = false;
    CURSOR_STYLE = ["block","underline","bar"];
    FONT_SIZE = 10;
    FONT_FAMILY = "'Cascadia Code', Menlo, monospace";
    SCROLLBACK = 1000;
    SCROLL_SENSITIVITY = 1000;

    constructor() {
        if (!appSettings.value[plugin.id]) {
            this._saveSetting()
        } else {
            delete appSettings.value[plugin.id];
            appSettings.update(false);
            this._saveSetting()
        }
    }

    async init() {
        try {
            this.xtermCss = tag("link", {
                rel: "stylesheet",
                href: this.baseUrl + "xterm.css",
            });
            this.$style = tag("style", {
                textContent: style,
            });
            this._loadCustomFontStyleSheet();
            document.head.append(this.xtermCss, this.$style);
            // add command in command Pallete for opening and closing terminal
            editorManager.editor.commands.addCommand({
                name: "acodex:open_terminal",
                description: "Open Terminal",
                bindKey: { win: "Ctrl-K" },
                exec: () => {
                    this.createTerminal(270, null);
                },
            });
            editorManager.editor.commands.addCommand({
                name: "acodex:close_terminal",
                description: "Close Terminal",
                bindKey: { win: "Ctrl-J" },
                exec: this.closeTerminal.bind(this),
            });
            /*if (this.settings.lsp) {
                editorManager.editor.commands.addCommand({
                    name: "acodex:start_lsp",
                    description: "Start Lsp",
                    exec: this.startLSPServer(editorManager.editor),
                });
            }*/
            // main terminal container
            this.$terminalContainer = tag("div", {
                className: "terminal-container",
            });
            this.$terminalHeader = tag("div", {
                className: "terminal-header",
            });
            this.$terminalTitle = tag("h3", {
                textContent: "AcodeX",
            });
            const $controlBtn = tag("div", {
                className: "control-btn",
            });
            this.$cdBtn = tag("button", {
                className: "cd-btn",
            });
            this.$cdBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/></svg>`;
            this.$hideTermBtn = tag("button", {
                className: "hide-terminal-btn",
            });
            this.$hideTermBtn.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M15.5 25.5q-.65 0-1.075-.425Q14 24.65 14 24q0-.65.425-1.075.425-.425 1.075-.425h17q.65 0 1.075.425Q34 23.35 34 24q0 .65-.425 1.075-.425.425-1.075.425Z"/></svg>`;
            this.$closeTermBtn = tag("button", {
                className: "close-terminal-btn",
            });
            this.$closeTermBtn.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M24 26.1 13.5 36.6q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05L21.9 24 11.4 13.5q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45L24 21.9l10.5-10.5q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05L26.1 24l10.5 10.5q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45Z"/></svg>`;
            $controlBtn.append(
                ...[this.$cdBtn, this.$hideTermBtn, this.$closeTermBtn]
            );
            this.$terminalHeader.append(...[this.$terminalTitle, $controlBtn]);
            this.$terminalContent = tag("div", {
                className: "terminal-content",
            });
            this.$terminalContainer.append(
                this.$terminalHeader,
                this.$terminalContent
            );
            // show terminal button
            this.$showTermBtn = tag("button", {
                className: "show-terminal-btn",
            });
            this.$showTermBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16"><path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/><path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/></svg>`;
            // append Terminal panel to app main
            app.get("main").append(this.$terminalContainer, this.$showTermBtn);

            this.$showTermBtn.classList.add("hide");
            this.$terminalContainer.classList.add("hide");

            // add event listnner to all buttons and terminal panel header
            this.$terminalHeader.addEventListener(
                "mousedown",
                this.startDragging.bind(this)
            );
            this.$terminalHeader.addEventListener(
                "touchstart",
                this.startDragging.bind(this)
            );

            this.$closeTermBtn.addEventListener(
                "click",
                this.closeTerminal.bind(this)
            );
            this.$hideTermBtn.addEventListener(
                "click",
                this.minimise.bind(this)
            );
            this.$cdBtn.addEventListener(
                "click",
                this._cdToActiveDir.bind(this)
            );

            // add event listener for show terminal button
            this.$showTermBtn.addEventListener(
                "mousedown",
                this.startDraggingFlotingBtn.bind(this)
            );
            document.addEventListener(
                "mousemove",
                this.dragFlotButton.bind(this)
            );
            document.addEventListener(
                "mouseup",
                this.stopDraggingFlotBtn.bind(this)
            );
            this.$showTermBtn.addEventListener(
                "touchstart",
                this.startDraggingFlotingBtn.bind(this)
            );
            document.addEventListener(
                "touchmove",
                this.dragFlotButton.bind(this)
            );
            document.addEventListener(
                "touchend",
                this.stopDraggingFlotBtn.bind(this)
            );
            this.$showTermBtn.addEventListener(
                "click",
                this.maxmise.bind(this)
            );

            window.addEventListener("mousemove", this.drag.bind(this));
            window.addEventListener("touchmove", this.drag.bind(this));
            window.addEventListener("mouseup", this.stopDragging.bind(this));
            window.addEventListener("touchend", this.stopDragging.bind(this));
            // to adjust size of terminal or floating button when Keyboard is opened
            window.addEventListener("resize", () => {
                if (
                    !this.$terminalContainer.classList.contains("hide") ||
                    this.$terminalContainer.style.height != "0px"
                ) {
                    const totalHeaderHeight =
                        document.querySelector("#root header").offsetHeight +
                        document.querySelector("#root ul").offsetHeight;
                    const totalFooterHeight =
                        document.querySelector("#quick-tools").offsetHeight;
                    const screenHeight =
                        window.innerHeight -
                        (totalHeaderHeight + totalFooterHeight);

                    const currentHeight = parseInt(
                        this.$terminalContainer.style.height
                    );
                    const adjustedHeight = Math.min(
                        currentHeight,
                        screenHeight
                    );
                    this.$terminalContainer.style.height =
                        adjustedHeight + "px";
                }
                if (!this.$showTermBtn.classList.contains("hide")) {
                    let totalHeaderHeight =
                        document.querySelector("#root header").offsetHeight +
                        document.querySelector("#root ul").offsetHeight;
                    let maxY =
                        window.innerHeight -
                        totalHeaderHeight -
                        this.$showTermBtn.offsetHeight;
                    const currentY = parseInt(this.$showTermBtn.style.bottom);
                    this.$showTermBtn.style.bottom =
                        Math.max(0, Math.min(maxY, currentY)) + "px";
                }
            });

            if (localStorage.getItem("AcodeX_Is_Opened") === "true") {
                this.createTerminal(
                    localStorage.getItem("AcodeX_Terminal_Cont_Height") || 270,
                    localStorage.getItem("AcodeX_Port") || 8767
                );
            }

            // if (this.settings.lsp) {
            //     setInterval(() => {
            //         this.startLSPServer(editorManager.editor);
            //     }, 2000);
            //     editorManager.on("switch-file", () => {
            //         this.startLSPServer(editorManager.editor);
            //     });
            // }

            /*editor.on("changeMode", this.startLSPServer.bind(this));
            this.startLSPServer();*/

            // acodex terminal api
            acode.define("acodex", {
                execute: (cmd) => {
                    /*
                    {cmd}: command to run in terminal
                    */
                    try {
                        if (!this.isTerminalOpened) return;
                        this.socket.send(cmd + "\r");
                    } catch (error) {
                        throw Error(error);
                    }
                },
                isMinimized: () => {
                    return this.isTerminalMinimized;
                },
                isTerminalOpened: () => {
                    return this.isTerminalOpened;
                },
                maximiseTerminal: () => {
                    if (this.isTerminalOpened && this.isTerminalMinimized) {
                        this.maxmise();
                    }
                },
                openTerminal: (termContainerHeight = 270, port = null) => {
                    if (!this.isTerminalOpened) {
                        this.createTerminal(termContainerHeight, port);
                    }
                },
                closeTerminal: () => {
                    if (this.isTerminalOpened) {
                        this.closeTerminal();
                    }
                },
                convertAcodeUriToTermReadable: (path) => {
                    return this._convertPath(path);
                },
            });
        } catch (err) {
            console.log(err);
            alert("Warning", "Please Restart the app to use AcodeX");
        }
    }

    /* LSP Stuffs */
    /*startLSPServer() {
        const fileType = this.getFileType(editor);

        for (const language in this.activeLSPConnections) {
            if (language !== fileType) {
                this.closeLSPConnection(language);
            }
        }

        this.connectToLSP(fileType);
    }

    closeLSPConnection(language) {
        this.languageProvider.closeDocument(editor)
        const socket = this.activeLSPConnections[language];
        if (socket) {
            socket.close();
            delete this.activeLSPConnections[language];
        }
    }

    connectToLSP(language) {
        if (this.activeLSPConnections[language]) {
            return this.activeLSPConnections[language];
        }
        const lspUrl = this.lspServers[language];
        if (!lspUrl) {
            return;
        }
        let socket = new WebSocket(lspUrl);
        this.languageProvider = AceLanguageClient.for(socket);
        this.activeLSPConnections[language] = socket;
        this.languageProvider.setGlobalOptions("python", {
            pylsp: {
                configurationSources: ["pycodestyle"],
                plugins: {
                    pycodestyle: {
                        enabled: true,
                        ignore: ["E501"],
                        maxLineLength: 10,
                    },
                    pyflakes: {
                        enabled: true,
                    },
                },
            },
        });
        this.languageProvider.registerEditor(editor);
        acode.registerFormatter(plugin.id, ["py"], () => {
            this.languageProvider.format();
        });
    }

    getFileType() {
        const mode = editor.getSession().getMode().$id;
        const modeLang = mode.split("/")[2];
        return modeLang;
    }

    get lspServers() {
        return {
            python: "ws://localhost:3000",
        };
    }*/

    async createTerminal(termContainerHeight, portFromParm) {
        const port =
            portFromParm ||
            (await prompt("Port", "8767", "number", {
                required: true,
            }));
        if (port) {
            this.$terminalContainer.classList.remove("hide");
            this.$terminal = this.terminalObj;
            this.$fitAddon = new FitAddon();
            //this.$serializeAddon = new SerializeAddon();
            this.$webglAddon = new WebglAddon();
            this.$unicode11Addon = new Unicode11Addon();
            this.$webLinkAddon = new WebLinksAddon(
                (event, uri) => {
                    system.openInBrowser(uri);
                }
            );
            this.$terminal.loadAddon(this.$fitAddon);
            //this.$terminal.loadAddon(this.$serializeAddon);
            this.$terminal.loadAddon(this.$unicode11Addon);
            this.$terminal.loadAddon(this.$webLinkAddon);

            this.$terminal.onResize((size) => {
                if (!this.pid) return;
                const cols = size.cols;
                const rows = size.rows;
                const url =
                    "http://localhost:" +
                    port +
                    "/terminals/" +
                    this.pid +
                    "/size?cols=" +
                    cols +
                    "&rows=" +
                    rows;

                fetch(url, { method: "POST" });
            });

            this.$fitAddon.fit();
            if (this.$webglAddon) {
                try {
                    this.$terminal.loadAddon(this.$webglAddon);
                    this.$terminal.open(this.$terminalContent);
                } catch (e) {
                    window.toast(
                        "error during loading webgl addon: " + e,
                        4000
                    );
                    this.$webglAddon.dispose();
                    this.$webglAddon = undefined;
                }
            }
            if (!this.$terminal.element) {
                // webgl loading failed for some reason, attach with DOM renderer
                this.$terminal.open(this.$terminalContent);
            }
            this.$terminal.focus();
            // fit is called within a setTimeout, cols and rows need this.
            setTimeout(async () => {
                // Set terminal size again to set the specific dimensions on the demo

                this.isTerminalOpened = true;
                this.$terminalContainer.style.height =
                    termContainerHeight + "px";
                localStorage.setItem("AcodeX_Terminal_Cont_Height", 270);
                if (
                    localStorage.getItem("AcodeX_Terminal_Is_Minimised") ===
                    "true"
                ) {
                    this.minimise();
                }
                localStorage.setItem(
                    "AcodeX_Terminal_Is_Minimised",
                    this.isTerminalMinimized
                );
                localStorage.setItem("AcodeX_Is_Opened", this.isTerminalOpened);
                this._updateTerminalHeight.bind(this);
                try{
                    const res = await fetch(
                        "http://localhost:" +
                            port +
                            "/terminals?cols=" +
                            this.$terminal.cols +
                            "&rows=" +
                            this.$terminal.rows,
                        { method: "POST" }
                    );
                    const processId = await res.text();
                    this.pid = processId;
                } catch (err){
                    if (!this.$terminalContainer.classList.contains("hide"))
                        this.$terminalContainer.classList.add("hide");
                    if (!this.$showTermBtn.classList.contains("hide"))
                        this.$showTermBtn.classList.add("hide");
                    this.isTerminalMinimized = false;
                    this.isTerminalOpened = false;
                    localStorage.setItem(
                        "AcodeX_Terminal_Is_Minimised",
                        this.isTerminalMinimized
                    );
                    localStorage.setItem("AcodeX_Is_Opened", this.isTerminalOpened);
                    this.$terminalContainer.style.height = this.previousTerminalHeight;
                    localStorage.setItem(
                        "AcodeX_Terminal_Cont_Height",
                        this.$terminalContainer.offsetHeight
                    );
                    window.toast("Start the acodex server in termux first!", 4000);
                }
                this.socket = new WebSocket(
                    `ws://localhost:${port}/terminals/${this.pid}`
                );
                this.socket.onopen = this.openNewTerminal();
                /*this.socket.onmessage = () => {
                    console.log(this.$serializeAddon.serialize())
                }*/
                this.socket.onerror = (error) => {
                    acode.alert("AcodeX Error", error);
                };
            }, 0);
        }
    }

    async openNewTerminal() {
        /*
        open a new terminal in app
        */
        try {
            this.$fitAddon.fit();
            this.$attachAddon = new AttachAddon(this.socket);
            this.$terminal.loadAddon(this.$attachAddon);
            this.$terminal.unicode.activeVersion = "11";
        } catch (err) {
            window.alert(err);
        }
    }

    _saveSetting(){
        appSettings.value[plugin.id] = {
            //lsp: this.LSP,
            cursorBlink: this.CURSOR_BLINK,
            cursorStyle: this.CURSOR_STYLE[0],
            fontSize: this.FONT_SIZE,
            fontFamily: this.FONT_FAMILY,
            customFontStyleSheet: "",
            scrollBack: this.SCROLLBACK,
            scrollSensitivity: this.SCROLL_SENSITIVITY,
            theme: "sapphire",
            background: themes["sapphire"].background,
            foreground: themes["sapphire"].foreground,
            cursor: themes["sapphire"].cursor || "",
            cursorAccent: themes["sapphire"].cursorAccent || "",
            selectionBackground: themes["sapphire"].selectionBackground,
            black: themes["sapphire"].black,
            blue: themes["sapphire"].blue,
            brightBlack: themes["sapphire"].brightBlack,
            brightBlue: themes["sapphire"].brightBlue,
            brightCyan: themes["sapphire"].brightCyan,
            brightGreen: themes["sapphire"].brightGreen,
            brightMagenta: themes["sapphire"].brightMagenta,
            brightRed: themes["sapphire"].brightWhite,
            brightWhite: themes["sapphire"].brightWhite,
            brightYellow: themes["sapphire"].brightYellow,
            cyan: themes["sapphire"].cyan,
            green: themes["sapphire"].green,
            magenta: themes["sapphire"].magenta,
            red: themes["sapphire"].red,
            white: themes["sapphire"].white,
            yellow: themes["sapphire"].yellow,
        };
        appSettings.update(false);
    }

    _loadCustomFontStyleSheet() {
        if (this.settings.customFontStyleSheet != "") {
            if (!document.querySelector("#customFontAcodeXStyleSheet")) {
                const fontStyleSheet = tag("link", {
                    href: this.settings.customFontStyleSheet,
                    rel: "stylesheet",
                    id: "customFontAcodeXStyleSheet",
                });
                document.head.append(fontStyleSheet);
            } else {
                document.querySelector("#customFontAcodeXStyleSheet").href =
                    this.settings.customFontStyleSheet;
            }
        }
    }

    _updateTerminalHeight() {
        const terminalHeaderHeight = this.$terminalHeader.offsetHeight;
        this.$terminalContent.style.height = `calc(100% - ${terminalHeaderHeight}px)`;
        localStorage.setItem(
            "AcodeX_Terminal_Cont_Height",
            this.$terminalContainer.offsetHeight
        );
        this.$fitAddon.fit();
    }

    async closeTerminal() {
        /*
        remove terminal from  app
        */
        let confirmation = await confirm("Warning", "Are you sure ?");
        if (!confirmation) return;
        if (this.$terminal != null) {
            if(this.socket){
                this.socket.close();
            }
            this.$terminal.dispose();
            this.$terminal = null;
            this.socket = null;
            this.pid = "";
            this.$attachAddon = undefined;
            this.$fitAddon = undefined;
            this.$serializeAddon = undefined;
            this.$unicode11Addon = undefined;
            this.$webLinkAddon = undefined;
            this.$webglAddon = undefined;
        }
        this.$terminalContent.innerHTML = "";
        if (!this.$terminalContainer.classList.contains("hide"))
            this.$terminalContainer.classList.add("hide");
        if (!this.$showTermBtn.classList.contains("hide"))
            this.$showTermBtn.classList.add("hide");
        this.isTerminalMinimized = false;
        this.isTerminalOpened = false;
        localStorage.setItem(
            "AcodeX_Terminal_Is_Minimised",
            this.isTerminalMinimized
        );
        localStorage.setItem("AcodeX_Is_Opened", this.isTerminalOpened);
        this.$terminalContainer.style.height = this.previousTerminalHeight;
        localStorage.setItem(
            "AcodeX_Terminal_Cont_Height",
            this.$terminalContainer.offsetHeight
        );
    }

    startDraggingFlotingBtn(e) {
        try {
            this.isFlotBtnDragging = true;
            this.$showTermBtn.style.border = "2px solid #fff";
            if (e.type === "touchstart") {
                this.btnStartPosX = e.touches[0].clientX;
                this.btnStartPosY = e.touches[0].clientY;
            } else {
                this.btnStartPosX = e.clientX;
                this.btnStartPosY = e.clientY;
            }
        } catch (err) {
            window.alert(err);
        }
    }

    dragFlotButton(e) {
        try {
            if (!this.isFlotBtnDragging) return;
            e.preventDefault();
            let currentX, currentY;
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }
            let newX = this.btnStartPosX - currentX;
            let newY = this.btnStartPosY - currentY;

            this.btnStartPosX = currentX;
            this.btnStartPosY = currentY;

            let buttonBottom =
                window.innerHeight -
                (this.$showTermBtn.offsetTop + this.$showTermBtn.offsetHeight) +
                newY;
            let buttonLeft = this.$showTermBtn.offsetLeft - newX;
            let totalHeaderHeight =
                document.querySelector("#root header").offsetHeight +
                document.querySelector("#root ul").offsetHeight;
            let maxX = window.innerWidth - this.$showTermBtn.offsetWidth;
            let maxY =
                window.innerHeight -
                totalHeaderHeight -
                this.$showTermBtn.offsetHeight;

            this.$showTermBtn.style.bottom =
                Math.max(0, Math.min(maxY, buttonBottom)) + "px";
            this.$showTermBtn.style.left =
                Math.max(0, Math.min(maxX, buttonLeft)) + "px";
        } catch (err) {
            window.alert(err);
        }
    }

    stopDraggingFlotBtn() {
        try {
            this.isFlotBtnDragging = false;
            this.$showTermBtn.style.border = "none";
        } catch (err) {
            window.alert(err);
        }
    }

    startDragging(e) {
        if (e.type === "touchstart") {
            this.startY = e.touches[0].clientY;
        } else {
            e.preventDefault();
            this.startY = e.clientY;
        }
        this.startHeight = this.$terminalContainer.clientHeight;
        this.isDragging = true;
        this.$terminalContainer.style.borderTop =
            "2px solid var(--link-text-color)";
    }

    drag(e) {
        if (!this.isDragging) return;

        e.preventDefault();

        let currentY;
        if (e.type === "touchmove") {
            currentY = e.touches[0].clientY;
        } else {
            currentY = e.clientY;
        }
        const diffY = currentY - this.startY;

        let newHeight = this.startHeight - diffY;

        const totalHeaderHeight =
            document.querySelector("#root header").offsetHeight +
            document.querySelector("#root ul").offsetHeight;
        const totalFooterHeight =
            document.querySelector("#quick-tools").offsetHeight;
        const maximumHeight =
            window.innerHeight - (totalHeaderHeight + totalFooterHeight);
        const minimumHeight = 100;
        newHeight = Math.max(minimumHeight, Math.min(newHeight, maximumHeight));

        this.$terminalContainer.style.height = newHeight + "px";
        localStorage.setItem("AcodeX_Terminal_Cont_Height", newHeight);
        this._updateTerminalHeight.bind(this);
        this.$fitAddon.fit();
    }

    stopDragging(e) {
        this.isDragging = false;
        this.$terminalContainer.style.borderTop =
            "1px solid var(--popup-border-color)";
    }

    minimise() {
        /*
        hide terminal and active the show terminal button
        */
        try {
            if (!this.isTerminalMinimized) {
                this.previousTerminalHeight = window.getComputedStyle(
                    this.$terminalContainer
                ).height;
                localStorage.setItem(
                    "AcodeX_Terminal_Cont_Height",
                    this.$terminalContainer.offsetHeight
                );
                this.$terminalContainer.style.height = 0;
                this.isTerminalMinimized = true;
                localStorage.setItem(
                    "AcodeX_Terminal_Is_Minimised",
                    this.isTerminalMinimized
                );
                this.$showTermBtn.classList.remove("hide");
            }
        } catch (err) {
            window.alert(err);
        }
    }

    maxmise() {
        /*
        show terminal and hide the show terminal button
        */
        if (this.isTerminalMinimized) {
            this.$terminalContainer.style.height =
                localStorage.getItem("AcodeX_Terminal_Cont_Height") + "px";
            this.$terminalContent.style.height = `calc(100% - ${this.$terminalContainer.offsetHeight}px)`;
            this.$fitAddon.fit();
            localStorage.setItem(
                "AcodeX_Terminal_Cont_Height",
                this.$terminalContainer.offsetHeight
            );
            this.$showTermBtn.classList.add("hide");
            this.isTerminalMinimized = false;
            localStorage.setItem(
                "AcodeX_Terminal_Is_Minimised",
                this.isTerminalMinimized
            );
            this._updateTerminalHeight();
        }
    }

    _convertPath(path) {
        if (path.startsWith("content://com.termux.documents/tree")) {
            let termuxPath = path
                .split("::")[1]
                .substring(0, path.split("::")[1].lastIndexOf("/"))
                .replace(/^\/data\/data\/com\.termux\/files\/home/, "$HOME");
            return termuxPath;
        } else if (path.startsWith("file:///storage/emulated/0/")) {
            let sdcardPath =
                "/sdcard" +
                path
                    .substr("file:///storage/emulated/0".length)
                    .replace(/\.[^/.]+$/, "")
                    .split("/")
                    .slice(0, -1)
                    .join("/") +
                "/";
            return sdcardPath;
        } else if (
            path.startsWith(
                "content://com.android.externalstorage.documents/tree/primary"
            )
        ) {
            let androidPath =
                "/sdcard/" +
                path
                    .split("::primary:")[1]
                    .substring(0, path.split("::primary:")[1].lastIndexOf("/"));
            return androidPath;
        } else {
            return false;
        }
    }

    async _cdToActiveDir() {
        const { activeFile } = editorManager;
        const realPath = this._convertPath(activeFile.uri);
        if (!realPath) {
            window.toast("unsupported path type.", 3000);
            return;
        }
        this.socket.send(`cd "${realPath}"\r`);
    }

    async destroy() {
        this.$style.remove();
        this.xtermCss.remove();
        editorManager.editor.commands.removeCommand("terminal:open_terminal");
        editorManager.editor.commands.removeCommand("terminal:close_terminal");
        //editorManager.editor.commands.removeCommand("terminal:start_lsp");
        this.$terminalContainer.remove();
        this.$showTermBtn.remove();
        document.removeEventListener(
            "mousemove",
            this.dragFlotButton.bind(this)
        );
        document.removeEventListener(
            "mouseup",
            this.stopDraggingFlotBtn.bind(this)
        );
        document.removeEventListener(
            "touchmove",
            this.dragFlotButton.bind(this)
        );
        document.removeEventListener(
            "touchend",
            this.stopDraggingFlotBtn.bind(this)
        );
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("touchmove", this.drag);
        window.removeEventListener("mouseup", this.stopDragging);
        window.removeEventListener("touchend", this.stopDragging);

        localStorage.removeItem("AcodeX_Terminal_Is_Minimised");
        localStorage.removeItem("AcodeX_Port");
        localStorage.removeItem("AcodeX_Terminal_Cont_Height");
        localStorage.removeItem("AcodeX_Is_Opened");
    }

    async setCustomFontFile() {
        const { url } = await acode.fileBrowser(
            "file",
            "select custom font stylesheet(from internal storage only)"
        );
        const newUrl = await toInternalUrl(url);
        this.settings.customFontStyleSheet = newUrl;
        appSettings.update();
    }
    
    async applyTheme(themeName){
        const theme = themes[themeName];
        this.settings.theme = themeName;
        this.settings.background = theme.background;
        this.settings.foreground = theme.foreground;
        this.settings.cursor = theme.cursor || "";
        this.settings.cursorAccent = theme.cursorAccent || "";
        this.settings.selectionBackground = theme.selectionBackground;
        this.settings.black = theme.black;
        this.settings.blue = theme.blue;
        this.settings.brightBlack = theme.brightBlack;
        this.settings.brightBlue = theme.brightBlue;
        this.settings.brightCyan = theme.brightCyan;
        this.settings.brightGreen = theme.brightGreen;
        this.settings.brightMagenta = theme.brightMagenta;
        this.settings.brightRed = theme.brightRed;
        this.settings.brightWhite = theme.brightWhite;
        this.settings.brightYellow = theme.brightYellow;
        this.settings.cyan = theme.cyan;
        this.settings.green = theme.green;
        this.settings.magenta = theme.magenta;
        this.settings.red = theme.red;
        this.settings.white = theme.white;
        this.settings.yellow = theme.yellow;
        appSettings.update();
    }

    get terminalObj() {
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
                background: this.settings.background,
                foreground: this.settings.foreground,
                selectionBackground: this.settings.selectionBackground,
                cursor: this.settings.cursor,
                cursorAccent: this.settings.cursorAccent,
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
                yellow: this.settings.yellow,
            },
        });
    }

    get settingsObj() {
        return {
            list: [
                /*{
                    key: "lsp",
                    text: "Want LSP",
                    info: "Whether the lsp should work or not.",
                    checkbox: !!this.settings.lsp,
                },*/
                {
                    key: "customFontStyleSheet",
                    text: "Custom Font Stylesheet file",
                    info: "Select css file in which you have to define about your custom font.",
                    value: this.settings.customFontStyleSheet,
                },
                {
                    index: 0,
                    key: "cursorBlink",
                    text: "Cursor Blink",
                    info: "Whether the cursor blinks.",
                    checkbox: !!this.settings.cursorBlink,
                },
                {
                    index: 1,
                    key: "cursorStyle",
                    text: "Cursor Style",
                    value: this.settings.cursorStyle,
                    info: "The style of the cursor.",
                    select: [
                        this.CURSOR_STYLE[0],
                        this.CURSOR_STYLE[1],
                        this.CURSOR_STYLE[2],
                    ],
                },
                {
                    index: 2,
                    key: "fontSize",
                    text: "Font Size",
                    value: this.settings.fontSize,
                    info: "The font size used to render text.",
                    prompt: "Font Size",
                    promptType: "text",
                    promptOption: [
                        {
                            match: /^[0-9]+$/,
                            required: true,
                        },
                    ],
                },
                {
                    key: "fontFamily",
                    text: "Font Family",
                    value: this.settings.fontFamily,
                    info: "The font family used to render text.",
                    prompt: "Font Family",
                    promptType: "text",
                },
                {
                    index: 3,
                    key: "scrollBack",
                    text: "Scroll Back",
                    value: this.settings.scrollBack,
                    info: "The amount of scrollback in the terminal. Scrollback is the amount of rows that are retained when lines are scrolled beyond the initial viewport.",
                    prompt: "Scroll Back",
                    promptType: "number",
                    promptOption: [
                        {
                            match: /^[0-9]+$/,
                            required: true,
                        },
                    ],
                },
                {
                    index: 4,
                    key: "scrollSensitivity",
                    text: "Scroll Sensitivity",
                    value: this.settings.scrollSensitivity,
                    info: "The scrolling speed multiplier used for adjusting normal scrolling speed.",
                    prompt: "Scroll Sensitivity",
                    promptType: "number",
                    promptOption: [
                        {
                            match: /^[0-9]+$/,
                            required: true,
                        },
                    ],
                },
                {
                    index: 5,
                    key: "theme",
                    text: "Theme",
                    value: this.settings.theme,
                    info: "Theme of terminal.",
                    select: [
                        "xterm",
                        "snazzy",
                        "sapphire",
                        "light",
                        "custom"
                    ],
                },
                {
                    index: 6,
                    key: "background",
                    text: "Background Color",
                    value: this.settings.background,
                    color: this.settings.background,
                },
                {
                    index: 7,
                    key: "foreground",
                    text: "Foreground Color",
                    value: this.settings.foreground,
                    color: this.settings.foreground,
                },
                {
                    index: 8,
                    key: "selectionBackground",
                    text: "Selection Background Color",
                    value: this.settings.selectionBackground,
                    color: this.settings.selectionBackground,
                },
                {
                    key: "cursor",
                    text: "Cursor Color",
                    value: this.settings.cursor,
                    color: this.settings.cursor,
                },
                {
                    key: "cursorAccent",
                    text: "Cursor Accent Color",
                    value: this.settings.cursorAccent,
                    color: this.settings.cursorAccent,
                },
                {
                    index: 9,
                    key: "black",
                    text: "Black Color",
                    value: this.settings.black,
                    color: this.settings.black,
                },
                {
                    index: 10,
                    key: "blue",
                    text: "Blue Color",
                    value: this.settings.blue,
                    color: this.settings.blue,
                },
                {
                    index: 11,
                    key: "brightBlack",
                    text: "Bright Black Color",
                    value: this.settings.brightBlack,
                    color: this.settings.brightBlack,
                },
                {
                    index: 12,
                    key: "brightBlue",
                    text: "Bright Blue Color",
                    value: this.settings.brightBlue,
                    color: this.settings.brightBlue,
                },
                {
                    index: 13,
                    key: "brightCyan",
                    text: "Bright Cyan Color",
                    value: this.settings.brightCyan,
                    color: this.settings.brightCyan,
                },
                {
                    index: 14,
                    key: "brightGreen",
                    text: "Bright Green Color",
                    value: this.settings.brightGreen,
                    color: this.settings.brightGreen,
                },
                {
                    index: 15,
                    key: "brightMagenta",
                    text: "Bright Magenta Color",
                    value: this.settings.brightMagenta,
                    color: this.settings.brightMagenta,
                },
                {
                    index: 16,
                    key: "brightRed",
                    text: "Bright Red Color",
                    value: this.settings.brightRed,
                    color: this.settings.brightRed,
                },
                {
                    index: 17,
                    key: "brightWhite",
                    text: "Bright White Color",
                    value: this.settings.brightWhite,
                    color: this.settings.brightWhite,
                },
                {
                    index: 18,
                    key: "brightYellow",
                    text: "Bright Yellow Color",
                    value: this.settings.brightYellow,
                    color: this.settings.brightYellow,
                },
                {
                    index: 19,
                    key: "cyan",
                    text: "Cyan Color",
                    value: this.settings.cyan,
                    color: this.settings.cyan,
                },
                {
                    index: 20,
                    key: "green",
                    text: "Green Color",
                    value: this.settings.green,
                    color: this.settings.green,
                },
                {
                    index: 21,
                    key: "magenta",
                    text: "Magenta Color",
                    value: this.settings.magenta,
                    color: this.settings.magenta,
                },
                {
                    index: 22,
                    key: "red",
                    text: "Red Color",
                    value: this.settings.red,
                    color: this.settings.red,
                },
                {
                    index: 23,
                    key: "white",
                    text: "White Color",
                    value: this.settings.white,
                    color: this.settings.white,
                },
                {
                    index: 24,
                    key: "yellow",
                    text: "Yellow Color",
                    value: this.settings.yellow,
                    color: this.settings.yellow,
                },
            ],
            cb: (key, value) => {
                if (key === "customFontStyleSheet") {
                    this.setCustomFontFile();
                } else if(key === "theme"){
                    this.applyTheme(value);
                }else {
                    this.settings[key] = value;
                    appSettings.update();
                }
            },
        };
    }

    get settings() {
        return appSettings.value[plugin.id];
    }
}

if (window.acode) {
    const acodePlugin = new AcodeX();
    acode.setPluginInit(
        plugin.id,
        async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
            if (!baseUrl.endsWith("/")) {
                baseUrl += "/";
            }
            acodePlugin.baseUrl = baseUrl;
            await acodePlugin.init($page, cacheFile, cacheFileUrl);
        },
        acodePlugin.settingsObj
    );
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
