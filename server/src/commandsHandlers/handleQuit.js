import {
  removeUser,
  removeUserFromChannel,
  getUserChannel,
  isUserInChannel,
  getPendingUser,
  getUser,
  removePendingUser,
} from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";

export default function handleQuit(socket, quitMessage) {

  socket.end(() => {
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
}
