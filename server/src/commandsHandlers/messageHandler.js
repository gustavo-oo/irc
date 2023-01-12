import handleNick from "./handleNick.js";
import handleUser from "./handleUser.js";

const commandsHandlers = {
    "nick": handleNick,
    "user": handleUser,
    // "quit",
    // "join",
    // "part",
    // "list",
    // "privmsg",
    // "who"
};

function messageHandler(message, socket) {
    // desconsiderando que existe um prefixo :
    const components = message.replace(/(\r\n)$/, "").split(" ");
    const command = components[0].toLowerCase();
    const commandHandler = commandsHandlers[command];
    const args = components.slice(1);
    commandHandler(socket, ...args);
}

export default messageHandler;