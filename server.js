import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });

  ws.on("error", (error) => {
    console.error("Websocket error: " + error);
  });
  ws.send("something");
});

console.log("WebSocket server is running on ws://localhost:8080");
