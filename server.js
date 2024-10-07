import { server as WebSocket } from "websocket";
import { createServer } from "http";

const server = createServer((request, response) => {});

const webSocketServer = new WebSocket({
  httpServer: server,
});

webSocketServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  console.log("WebSocket connection established");

  connection.on("message", (message) => {
    console.log("Received message: ", message);
    connection.send(message.utf8Data);
  });

  connection.on("close", (reasonCode, description) => {});
});

server.listen(3001, () => {
  console.log("WebSocket server is listening on port 3001");
});
