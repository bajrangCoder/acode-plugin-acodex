
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachAddon = void 0;
var AttachAddon = /** @class */ (function () {
    function AttachAddon(socket, options) {
        this._disposables = [];
        this._socket = socket;
        // always set binary type to arraybuffer, we do not handle blobs
        this._socket.binaryType = 'arraybuffer';
        this._bidirectional = !(options && options.bidirectional === false);
    }
    AttachAddon.prototype.activate = function (terminal) {
        var _this = this;
        
        this._disposables.push(addSocketListener(this._socket, 'message', function (ev) {
            var data = ev.data;
            terminal.write(typeof data === 'string' ? data : new Uint8Array(data));
        }));
        if (this._bidirectional) {
            var clearInput = function (term, cmd) {
                var inputLengh = cmd.length;
                for (var i = 0; i < inputLengh; i++) {
                    term.write('\b \b');
                }
            };
            var runCommand = function (term, cmd) {
                if (cmd.length > 0) {
                    clearInput(term, cmd);
                    _this._sendData(cmd);
                    return;
                }
            };
            let cmdHistory = JSON.parse(localStorage.getItem("cmdHistory")) || [];
            let currentInputIndex = cmdHistory.length;
            var command_1 = '';
            this._disposables.push(terminal.onData(function (data) {
                switch (data) {
                    case '\u0003': // Ctrl+C
                        terminal.write('^C');
                        _this._sendData(data);
                        break;
                    case '\r': // Enter
                        runCommand(terminal, command_1);
                        cmdHistory.push(command_1);
                        if (cmdHistory.length > 50) {
                            cmdHistory.shift();
                        }
                        currentInputIndex = cmdHistory.length;
                        localStorage.setItem("cmdHistory", JSON.stringify(cmdHistory));
                        command_1 = '';
                        break;
                    case '\u007F': // Backspace (DEL)
                        // Do not delete the prompt
                        if (terminal._core.buffer.x > 4) {
                            terminal.write('\b \b');
                            if (command_1.length > 0) {
                                command_1 = command_1.substr(0, command_1.length - 1);
                            }
                        }
                        break;
                    case '\u001B[A':
                        if (currentInputIndex > 0) { // Only go back in history if we're not at the beginning
                            currentInputIndex--;
                            terminal.write("\x1b[2K\r" + cmdHistory[currentInputIndex]); // Clear the current input and print the previous one
                        }
                        break;
                    case "\u001b[B": // If user pressed the down arrow key
                        if (currentInputIndex < cmdHistory.length) { // Only go forward in history if we're not at the end
                            currentInputIndex++;
                            if (currentInputIndex === cmdHistory.length) { // If we're at the end, clear the input
                              terminal.write("\x1b[2K\r");
                            } else {
                              terminal.write("\x1b[2K\r" + cmdHistory[currentInputIndex]); // Clear the current input and print the next one
                            }
                        }
                        break;
                    default:
                        if (data >= String.fromCharCode(0x20) && data <= String.fromCharCode(0x7E) || data >= '\u00a0') {
                            command_1 += data;
                            terminal.write(data);
                        }
                }
            }));
            this._disposables.push(terminal.onBinary(function (data) { return _this._sendBinary(data); }));
        }
        this._disposables.push(addSocketListener(this._socket, 'close', function () { return _this.dispose(); }));
        this._disposables.push(addSocketListener(this._socket, 'error', function () { return _this.dispose(); }));
    };
    AttachAddon.prototype.dispose = function () {
        for (var _i = 0, _a = this._disposables; _i < _a.length; _i++) {
            var d = _a[_i];
            d.dispose();
        }
    };
    AttachAddon.prototype._sendData = function (data) {
        if (!this._checkOpenSocket()) {
            return;
        }
        this._socket.send(data);
    };
    AttachAddon.prototype._sendBinary = function (data) {
        if (!this._checkOpenSocket()) {
            return;
        }
        var buffer = new Uint8Array(data.length);
        for (var i = 0; i < data.length; ++i) {
            buffer[i] = data.charCodeAt(i) & 255;
        }
        this._socket.send(buffer);
    };
    AttachAddon.prototype._checkOpenSocket = function () {
        switch (this._socket.readyState) {
            case WebSocket.OPEN:
                return true;
            case WebSocket.CONNECTING:
                throw new Error('Attach addon was loaded before socket was open');
            case WebSocket.CLOSING:
                console.warn('Attach addon socket is closing');
                return false;
            case WebSocket.CLOSED:
                throw new Error('Attach addon socket is closed');
            default:
                throw new Error('Unexpected socket state');
        }
    };
    return AttachAddon;
}());
exports.AttachAddon = AttachAddon;
function addSocketListener(socket, type, handler) {
    socket.addEventListener(type, handler);
    return {
        dispose: function () {
            if (!handler) {
                // Already disposed
                return;
            }
            socket.removeEventListener(type, handler);
        }
    };
}
