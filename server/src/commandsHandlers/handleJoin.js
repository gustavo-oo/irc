import { addUserToChannel } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";

export default function handleJoin(socket, channelName, joinMessage) {
  const defaultMessage = `Bem vindo ao canal '${channelName}'`;

  addUserToChannel(socket, channelName);
  sendMessageToChannel(
    socket,
    "JOIN",
    joinMessage || defaultMessage,
    channelName
  );
}
