import { createServer } from "net";
import getClientId from "./helpers/getClientId.js";

import messageHandler from "./commandsHandlers/messageHandler.js";
import handleQuit from "./commandsHandlers/handleQuit.js";

import {
  removeUser,
  removeUserFromChannel,
  isUserInChannel,
  getPendingUser,
  getUser,
  removePendingUser,
} from "./store.js";

const serverName = "Servidor";

const server = createServer((socket) => {
  console.log("client connected: " + getClientId(socket));


  socket.on("end", () => {
    console.log("client disconnected");
    
    if (isUserInChannel(socket)) {
      removeUserFromChannel(socket);
    }

    if (getUser(socket)) {
      removeUser(socket);
    }

    if (getPendingUser(socket)) {
      removePendingUser(socket);
    }
  });

  socket.on("data", (data) => {
    messageHandler(data.toString(), socket);
  });

  socket.on("error", (err) => {
    handleQuit(socket, "Connection Closed Abruptly");
    console.log("client disconnected: Connection Closed Abruptly");
  });
});

server.listen(6667, "0.0.0.0", () => {
  console.log("server bound");
});

export { serverName };
