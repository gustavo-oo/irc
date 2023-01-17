import { removeUserFromChannel, getUserChannel, channelExists, getUser } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";
import { needMoreParamsErrorHandler, noSuchChannelErrorHandler, notOnChannelErrorHandler } from "../helpers/errorHandlers.js";

export default function handlePart(socket, channelsNames) {
  if(!channelsNames){
    needMoreParamsErrorHandler(socket, "PART");
    return;
  }

  channelsNames.split(',').map((channelName) => {
    if (getUserChannel(socket) === channelName) {
      removeUserFromChannel(socket);
    } else if(channelExists(channelName)) {
      notOnChannelErrorHandler(socket, "PART", channelName);
    } else {
      noSuchChannelErrorHandler(socket, "PART", channelName);
    }
  })
}
  