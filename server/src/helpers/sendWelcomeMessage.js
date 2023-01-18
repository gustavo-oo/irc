import { serverName } from "../server.js";
import sendMessageToUser from "./sendMessageToUser.js"

export default function sendWelcomeMessage(socket) {
    sendMessageToUser(serverName, socket, 375, [`- Message of the day - `]);
    sendMessageToUser(serverName, socket, 372, [`- Água mole, pedra dura`]);
    sendMessageToUser(serverName, socket, 376, ["End of /MOTD command"]);
}