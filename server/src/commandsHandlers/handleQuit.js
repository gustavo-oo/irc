import { removeUser, removeUserFromChannel, getUserChannel } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";

export default function handleQuit(socket, quitMessage) {
  const defaultMessage = "Tchau";

  socket.end(() => {
    sendMessageToChannel(
      socket,
      "QUIT",
      quitMessage || defaultMessage,
      getUserChannel(socket)
    );
  });
}
