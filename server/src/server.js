import { createServer } from "net";

import messageHandler from "./commandsHandlers/messageHandler.js";
import handleQuit from "./commandsHandlers/handleQuit.js";

const serverName = "localhost";

const server = createServer((socket) => {
  console.log("client connected");

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.write("Welcome to the IRC server!\r\n");

  socket.on("data", (data) => {
    messageHandler(data.toString(), socket);
  });

  socket.on("error", (err) => {
    handleQuit(socket, "Connection Closed Abruptly");
    console.log("client disconnected");
  });
});

server.listen(6667, "0.0.0.0", () => {
  console.log("server bound");
});

export { serverName };
