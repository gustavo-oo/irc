import { serverName } from "../server.js"
import sendMessageToUser from "../helpers/sendMessageToUser.js"

function notRegisteredErrorHandler(socket) {
    const errorCode = 451;
    const message = "You have not registered";
    sendMessageToUser(serverName, socket, errorCode, [message]);
}

function noNickNameGivenErrorHandler(socket) {
    const errorCode = 431;
    const message = "No nickname given";
    sendMessageToUser(serverName, socket, errorCode, [message]);
}

function nickNameInUseErrorHandler(socket, nick) {
    const errorCode = 433;
    const message = "Nickname is already in use";
    sendMessageToUser(serverName, socket, errorCode, [nick, message]);
}

function unknownCommandErrorHandler(socket, command) {
    const errorCode = 421;
    const message = "Unknown command";
    sendMessageToUser(serverName, socket, errorCode, [command, message]);
}

function needMoreParamsErrorHandler(socket, command) {
    const errorCode = 461;
    const message = "Not enough parameters";
    sendMessageToUser(serverName, socket, errorCode, [command, message]);
}

function notOnChannelErrorHandler(socket, channel) {
    const errorCode = 442;
    const message = "You're not on that channel";
    sendMessageToUser(serverName, socket, errorCode, [channel, message]);
}

function noSuchChannelErrorHandler(socket, channel) {
    const errorCode = 403;
    const message = "No such channel";
    sendMessageToUser(serverName, socket, errorCode, [channel, message]);
}

function erroneusNickNameErrorHandler(socket, nickname) {
    const errorCode = 432;
    const message = "Erroneus nickname";
    sendMessageToUser(serverName, socket, errorCode, [nickname, message]);
}

function alreadyRegisteredErrorHandler(socket) {
    const errorCode = 462;
    const message = "You may not reregister";
    sendMessageToUser(serverName, socket, errorCode, [message])
}

export {
    notRegisteredErrorHandler,
    noNickNameGivenErrorHandler,
    nickNameInUseErrorHandler,
    unknownCommandErrorHandler,
    needMoreParamsErrorHandler,
    notOnChannelErrorHandler,
    noSuchChannelErrorHandler,
    erroneusNickNameErrorHandler,
    alreadyRegisteredErrorHandler,
};