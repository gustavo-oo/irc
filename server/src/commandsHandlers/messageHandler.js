import handleNick from "./handleNick.js";
import handleUser from "./handleUser.js";
import handleQuit from "./handleQuit.js";
import handleList from "./handleList.js";
import handleJoin from "./handleJoin.js";
import handlePart from "./handlePart.js";
import handlePrivMsg from "./handlePrivMsg.js";
import handleWho from "./handleWho.js"

import { isUserRegistered } from "../store.js";
import {
  notRegisteredErrorHandler,
  unknownCommandErrorHandler,
} from "../helpers/errorHandlers.js";

const commandsHandlers = {
  nick: handleNick,
  user: handleUser,
  quit: handleQuit,
  join: handleJoin,
  part: handlePart,
  list: handleList,
  who: handleWho,
  privmsg: handlePrivMsg,
};

const MAX_STRING_LENGTH = 512;

function messageHandler(message, socket) {
  message = message.substring(0, Math.min(MAX_STRING_LENGTH, message.length));
  
  const prefixRegex = /(^:\S+\s)/;
  const crlfRegex = /(\r\n)$/;
  const newRegex = new RegExp(prefixRegex.source + "|" + crlfRegex.source, "g");
  message = message.replace(newRegex, "");

  const lastArgRegex = /\s:.+/;

  const lastArgMatch = lastArgRegex.exec(message);

  if (lastArgMatch) {
    message = message.replace(lastArgMatch, "");
  }

  const components = message.split(" ");

  const command = components[0].toLowerCase();
  const commandHandler = commandsHandlers[command];

  const args = components.slice(1);

  if (!commandHandler) {
    unknownCommandErrorHandler(socket, command.toUpperCase());
    return;
  }

  if (
    !isUserRegistered(socket) &&
    ![handleNick, handleUser].includes(commandHandler)
  ) {
    notRegisteredErrorHandler(socket);
    return;
  }

  if (lastArgMatch) {
    const lastArg = lastArgMatch[0].replace(/^\s:/, "");
    args.push(lastArg);
  }

  commandHandler(socket, ...args);
}

export default messageHandler;
