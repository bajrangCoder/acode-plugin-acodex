#!/usr/bin/env node
const { WebSocketServer } = require("ws");
const pty = require("node-pty");

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
        const command =
            typeof message === "string" ? message : message.toString("utf8");
        if (command === "exit") {
            shell.kill("SIGTERM");
            connection.close();
            return;
        }
        shell.write(`${command}\r`);
    });

    shell.on("data", function (data) {
        connection.send(data);
    });

    shell.on("exit", function () {
        connection.close();
    });
});

console.log(`AcodeX Server started on port: ${port}`);
