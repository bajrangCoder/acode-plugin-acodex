import plugin from "../plugin.json";
import style from "./style.scss";
import fontStyles from "./fonts.scss";
import { themes } from "./themes.js";

// xtermjs
import { Terminal } from "xterm";
// xtermjs addons
import { FitAddon } from "xterm-addon-fit";
import { WebglAddon } from "xterm-addon-webgl";
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
const select = acode.require("select");
const loader = acode.require("loader");

const { editor } = editorManager;

const themeList = [
    "ayuDark",
    "ayuLight",
    "ayuMirage",
    "catppuccin",
    "dracula",
    "elementary",
    "everblush",
    "light",
    "material",
    "nekonakoDjancoeg",
    "oneDark",
    "sapphire",
    "siduckOneDark",
    "snazzy",
    "xterm",
    "custom"
];

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
    $fitAddon = undefined;
    // default settings for terminal
    ALLOW_TRANSPRANCY = false;
    CURSOR_BLINK = true;
    SHOW_ARROW_BTN = false;
    CURSOR_STYLE = ["block", "underline", "bar"];
    FONT_SIZE = 11;
    FONT_FAMILY = appSettings.get("editorFont");
    FONT_WEIGHT = [
        "normal",
        "bold",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ];
    SCROLLBACK = 1000;
    SCROLL_SENSITIVITY = 1000;
    showTerminalBtnSize = 35;

    constructor() {
        if (!appSettings.value[plugin.id]) {
            this._saveSetting();
        } else {
            if (!this.settings.showTerminalBtnSize) {
                delete appSettings.value[plugin.id];
                appSettings.update(false);
                this._saveSetting();
            }
        }
    }

    async init($page, cacheFile, cacheFileUrl) {
        try {
            if (
                !(await fsOperation(
                    window.DATA_STORAGE + "acodex_fonts"
                ).exists())
            ) {
                this.downloadFont();
            }
            this.xtermCss = tag("link", {
                rel: "stylesheet",
                href: this.baseUrl + "xterm.css"
            });
            this.$style = tag("link", {
                rel: "stylesheet",
                href: this.baseUrl + "main.css"
            });
            this._loadCustomFontStyleSheet();
            document.head.append(this.xtermCss, this.$style);
            // add command in command Pallete for opening and closing terminal
            editorManager.editor.commands.addCommand({
                name: "acodex:open_terminal",
                description: "Open Terminal",
                bindKey: { win: "Ctrl-K" },
                exec: () => {
                    this.openTerminalPanel(270, this.settings.port);
                }
            });
            editorManager.editor.commands.addCommand({
                name: "acodex:close_terminal",
                description: "Close Terminal",
                bindKey: { win: "Ctrl-J" },
                exec: this.closeTerminal.bind(this)
            });
            // main terminal container
            this.$terminalContainer = tag("div", {
                className: "terminal-container"
            });
            this.$terminalHeader = tag("div", {
                className: "terminal-header"
            });
            this.$terminalTitle = tag("h3", {
                textContent: "AcodeX 1",
                className: "terminal-title"
            });

            const $controlBtn = tag("div", {
                className: "control-btn"
            });
            const addSessionBtn = tag("button", {
                className: "add-session-btn"
            });
            addSessionBtn.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M24 38q-.65 0-1.075-.425-.425-.425-.425-1.075v-11h-11q-.65 0-1.075-.425Q10 24.65 10 24q0-.65.425-1.075.425-.425 1.075-.425h11v-11q0-.65.425-1.075Q23.35 10 24 10q.65 0 1.075.425.425.425.425 1.075v11h11q.65 0 1.075.425Q38 23.35 38 24q0 .65-.425 1.075-.425.425-1.075.425h-11v11q0 .65-.425 1.075Q24.65 38 24 38Z"/></svg>`;
            this.$cdBtn = tag("button", {
                className: "cd-btn"
            });
            this.$cdBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/></svg>`;
            this.$hideTermBtn = tag("button", {
                className: "hide-terminal-btn"
            });
            this.$hideTermBtn.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M15.5 25.5q-.65 0-1.075-.425Q14 24.65 14 24q0-.65.425-1.075.425-.425 1.075-.425h17q.65 0 1.075.425Q34 23.35 34 24q0 .65-.425 1.075-.425.425-1.075.425Z"/></svg>`;
            this.$closeTermBtn = tag("button", {
                className: "close-terminal-btn"
            });
            this.$closeTermBtn.innerHTML = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M24 26.1 13.5 36.6q-.45.45-1.05.45-.6 0-1.05-.45-.45-.45-.45-1.05 0-.6.45-1.05L21.9 24 11.4 13.5q-.45-.45-.45-1.05 0-.6.45-1.05.45-.45 1.05-.45.6 0 1.05.45L24 21.9l10.5-10.5q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05L26.1 24l10.5 10.5q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45Z"/></svg>`;
            $controlBtn.append(
                addSessionBtn,
                this.$cdBtn,
                this.$hideTermBtn,
                this.$closeTermBtn
            );
            this.$terminalHeader.append(this.$terminalTitle, $controlBtn);
            this.$terminalContent = tag("div", {
                className: "terminal-content"
            });
            this.$terminalContainer.append(
                this.$terminalHeader,
                this.$terminalContent
            );
            // show terminal button
            this.$showTermBtn = tag("button", {
                className: "show-terminal-btn"
            });
            this.$showTermBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16"><path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/><path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/></svg>`;
            // append Terminal panel to app main
            if (app.get("main")) {
                app.get("main").append(
                    this.$terminalContainer,
                    this.$showTermBtn
                );
            }

            this.$showTermBtn.classList.add("hide");
            this.$terminalContainer.classList.add("hide");

            if (this.settings.showTerminalBtnSize) {
                this.$showTermBtn.style.height =
                    this.settings.showTerminalBtnSize + "px";
                this.$showTermBtn.style.width =
                    this.settings.showTerminalBtnSize + "px";
            }

            this.$cacheFile = cacheFile;
            // add event listnner to all buttons and terminal panel header
            this.$terminalHeader.addEventListener(
                "mousedown",
                this.startDragging.bind(this)
            );
            this.$terminalHeader.addEventListener(
                "touchstart",
                this.startDragging.bind(this)
            );

            addSessionBtn.addEventListener(
                "click",
                this.createSession.bind(this)
            );
            this.$terminalTitle.addEventListener("click", async e => {
                let sessionNames;
                const jsonData = await this.$cacheFile.readFile("utf8");
                let sessionsData = JSON.parse(jsonData);

                if (Array.isArray(sessionsData)) {
                    // Extract session names and return them in an array
                    sessionNames = sessionsData.map(session => session.name);
                } else {
                    sessionNames = [];
                }

                const opt = {
                    hideOnSelect: true,
                    default: localStorage.getItem("AcodeX_Current_Session")
                };

                const sessionSelectBox = await select(
                    "AcodeX Sessions",
                    sessionNames,
                    opt
                );
                if (sessionSelectBox) {
                    this.changeSession(sessionSelectBox);
                }
            });

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
                if (this.$terminalContainer) {
                    if(!this.$terminalContainer.classList.contains("hide")){
                        const totalHeaderHeight =
                            document.querySelector("#root header")?.offsetHeight ||
                            0;
                        const totalFooterHeight =
                            document.querySelector("#quick-tools")?.offsetHeight ||
                            0;
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
                        localStorage.setItem(
                            "AcodeX_Terminal_Cont_Height",
                            this.$terminalContainer.offsetHeight
                        );
                    }
                }

                if (this.$showTermBtn) {
                    if(!this.$showTermBtn.classList.contains("hide")){
                        let totalHeaderHeight =
                            document.querySelector("#root header")?.offsetHeight ||
                            0;
                        let maxY =
                            window.innerHeight -
                            totalHeaderHeight -
                            this.$showTermBtn.offsetHeight;
                        const currentY = parseInt(this.$showTermBtn.style.bottom);
                        this.$showTermBtn.style.bottom =
                            Math.max(0, Math.min(maxY, currentY)) + "px";
                    }
                }
            });

            if (
                localStorage.getItem("AcodeX_Is_Opened") === "true" &&
                localStorage.getItem("AcodeX_Current_Session")
            ) {
                await this.openTerminalPanel(
                    localStorage.getItem("AcodeX_Terminal_Cont_Height") || 270,
                    this.settings.port
                );
            }

            // acodex terminal api
            acode.define("acodex", {
                execute: cmd => {
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
                openTerminal: (
                    termContainerHeight = 270,
                    port = this.settings.port
                ) => {
                    if (!this.isTerminalOpened) {
                        this.createTerminal(termContainerHeight, port);
                    }
                },
                createSession: () => {
                    if (this.isTerminalOpened) {
                        this.createSession();
                    }
                },
                closeTerminal: () => {
                    if (this.isTerminalOpened) {
                        this.closeTerminal();
                    }
                },
                convertAcodeUriToTermReadable: path => {
                    return this._convertPath(path);
                },
                addTheme: (themeNme, colorSchema) => {
                    themeList.push(themeNme);
                    themes[themeNme] = colorSchema;
                },
                applyTheme: themeNme => {
                    this.settings.theme = themeNme;
                    appSettings.update();
                }
            });
        } catch (err) {
            console.log(err);
            //alert("Warning", "Please Restart the app to use AcodeX");
        }
    }

    async openTerminalPanel(termContainerHeight, port) {
        /*
        opens floating terminal panel
        @parm termContainerHeight: number
        @parm port: number
        */

        if (!port) return;
        if (!document.querySelector(".terminal-container")) {
            app.get("main").append(this.$terminalContainer, this.$showTermBtn);
        }
        this.settings.port = port;
        appSettings.update(false);
        this.$terminalContainer.classList.remove("hide");
        this.isTerminalOpened = true;
        this.$terminalContainer.style.height = termContainerHeight + "px";
        this.$terminalContent.style.width = "100%";
        this.$terminalContent.style.height = `calc(100% - ${this.$terminalContainer.offsetHeight}px)`;

        if (this.settings.transparency) {
            this.$terminalContainer.style.background = "transparent";
            this.$terminalContainer.style.backdropFilter = `blur(${this.settings.blurValue})`;
            this.$terminalHeader.style.background = this.transparentColor(
                this.$terminalHeader
            );
            this.$terminalHeader.style.backdropFilter = `blur(${this.settings.blurValue})`;
        } else {
            this.$terminalContainer.style.background =
                "var(--popup-background-color)";
            this.$terminalHeader.style.background = "var(--primary-color)";
        }

        if (localStorage.getItem("AcodeX_Current_Session")) {
            this.changeSession(
                localStorage.getItem("AcodeX_Current_Session"),
                true
            );
        } else {
            this.$terminalContent.innerHTML = "";
            this.createSession();
        }
    }

    transparentColor(element) {
        let currentBackgroundColor =
            window.getComputedStyle(element).backgroundColor;
        // Extract the RGB values
        var rgbValues = currentBackgroundColor.match(/\d+/g);
        // Convert the RGB values to RGBA by adding 1 for the alpha (transparency) value
        var currentAlpha = parseFloat(rgbValues[3]) || 1.0;
        return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.5)`;
    }

    async createXtermTerminal(port) {
        this.$terminal = this.terminalObj;
        this.$fitAddon = new FitAddon();
        this.$webglAddon = new WebglAddon();
        this.$unicode11Addon = new Unicode11Addon();
        this.$webLinkAddon = new WebLinksAddon((event, uri) => {
            system.openInBrowser(uri);
        });
        this.$terminal.loadAddon(this.$fitAddon);
        this.$terminal.loadAddon(this.$unicode11Addon);
        this.$terminal.loadAddon(this.$webLinkAddon);

        this.fitTerminal();
        if (this.$webglAddon) {
            try {
                this.$terminal.loadAddon(this.$webglAddon);
                this.$terminal.open(this.$terminalContent);
            } catch (e) {
                window.toast("error during loading webgl addon: " + e, 4000);
                this.$webglAddon.dispose();
                this.$webglAddon = undefined;
            }
        }
        if (!this.$terminal.element) {
            // webgl loading failed for some reason, attach with DOM renderer
            this.$terminal.open(this.$terminalContent);
        }
        this.$terminal.focus();
        this._updateTerminalHeight();
    }

    async attachSocketToXterm(port, pid) {
        this.$terminal.onResize(size => {
            if (!pid) return;
            const cols = size.cols;
            const rows = size.rows;
            const url =
                "http://localhost:" +
                port +
                "/terminals/" +
                pid +
                "/size?cols=" +
                cols +
                "&rows=" +
                rows;

            fetch(url, { method: "POST" });
        });
        this.socket = new WebSocket(`ws://localhost:${port}/terminals/${pid}`);
        this.socket.onopen = () => {
            this.$attachAddon = new AttachAddon(this.socket);
            this.$terminal.loadAddon(this.$attachAddon);
            this.$terminal.unicode.activeVersion = "11";
            this._updateTerminalHeight();
            localStorage.setItem("AcodeX_Is_Opened", this.isTerminalOpened);
            localStorage.setItem(
                "AcodeX_Terminal_Cont_Height",
                this.$terminalContainer.offsetHeight
            );
            // check for is terminal minimised
            if (
                localStorage.getItem("AcodeX_Terminal_Is_Minimised") === "true"
            ) {
                this.minimise();
            }
            this.$terminal.focus();
            this._updateTerminalHeight();
        };
        this.socket.onerror = error => {
            acode.alert("AcodeX Error", JSON.stringify(error));
        };
    }

    async createSession() {
        /*
        creates terminal session
        */
        let pid;
        const jsonData = await this.$cacheFile.readFile("utf8");
        let sessionsData = jsonData ? JSON.parse(jsonData) : [];

        if (sessionsData.length === 0) {
            this.createXtermTerminal(this.settings.port);
            pid = await this._generateProcessId();
            if (!pid) return;
            sessionsData = [{ name: "AcodeX1", pid: pid }];
        } else {
            this._hideTerminalSession();
            // Find the highest session number among existing sessions
            const highestSessionNumber = sessionsData.reduce(
                (maxNumber, session) => {
                    const sessionName = session.name;
                    const match = sessionName.match(/^AcodeX(\d+)$/);
                    if (match) {
                        const sessionNumber = parseInt(match[1], 10);
                        return Math.max(maxNumber, sessionNumber);
                    }
                    return maxNumber;
                },
                0
            );

            // Generate the next session name with an incremented number
            const nextSessionNumber = highestSessionNumber + 1;
            const nextSessionName = `AcodeX${nextSessionNumber}`;

            this.createXtermTerminal(this.settings.port);
            pid = await this._generateProcessId();
            if (!pid) return;
            sessionsData.push({ name: nextSessionName, pid });
        }

        await Promise.all([
            this.$cacheFile.writeFile(sessionsData),
            this.attachSocketToXterm(this.settings.port, pid)
        ]);
        this._updateTerminalHeight();
        localStorage.setItem(
            "AcodeX_Current_Session",
            sessionsData[sessionsData.length - 1].name
        );
        this.$terminalTitle.textContent =
            sessionsData[sessionsData.length - 1].name;
        window.toast(
            `Created Session: ${sessionsData[sessionsData.length - 1].name}`,
            3000
        );
    }

    _hideTerminalSession() {
        this.$attachAddon.dispose();
        this.$fitAddon.dispose();
        this.$unicode11Addon.dispose();
        this.$webLinkAddon.dispose();
        this.$webglAddon.dispose();
        this.$terminal.dispose();
        this.socket.close();
        this.socket = null;
        this.$terminal = undefined;
        this.$attachAddon = undefined;
        this.$fitAddon = undefined;
        this.$unicode11Addon = undefined;
        this.$webLinkAddon = undefined;
        this.$webglAddon = undefined;
        this.$terminalContent.innerHTML = "";
    }

    async _generateProcessId() {
        try {
            const res = await fetch(
                "http://localhost:" +
                    this.settings.port +
                    "/terminals?cols=" +
                    this.$terminal.cols +
                    "&rows=" +
                    this.$terminal.rows,
                { method: "POST" }
            );
            return await res.text();
        } catch (err) {
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
            localStorage.removeItem("AcodeX_Current_Session");
            window.toast("Start the acodex server in termux first!", 4000);
        }
    }

    async changeSession(sessionName, isFirst = false) {
        if (isFirst) {
            this.createXtermTerminal(this.settings.port);
            const pid = await this._getPidBySessionName(sessionName);
            if (!pid) return;
            this.attachSocketToXterm(this.settings.port, pid);
            localStorage.setItem("AcodeX_Current_Session", sessionName);
            this.$terminalTitle.textContent = sessionName;
        } else {
            if (sessionName === localStorage.getItem("AcodeX_Current_Session"))
                return;
            this._hideTerminalSession();
            this.createXtermTerminal(this.settings.port);
            const pid = await this._getPidBySessionName(sessionName);
            if (!pid) return;
            this.attachSocketToXterm(this.settings.port, pid);
            localStorage.setItem("AcodeX_Current_Session", sessionName);
            this.$terminalTitle.textContent = sessionName;
        }
    }

    async _getPidBySessionName(sessionName) {
        const jsonData = await this.$cacheFile.readFile("utf8");
        let sessionsData = jsonData ? JSON.parse(jsonData) : [];

        // Check if the sessions data is an array
        if (Array.isArray(sessionsData)) {
            // Find the session by name
            const session = sessionsData.find(s => s.name === sessionName);

            // Check if the session was found
            if (session) {
                // Return the PID associated with the session
                return session.pid;
            } else {
                console.log(
                    `Error: Session '${sessionName}' not found in JSON file.`
                );
                return null;
            }
        } else {
            console.log("Error: Sessions data is not an array in JSON file.");
            return null;
        }
    }

    _saveSetting() {
        appSettings.value[plugin.id] = {
            port: 8767,
            transparency: this.ALLOW_TRANSPRANCY,
            showTerminalBtnSize: 35,
            blurValue: "4px",
            cursorBlink: this.CURSOR_BLINK,
            cursorStyle: this.CURSOR_STYLE[0],
            fontSize: this.FONT_SIZE,
            fontFamily: this.FONT_FAMILY,
            fontWeight: this.FONT_WEIGHT[0],
            customFontStyleSheet: "",
            scrollBack: this.SCROLLBACK,
            scrollSensitivity: this.SCROLL_SENSITIVITY,
            theme: "ayuMirage",
            background: themes["ayuMirage"].background,
            foreground: themes["ayuMirage"].foreground,
            cursor: themes["ayuMirage"].cursor || "",
            cursorAccent: themes["ayuMirage"].cursorAccent || "",
            selectionBackground: themes["ayuMirage"].selectionBackground,
            black: themes["ayuMirage"].black,
            blue: themes["ayuMirage"].blue,
            brightBlack: themes["ayuMirage"].brightBlack,
            brightBlue: themes["ayuMirage"].brightBlue,
            brightCyan: themes["ayuMirage"].brightCyan,
            brightGreen: themes["ayuMirage"].brightGreen,
            brightMagenta: themes["ayuMirage"].brightMagenta,
            brightRed: themes["ayuMirage"].brightWhite,
            brightWhite: themes["ayuMirage"].brightWhite,
            brightYellow: themes["ayuMirage"].brightYellow,
            cyan: themes["ayuMirage"].cyan,
            green: themes["ayuMirage"].green,
            magenta: themes["ayuMirage"].magenta,
            red: themes["ayuMirage"].red,
            white: themes["ayuMirage"].white,
            yellow: themes["ayuMirage"].yellow
        };
        appSettings.update(false);
    }

    _loadCustomFontStyleSheet() {
        if (this.settings.customFontStyleSheet != "") {
            if (!document.querySelector("#customFontAcodeXStyleSheet")) {
                const fontStyleSheet = tag("link", {
                    href: this.settings.customFontStyleSheet,
                    rel: "stylesheet",
                    id: "customFontAcodeXStyleSheet"
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
        this.fitTerminal();
    }

    fitTerminal() {
        const dimensions = this.$fitAddon.proposeDimensions();
        if (dimensions) {
            this.$terminal.resize(dimensions.cols + 2, dimensions.rows + 1);
        }
    }

    async _getLastSessionName() {
        try {
            // Read the JSON file
            const jsonData = await this.$cacheFile.readFile("utf8");
            let sessionsData = jsonData ? JSON.parse(jsonData) : [];

            // Check if the sessions data is an array
            if (Array.isArray(sessionsData) && sessionsData.length > 0) {
                // Get the last session name
                const lastSession = sessionsData[sessionsData.length - 1];
                return lastSession.name;
            } else {
                console.error(
                    "Error: No sessions found in JSON file or sessions data is not an array."
                );
                return null;
            }
        } catch (error) {
            console.error("Error reading or parsing JSON file:", error);
            return null;
        }
    }

    async closeTerminal() {
        /*
        remove terminal from  app
        */
        let confirmation = await confirm("Warning", "Are you sure ?");
        if (!confirmation) return;
        if (
            this.$terminal != null &&
            localStorage.getItem("AcodeX_Current_Session")
        ) {
            const pidOfCurrentSession = await this._getPidBySessionName(
                localStorage.getItem("AcodeX_Current_Session")
            );
            fetch(
                `http://localhost:${this.settings.port}/terminals/${pidOfCurrentSession}/terminate`,
                {
                    method: "POST"
                }
            )
                .then(async response => {
                    if (response.ok) {
                        const jsonData = await this.$cacheFile.readFile("utf8");
                        let sessionsData = jsonData ? JSON.parse(jsonData) : [];

                        // Filter out the session to delete
                        sessionsData = sessionsData.filter(
                            session =>
                                session.name !==
                                localStorage.getItem("AcodeX_Current_Session")
                        );

                        // Save the updated sessionsData back to the JSON file
                        await this.$cacheFile.writeFile(sessionsData);

                        // Check if there are any remaining sessions
                        if (sessionsData.length > 0) {
                            // Get the next session name
                            const nextSessionName =
                                await this._getLastSessionName();
                            this.changeSession(nextSessionName);
                        } else {
                            this._hideTerminalSession();
                            if (
                                !this.$terminalContainer.classList.contains(
                                    "hide"
                                )
                            )
                                this.$terminalContainer.classList.add("hide");
                            if (!this.$showTermBtn.classList.contains("hide"))
                                this.$showTermBtn.classList.add("hide");
                            this.isTerminalMinimized = false;
                            this.isTerminalOpened = false;
                            localStorage.removeItem("AcodeX_Current_Session");
                            localStorage.setItem(
                                "AcodeX_Terminal_Is_Minimised",
                                this.isTerminalMinimized
                            );
                            localStorage.setItem(
                                "AcodeX_Is_Opened",
                                this.isTerminalOpened
                            );
                            this.$terminalContainer.style.height =
                                this.previousTerminalHeight;
                            localStorage.setItem(
                                "AcodeX_Terminal_Cont_Height",
                                this.$terminalContainer.offsetHeight
                            );
                        }
                    } else {
                        acode.alert(
                            "AcodeX Error",
                            `Failed to close terminal ${this.pid}.`
                        );
                    }
                })
                .catch(async error => {
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
                    localStorage.setItem(
                        "AcodeX_Is_Opened",
                        this.isTerminalOpened
                    );
                    this.$terminalContainer.style.height =
                        this.previousTerminalHeight;
                    localStorage.setItem(
                        "AcodeX_Terminal_Cont_Height",
                        this.$terminalContainer.offsetHeight
                    );
                    localStorage.removeItem("AcodeX_Current_Session");
                    await this.$cacheFile.writeFile("");
                    acode.alert(
                        "AcodeX Server",
                        "Disconnected from server because server gets closed 😞!"
                    );
                    console.error(
                        `Error while closing terminal ${this.pid}: ${error}`
                    );
                });
        }
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
        this._updateTerminalHeight();
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
                this.$terminalContainer.style.height = "0px";
                this.$terminalContainer.classList.add("hide");
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
            if (
                parseInt(localStorage.getItem("AcodeX_Terminal_Cont_Height")) <=
                50
            ) {
                this.$terminalContainer.style.height = "50px";
            } else {
                this.$terminalContainer.style.height =
                    localStorage.getItem("AcodeX_Terminal_Cont_Height") + "px";
            }
            this.$terminalContainer.classList.remove("hide");
            this.$terminalContent.style.height = `calc(100% - ${this.$terminalContainer.offsetHeight}px)`;
            this.fitTerminal();
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
        await fsOperation(window.DATA_STORAGE + "acodex_fonts").delete();
        editorManager.editor.commands.removeCommand("terminal:open_terminal");
        editorManager.editor.commands.removeCommand("terminal:close_terminal");
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
        localStorage.removeItem("AcodeX_Current_Session");
        localStorage.removeItem("AcodeX_Terminal_Cont_Height");
        localStorage.removeItem("AcodeX_Is_Opened");
    }

    async setCustomFontFile() {
        const { url } = await acode.fileBrowser(
            "file",
            "select custom font stylesheet"
        );
        if (!url) return;
        let realUrl = this._convertPath(url);
        if (realUrl.startsWith("/sdcard")) {
            realUrl = realUrl.replace("/sdcard", "file:///storage/emulated/0");
        } else if (realUrl.startsWith("$HOME")) {
            return;
        }
        const urlSegments = url.split("/");
        const fileNameWithExtension = urlSegments[urlSegments.length - 1];
        realUrl = realUrl + "/" + fileNameWithExtension;
        const newUrl = await toInternalUrl(realUrl);
        this.settings.customFontStyleSheet = newUrl;
        appSettings.update();
    }

    async applyTheme(themeName) {
        const theme = themes[themeName];
        this.settings.theme = themeName;
        this.settings.background = theme.background;
        this.settings.foreground = theme.foreground;
        this.settings.cursor = theme.cursor || "#fff";
        this.settings.cursorAccent = theme.cursorAccent || "#fff";
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

    hexToTransparentRGBA(hex, alpha) {
        // Remove the hash character if it's present
        hex = hex.replace("#", "");

        // Parse the hex value to RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Return the RGBA string with the specified alpha value
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    get terminalThemeObj() {
        return {
            background: this.settings.transparency
                ? this.hexToTransparentRGBA(this.settings.background, 0.5)
                : this.settings.background,
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
            yellow: this.settings.yellow
        };
    }

    get terminalObj() {
        return new Terminal({
            allowTransparency: this.settings.transparency,
            allowProposedApi: true,
            scrollOnUserInput: true,
            cursorBlink: this.settings.cursorBlink,
            cursorStyle: this.settings.cursorStyle,
            scrollBack: this.settings.scrollBack,
            scrollSensitivity: this.settings.scrollSensitivity,
            fontSize: this.settings.fontSize,
            fontFamily: this.settings.fontFamily,
            fontWeight: this.settings.fontWeight,
            theme: this.terminalThemeObj
        });
    }

    async clearCache() {
        await this.$cacheFile.writeFile("");
        window.toast("Cache cleared 🔥", 3000);
    }

    get fontsList() {
        return [
            [
                appSettings.get("editorFont"),
                "Default Editor Font",
                "file file_type_font",
                true
            ],
            [
                "Fira Code Bold Nerd Font",
                "Fira Code Bold Nerd Font",
                "file file_type_font",
                true
            ],
            [
                "Fira Code Medium Nerd Font",
                "Fira Code Medium Nerd Font",
                "file file_type_font",
                true
            ],
            [
                "JetBrains Mono Bold Nerd Font",
                "JetBrains Mono Bold Nerd Font",
                "file file_type_font",
                true
            ],
            [
                "JetBrains Mono Medium Nerd Font",
                "JetBrains Mono Medium Nerd Font",
                "file file_type_font",
                true
            ],
            [
                "VictorMonoNerdFont Bold",
                "VictorMonoNerdFont Bold",
                "file file_type_font",
                true
            ],
            [
                "VictorMonoNerdFont BoldItalic",
                "VictorMonoNerdFont BoldItalic",
                "file file_type_font",
                true
            ],
            [
                "VictorMonoNerdFont Medium",
                "VictorMonoNerdFont Medium",
                "file file_type_font",
                true
            ],
            [
                "VictorMonoNerdFont Italic",
                "VictorMonoNerdFont Italic",
                "file file_type_font",
                true
            ],
            [
                "SauceCodeProNerdFont Bold",
                "SauceCodeProNerdFont Bold",
                "file file_type_font",
                true
            ],
            [
                "SauceCodeProNerdFont Medium",
                "SauceCodeProNerdFont Medium",
                "file file_type_font",
                true
            ],
            [
                "MesloLGS NF Bold Italic",
                "MesloLGS NF Bold Italic",
                "file file_type_font",
                true
            ],
            [
                "MesloLGS NF Bold",
                "MesloLGS NF Bold",
                "file file_type_font",
                true
            ],
            [
                "MesloLGS NF Italic",
                "MesloLGS NF Italic",
                "file file_type_font",
                true
            ],
            [
                "MesloLGS NF Regular",
                "MesloLGS NF Regular",
                "file file_type_font",
                true
            ]
        ];
    }

    async downloadFont() {
        try {
            const baseFontDir = window.DATA_STORAGE + "acodex_fonts";
            const baseFontUrl =
                "https://cdn.jsdelivr.net/gh/bajrangCoder/acode-plugin-acodex@main/fonts/";
            const fontsUrls = [
                baseFontUrl + "Fira Code Bold Nerd Font.ttf",
                baseFontUrl + "Fira Code Medium Nerd Font Complete Mono.ttf",
                baseFontUrl + "JetBrains Mono Bold Nerd Font Complete.ttf",
                baseFontUrl + "JetBrains Mono Medium Nerd Font Complete.ttf",
                baseFontUrl + "MesloLGS NF Bold Italic.ttf",
                baseFontUrl + "MesloLGS NF Bold.ttf",
                baseFontUrl + "MesloLGS NF Italic.ttf",
                baseFontUrl + "MesloLGS NF Regular.ttf",
                baseFontUrl + "SauceCodeProNerdFont-Bold.ttf",
                baseFontUrl + "SauceCodeProNerdFont-Medium.ttf",
                baseFontUrl + "VictorMonoNerdFont-Bold.ttf",
                baseFontUrl + "VictorMonoNerdFont-BoldItalic.ttf",
                baseFontUrl + "VictorMonoNerdFont-Italic.ttf",
                baseFontUrl + "VictorMonoNerdFont-Medium.ttf"
            ];
            if (!(await fsOperation(baseFontDir).exists())) {
                await fsOperation(window.DATA_STORAGE).createDirectory(
                    "acodex_fonts"
                );
                loader.create("AcodeX", "Downloading Fonts...");
                fontsUrls.forEach(async fontFileURL => {
                    fetch(fontFileURL)
                        .then(response => response.blob())
                        .then(async blob => {
                            const fileName = fontFileURL.split("/").pop(); // Get the file name from the URL
                            await fsOperation(baseFontDir).createFile(
                                fileName,
                                blob
                            );
                        })
                        .catch(error => {
                            loader.destroy();
                            window.toast(
                                `Error fetching font file: ${error.toString()}`,
                                4000
                            );
                        });
                });
                loader.destroy();
                window.toast("Fonts Downloaded successfully 💥", 3000);
            }
        } catch (err) {
            console.log(err);
            loader.destroy();
        }
    }

    get settingsObj() {
        if (this.settings.theme === "custom") {
            return {
                list: [
                    {
                        key: "port",
                        text: "Server Port",
                        value: this.settings.port,
                        info: "Port which is displayed on termux when starting the server",
                        prompt: "Server Port",
                        promptType: "number",
                        promptOption: [
                            {
                                required: true
                            }
                        ]
                    },
                    {
                        key: "showTerminalBtnSize",
                        text: "Show Terminal button size",
                        value: this.settings.showTerminalBtnSize,
                        info: "Size of terminal show button (in px)",
                        prompt: "Show Terminal button size",
                        promptType: "number",
                        promptOption: [
                            {
                                required: true
                            }
                        ]
                    },
                    {
                        key: "blurValue",
                        text: "Blur Value(in px)",
                        value: this.settings.blurValue,
                        info: "Blur value for terminal in transparent mode",
                        prompt: "Blur Value",
                        promptType: "text",
                        promptOption: [
                            {
                                required: true
                            }
                        ]
                    },
                    {
                        key: "clearCache",
                        text: "Clear Cache",
                        info: "Helps in clearing cache which contains session details in case of any problems or bug"
                    },
                    {
                        index: 4,
                        key: "customFontStyleSheet",
                        text: "Custom Font Stylesheet file",
                        info: "Select css file in which you have to define about your custom font.",
                        value: this.settings.customFontStyleSheet
                    },
                    {
                        key: "transparency",
                        text: "Allow Transparent Terminal",
                        info: "Makes terminal transparent but it will also led to slightly performance decrement",
                        checkbox: !!this.settings.transparency
                    },
                    {
                        index: 0,
                        key: "cursorBlink",
                        text: "Cursor Blink",
                        info: "Whether the cursor blinks.",
                        checkbox: !!this.settings.cursorBlink
                    },
                    {
                        key: "fontWeight",
                        text: "Font Weight",
                        value: this.settings.fontWeight,
                        info: "The font weight used to render non-bold text.",
                        select: this.FONT_WEIGHT
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
                            this.CURSOR_STYLE[2]
                        ]
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
                                required: true
                            }
                        ]
                    },
                    {
                        index: 3,
                        key: "fontFamily",
                        text: "Font Family",
                        value: this.settings.fontFamily,
                        info: "The font family used to render text.",
                        select: this.fontsList
                    },
                    {
                        index: 5,
                        key: "scrollBack",
                        text: "Scroll Back",
                        value: this.settings.scrollBack,
                        info: "The amount of scrollback in the terminal. Scrollback is the amount of rows that are retained when lines are scrolled beyond the initial viewport.",
                        prompt: "Scroll Back",
                        promptType: "number",
                        promptOption: [
                            {
                                match: /^[0-9]+$/,
                                required: true
                            }
                        ]
                    },
                    {
                        index: 6,
                        key: "scrollSensitivity",
                        text: "Scroll Sensitivity",
                        value: this.settings.scrollSensitivity,
                        info: "The scrolling speed multiplier used for adjusting normal scrolling speed.",
                        prompt: "Scroll Sensitivity",
                        promptType: "number",
                        promptOption: [
                            {
                                match: /^[0-9]+$/,
                                required: true
                            }
                        ]
                    },
                    {
                        index: 7,
                        key: "theme",
                        text: "Theme",
                        value: this.settings.theme,
                        info: "Theme of terminal.",
                        select: themeList
                    },
                    {
                        index: 8,
                        key: "background",
                        text: "Background Color",
                        value: this.settings.background,
                        color: this.settings.background
                    },
                    {
                        index: 8,
                        key: "foreground",
                        text: "Foreground Color",
                        value: this.settings.foreground,
                        color: this.settings.foreground
                    },
                    {
                        index: 9,
                        key: "selectionBackground",
                        text: "Selection Background Color",
                        value: this.settings.selectionBackground,
                        color: this.settings.selectionBackground
                    },
                    {
                        key: "cursor",
                        text: "Cursor Color",
                        value: this.settings.cursor,
                        color: this.settings.cursor
                    },
                    {
                        key: "cursorAccent",
                        text: "Cursor Accent Color",
                        value: this.settings.cursorAccent,
                        color: this.settings.cursorAccent
                    },
                    {
                        index: 10,
                        key: "black",
                        text: "Black Color",
                        value: this.settings.black,
                        color: this.settings.black
                    },
                    {
                        index: 11,
                        key: "blue",
                        text: "Blue Color",
                        value: this.settings.blue,
                        color: this.settings.blue
                    },
                    {
                        index: 12,
                        key: "brightBlack",
                        text: "Bright Black Color",
                        value: this.settings.brightBlack,
                        color: this.settings.brightBlack
                    },
                    {
                        index: 13,
                        key: "brightBlue",
                        text: "Bright Blue Color",
                        value: this.settings.brightBlue,
                        color: this.settings.brightBlue
                    },
                    {
                        index: 14,
                        key: "brightCyan",
                        text: "Bright Cyan Color",
                        value: this.settings.brightCyan,
                        color: this.settings.brightCyan
                    },
                    {
                        index: 15,
                        key: "brightGreen",
                        text: "Bright Green Color",
                        value: this.settings.brightGreen,
                        color: this.settings.brightGreen
                    },
                    {
                        index: 16,
                        key: "brightMagenta",
                        text: "Bright Magenta Color",
                        value: this.settings.brightMagenta,
                        color: this.settings.brightMagenta
                    },
                    {
                        index: 17,
                        key: "brightRed",
                        text: "Bright Red Color",
                        value: this.settings.brightRed,
                        color: this.settings.brightRed
                    },
                    {
                        index: 18,
                        key: "brightWhite",
                        text: "Bright White Color",
                        value: this.settings.brightWhite,
                        color: this.settings.brightWhite
                    },
                    {
                        index: 19,
                        key: "brightYellow",
                        text: "Bright Yellow Color",
                        value: this.settings.brightYellow,
                        color: this.settings.brightYellow
                    },
                    {
                        index: 20,
                        key: "cyan",
                        text: "Cyan Color",
                        value: this.settings.cyan,
                        color: this.settings.cyan
                    },
                    {
                        index: 21,
                        key: "green",
                        text: "Green Color",
                        value: this.settings.green,
                        color: this.settings.green
                    },
                    {
                        index: 22,
                        key: "magenta",
                        text: "Magenta Color",
                        value: this.settings.magenta,
                        color: this.settings.magenta
                    },
                    {
                        index: 23,
                        key: "red",
                        text: "Red Color",
                        value: this.settings.red,
                        color: this.settings.red
                    },
                    {
                        index: 24,
                        key: "white",
                        text: "White Color",
                        value: this.settings.white,
                        color: this.settings.white
                    },
                    {
                        index: 25,
                        key: "yellow",
                        text: "Yellow Color",
                        value: this.settings.yellow,
                        color: this.settings.yellow
                    }
                ],
                cb: (key, value) => this.settingsSaveCallback(key, value)
            };
        } else {
            return {
                list: [
                    {
                        key: "port",
                        text: "Server Port",
                        value: this.settings.port,
                        info: "Port which is displayed on termux when starting the server",
                        prompt: "Server Port",
                        promptType: "number",
                        promptOption: [
                            {
                                required: true
                            }
                        ]
                    },
                    {
                        key: "fontWeight",
                        text: "Font Weight",
                        value: this.settings.fontWeight,
                        info: "The font weight used to render non-bold text.",
                        select: this.FONT_WEIGHT
                    },
                    {
                        key: "showTerminalBtnSize",
                        text: "Show Terminal button size",
                        value: this.settings.showTerminalBtnSize,
                        info: "Size of terminal show button (in px)",
                        prompt: "Show Terminal button size",
                        promptType: "number",
                        promptOption: [
                            {
                                required: true
                            }
                        ]
                    },
                    {
                        key: "blurValue",
                        text: "Blur Value(in px)",
                        value: this.settings.blurValue,
                        info: "Blur value for terminal in transparent mode",
                        prompt: "Blur Value",
                        promptType: "text",
                        promptOption: [
                            {
                                required: true
                            }
                        ]
                    },
                    {
                        key: "clearCache",
                        text: "Clear Cache",
                        info: "Helps in clearing cache which contains session details in case of any problems or bug"
                    },
                    {
                        key: "transparency",
                        text: "Allow Transparent Terminal",
                        info: "Makes terminal transparent but it will also led to slightly performance decrement",
                        checkbox: !!this.settings.transparency
                    },
                    {
                        index: 7,
                        key: "customFontStyleSheet",
                        text: "Custom Font Stylesheet file",
                        info: "Select css file in which you have to define about your custom font.",
                        value: this.settings.customFontStyleSheet
                    },
                    {
                        index: 0,
                        key: "cursorBlink",
                        text: "Cursor Blink",
                        info: "Whether the cursor blinks.",
                        checkbox: !!this.settings.cursorBlink
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
                            this.CURSOR_STYLE[2]
                        ]
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
                                required: true
                            }
                        ]
                    },
                    {
                        index: 3,
                        key: "fontFamily",
                        text: "Font Family",
                        value: this.settings.fontFamily,
                        info: "The font family used to render text.",
                        select: this.fontsList
                    },
                    {
                        index: 4,
                        key: "scrollBack",
                        text: "Scroll Back",
                        value: this.settings.scrollBack,
                        info: "The amount of scrollback in the terminal. Scrollback is the amount of rows that are retained when lines are scrolled beyond the initial viewport.",
                        prompt: "Scroll Back",
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
                        key: "scrollSensitivity",
                        text: "Scroll Sensitivity",
                        value: this.settings.scrollSensitivity,
                        info: "The scrolling speed multiplier used for adjusting normal scrolling speed.",
                        prompt: "Scroll Sensitivity",
                        promptType: "number",
                        promptOption: [
                            {
                                match: /^[0-9]+$/,
                                required: true
                            }
                        ]
                    },
                    {
                        index: 6,
                        key: "theme",
                        text: "Theme",
                        value: this.settings.theme,
                        info: "Theme of terminal.",
                        select: themeList
                    }
                ],
                cb: (key, value) => this.settingsSaveCallback(key, value)
            };
        }
    }

    settingsSaveCallback(key, value) {
        switch (key) {
            case "customFontStyleSheet":
                this.setCustomFontFile();
                break;

            case "theme":
                this.applyTheme(value);
                if (value === "custom") {
                    acode.alert("AcodeX Warning", "Restart the app please");
                }
                break;
            case "clearCache":
                this.clearCache();
                break;
            case "showTerminalBtnSize":
                if (this.$showTermBtn) {
                    this.$showTermBtn.style.height = value + "px";
                    this.$showTermBtn.style.width = value + "px";
                }
                this.settings[key] = value;
                appSettings.update();
                break;

            default:
                this.settings[key] = value;
                appSettings.update();
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
