import { getChannelsInformations } from "../store.js";
import { serverName } from "../server.js";
import sendMessageToUser from "../helpers/sendMessageToUser.js";

export default function handleList(socket) {
  sendMessageToUser(serverName, socket, 321, ["Channel",  "Users"]);
  getChannelsInformations().forEach(({ channel, numberOfUsers }) => {
    sendMessageToUser(serverName, socket, 322, [
      String(channel),
      numberOfUsers,
    ]);
  });
  sendMessageToUser(serverName, socket, 323, ["End of /LIST"]);
}
