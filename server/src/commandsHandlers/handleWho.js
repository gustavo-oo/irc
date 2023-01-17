import sendMessageToUser from "../helpers/sendMessageToUser.js";
import { getUsersIdInChannel, users } from "../store.js";
import { serverName } from "../server.js";
import { noSuchChannelErrorHandler } from "../helpers/errorHandlers.js";

export default function handleWho(socket, channel) {
    const usersIds = getUsersIdInChannel(channel);
    
    if (!usersIds) {
        noSuchChannelErrorHandler(socket, channel);
        return;
    }
    
    const whoReplyCode = 352;
    const endOfWhoReplyCode = 315;
    
    usersIds.forEach(userId => {
        const {
            nickname,
            hopcount,
            username,
            hostname,
            realname,
        } = users[userId];

        sendMessageToUser(
            serverName,
            socket,
            whoReplyCode,
            [channel, username, hostname, serverName, nickname, "H", `${hopcount} ${realname}`],
        );
    })
    
    const message = "End of /WHO list";
    sendMessageToUser(serverName, socket, endOfWhoReplyCode, [channel, message])
}