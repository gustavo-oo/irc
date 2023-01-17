import { removeUserFromChannel, getUserChannel, channelExists } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";
import sendMessageToUser from "../helpers/sendMessageToUser.js"
import { serverName } from "../server.js";

export default function handlePart(socket, channelsNames) {
  const defaultMessage = "Tchau";

  if(!channelsNames){
    sendMessageToUser(
      serverName, socket, 461, ["PART", "Not enough parameters"]
    );
    return;
  }

  channelsNames.split(',').map((channelName) => {
    if (getUserChannel(socket) === channelName) {
      sendMessageToChannel(
        socket,
        "PART",
        defaultMessage,
        getUserChannel(socket)
      );
      removeUserFromChannel(socket);
    } else if(channelExists(channelName)) {
      sendMessageToUser(
        serverName, socket, 442, [channelName, "You're not on that channel"]
      );
    } else {
      sendMessageToUser(
        serverName, socket, 402, [channelName, "No such channel"]
      );
    }
  })
}
  