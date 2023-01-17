import { addUserToChannel } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";

export default function handleJoin(socket, channelName) {
  addUserToChannel(socket, channelName);
  sendMessageToChannel(
    socket,
    "JOIN",
    channelName,
    channelName
  );
}
