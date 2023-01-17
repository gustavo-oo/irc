import { removeUserFromChannel, getUserChannel, channelExists } from "../store.js";
import {
  needMoreParamsErrorHandler,
  noSuchChannelErrorHandler,
  notOnChannelErrorHandler
} from "../helpers/errorHandlers.js";

export default function handlePart(socket, channelsNames) {
  if(!channelsNames){
    needMoreParamsErrorHandler(socket, "PART");
    return;
  }

  channelsNames.split(',').map((channelName) => {
    if (getUserChannel(socket) === channelName) {
      removeUserFromChannel(socket);
    } else if(channelExists(channelName)) {
      notOnChannelErrorHandler(socket, channelName);
    } else {
      noSuchChannelErrorHandler(socket, channelName);
    }
  })
}
  