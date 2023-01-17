import { channelExists, getUserByNickname, getUser } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";
import sendMessageToUser from "../helpers/sendMessageToUser.js";
import getDuplicates from "../helpers/getDuplicates.js";
import {
  noSuchNickErrorHandler,
  noTextToSendErrorHandler,
  noRecipientErrorHandler,
  tooManyTargetsErrorHandler,
} from "../helpers/errorHandlers.js";

export default function handlePrivMsg(socket, targets, message) {
  if (!message) {
    noTextToSendErrorHandler(socket);
    return;
  }
  if (!targets) {
    noRecipientErrorHandler(socket, "PRIVMSG");
    return;
  }

  const users = targets.split(",");
  const duplicate = getDuplicates(users);
  if (duplicate) {
    tooManyTargetsErrorHandler(socket, duplicate);
  }
  users.forEach((target) => {
    if (channelExists(target)) {
      sendMessageToChannel(socket, "PRIVMSG", message, target);
      return;
    }

    const user = getUserByNickname(target);
    if (user) {
      sendMessageToUser(getUser(socket).nickname, user.socket, "PRIVMSG", [
        message,
      ]);
      return;
    }
    noSuchNickErrorHandler(socket, target);
  });
}
