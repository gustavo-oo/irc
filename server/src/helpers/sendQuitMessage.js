import {
    removeUserFromChannel,
    getUserChannel,
    isUserInChannel,
} from "../store.js";

import sendMessageToChannel from "./sendMessageToChannel.js";

export default function sendQuitMessage(socket, message) {
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