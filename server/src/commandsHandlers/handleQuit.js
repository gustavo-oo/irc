import {
  removeUser,
  removeUserFromChannel,
  getUserChannel,
  isUserInChannel,
  getPendingUser,
  getUser,
  removePendingUser,
} from "../store.js";

export default function handleQuit(socket, quitMessage) {
  socket.end(() => {
    if (isUserInChannel(socket)) {
      removeUserFromChannel(socket, quitMessage);
    }

    if (getUser(socket)) {
      removeUser(socket);
    }

    if (getPendingUser(socket)) {
      removePendingUser(socket);
    }
  });
}
