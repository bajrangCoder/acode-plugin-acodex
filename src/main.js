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

/*
TODO:
- Add settings to customise terminal
- Fix keyboard issue
*/

class AcodeX {
    isDragging = false;
    startY;
    startHeight;
    
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
                    cursorBlink: true,
                    cursorStyle: "block",// underline, bar, block
                    scrollBack: 1000
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
        }
    );
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
