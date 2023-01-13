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
    const prefixRegex = /(^:\S+\s)/;
    const crlfRegex = /(\r\n)$/;
    const newRegex = new RegExp(prefixRegex.source + "|" + crlfRegex.source, "g")
    message = message.replace(newRegex, "");
    
    const lastArgRegex = /\s:.+/; 
    
    const lastArgMatch = lastArgRegex.exec(message);
    
    if (lastArgMatch) {
        message = message.replace(lastArgMatch, "");
    }
    
    const components = message.split(" ");
    
    const command = components[0].toLowerCase();
    const commandHandler = commandsHandlers[command];

    const args = components.slice(1);
    
    if (lastArgMatch) {
        const lastArg = lastArgMatch[0].replace(/^\s:/, "");
        args.push(lastArg);
    }

    commandHandler(socket, ...args);
}

export default messageHandler;