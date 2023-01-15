import { createServer } from "net";

import messageHandler from "./commandsHandlers/messageHandler.js";
import handleQuit from "./commandsHandlers/handleQuit.js";

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
  });
});

server.listen(6667, () => {
  console.log("server bound");
});
