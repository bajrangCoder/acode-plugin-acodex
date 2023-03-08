#!/usr/bin/env node
const { WebSocketServer } = require("ws");
const pty = require("node-pty");
const fs = require("fs");
const path = require("path");

let port = parseInt(process.env.WS_PORT || process.env.PORT || 8767);

const server = new WebSocketServer({
    port: port,
});

server.on("connection", function (connection) {
    const shell = pty.spawn("bash", [], {
        name: "xterm-256color",
        cwd: process.env.HOME,
        env: process.env,
    });

    connection.on("message", function (message) {
        const command = typeof message === "string" ? message.trim() : message.toString("utf8").trim();
        if (command === "exit") {
            shell.kill("SIGTERM");
            connection.close();
            return;
        }/*else if (command === "acode ." || command === "acode . ") {
            
            try {
                cwd = shell.process.cwd();
            } catch (e) {
                connection.send(`Error: ${e.message}`);
                return;
            }
            if (cwd === '') {
                //connection.send(`Error: You do not have permission to access root directory`);
            } else {
                connection.send(`Current directory: ${cwd}`);
            }
        } else if (command.startsWith("open ")) {
            const filenames = command.slice(5).split(' ').filter(filename => filename.trim() !== '');
            if (filenames.length === 0) {
                connection.send(`Error: No filename provided`);
            } else {
                let error = false;
                let paths = '';
                filenames.forEach((filename) => {
                    const filepath = shell.process.cwd() + '/' + filename;
                    try {
                        const stats = fs.statSync(filepath);
                        if (stats.isFile()) {
                            paths += `${filepath}\n`;
                        } else if (stats.isDirectory()) {
                            error = true;
                            connection.send(`Error: ${filepath} is a directory, not a file`);
                        }
                    } catch (e) {
                        error = true;
                        connection.send(`Error: File or directory not found: ${filepath}`);
                    }
                });
                if (!error) {
                    connection.send(`File paths:\n${paths}`);
                }
            }
        } else {*/
        
        
        shell.write(command+"\r");
        
        //}
    });

    shell.on("data", function (data) {
        connection.send(data);
    });

    shell.on("exit", function () {
        connection.close();
    });
    
});


console.log(`AcodeX Server started on port: ${port}`);
