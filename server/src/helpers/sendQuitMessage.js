import {
    removeUserFromChannel,
    getUserChannel,
    isUserInChannel,
} from "../store.js";

import sendMessageToChannel from "./sendMessageToChannel.js";

export default function sendQuitMessage(socket, quitMessage) {
  const defaultMessage = "TCHAU";
    if (isUserInChannel(socket)) {
        removeUserFromChannel(socket, message);
        sendMessageToChannel(
          socket,
          "QUIT",
          quitMessage || defaultMessage,
          getUserChannel(socket)
        );
      }
}