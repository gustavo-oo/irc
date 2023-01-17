import { addUserToChannel, usersInChannel } from "../store.js";
import sendMessageToChannel from "../helpers/sendMessageToChannel.js";
import sendMessageToUser from "../helpers/sendMessageToUser.js";
import { serverName } from "../server.js";
import { needMoreParamsErrorHandler, noSuchChannelErrorHandler } from "../helpers/errorHandlers.js";

export default function handleJoin(socket, channelName) {

  if(!channelName){
    needMoreParamsErrorHandler(socket, "JOIN");
    return;
  }

  if(
    (channelName[0] !== '&' && channelName[0] !== '#') || channelName.length > 9 ||
    channelName.includes(" ") || channelName.includes(",")
  ) {
    noSuchChannelErrorHandler(socket, channelName);
    return;
  }

  addUserToChannel(socket, channelName);
  sendMessageToChannel(
    socket,
    "JOIN",
    channelName,
    channelName
    );
  const userList = usersInChannel(channelName).toString().replace(',', ' ');
  sendMessageToUser(serverName, socket, 353, [`= ${channelName}`, userList]);
  sendMessageToUser(serverName, socket, 366, [channelName, "End of /NAMES list"]);
}
