import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (Socket) => {
    wss.on("error", console.error);
    
    Socket.on("message", (data) => {
        console.log("Received From User : %s", data);
    });

    console.log("Client Connected to server");
    Socket.send("Hi from Server");
});
