import { removeUserFromChannel, getUserChannel, channelExists } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";
import sendMessageToUser from "../helpers/sendMessageToUser.js"
import { serverName } from "../server.js";

export default function handlePart(socket, channelsNames, partMessage) {
  const defaultMessage = "Tchau";

  channelsNames.split(',').map((channelName) => {
    if (getUserChannel(socket) === channelName) {
      sendMessageToChannel(
        socket,
        "PART",
        partMessage || defaultMessage,
        getUserChannel(socket)
      );
      removeUserFromChannel(socket);
    } else if(channelExists(channelName)) {
      sendMessageToUser(
        serverName, socket, 442, [`${channelName} :You're not on that channel`]
      );
    } else {
      sendMessageToUser(
        serverName, socket, 402, [`${channelName} :No such channel`]
      );
    }
  })
}
  