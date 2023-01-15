import { createServer } from "net";

import messageHandler from "./commandsHandlers/messageHandler.js";
import { pendingUsers, users } from "./store.js";

const server = createServer((socket) => {
  console.log("client connected");

  socket.on("close", () => {
    console.log("client disconnected");
    removeUserFromChannel(socket);
    removeUser(socket);
  });

  socket.write("Welcome to the IRC server!\r\n");

  socket.on("data", (data) => {
    messageHandler(data.toString(), socket);
  });

  socket.on("error", (err) => {
    console.log("Server error: " + err);
  });
});

server.listen(6667, "0.0.0.0", () => {
  console.log("server bound");
});
