import { addUserToChannel } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";

export default function handleJoin(socket, channelName) {
  const joinMessage = `Bem vindo ao canal '${channelName}'`;

  addUserToChannel(socket, channelName);
  sendMessageToChannel(
    socket,
    "JOIN",
    joinMessage,
    channelName
  );
}
