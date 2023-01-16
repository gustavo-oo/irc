import { serverName } from "../server.js"
import sendMessageToUser from "../helpers/sendMessageToUser.js"

function notRegisteredErrorHandler(socket) {
    const errorCode = 451;
    const message = "You have not registered";
    sendMessageToUser(serverName, socket, errorCode, [message])
}

function noNickNameGivenErrorHandler(socket) {
    const errorCode = 431;
    const message = "No nickname given";
    sendMessageToUser(serverName, socket, errorCode, [message]);
}

function nickNameInUseErrorHandler(socket, nick) {
    const errorCode = 433;
    const message = "Nickname is already in use";
    sendMessageToUser(serverName, socket, errorCode, [nick, message])
}

function unknownCommandErrorHandler(socket, command) {
    const errorCode = 421;
    const message = "Unknown command";
    sendMessageToUser(serverName, socket, errorCode, [command, message]);
}

export {
    notRegisteredErrorHandler,
    noNickNameGivenErrorHandler,
    nickNameInUseErrorHandler,
    unknownCommandErrorHandler,
};