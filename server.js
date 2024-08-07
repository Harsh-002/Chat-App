import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("message", (data) => {
    const { type, message, username } = JSON.parse(data);
    console.log(`Received ${type}: ${message} from ${username}`);

    if (type === "message") {
      // Broadcast the received message to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", message, username }));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });

  ws.on("error", (error) => {
    console.error("Websocket error: " + error);
  });
  ws.send(
    JSON.stringify({
      type: "message",
      username: "server",
      message: "Welcome to the chat!",
    })
  );
});

console.log("WebSocket server is running on ws://localhost:8080");
