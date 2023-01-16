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
  const defaultMessage = "Tchau";

  socket.end(() => {
    if (isUserInChannel(socket)) {
      removeUserFromChannel(socket);
      sendMessageToChannel(
        socket,
        "QUIT",
        quitMessage || defaultMessage,
        getUserChannel(socket)
      );
    }

    if (getUser(socket)) {
      removeUser(socket);
    }

    if (getPendingUser(socket)) {
      removePendingUser(socket);
    }
  });
}
