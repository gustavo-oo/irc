const commandHandlers = {
    user: userHandler,
    join: channelHandler,
    who: channelHandler,
    part: channelHandler,
    dm: dmHandler,
}


export default function formatToIrc(message, channel) {
    const commandRegex = /^\/(\w+)/;
    const match = message.match(commandRegex);
    const command = match && match[1];
    if (command) {
        const commandHandler = commandHandlers[command];
        message = message.substring(1);
        if (commandHandler) {
            return commandHandler(message);
        }
        return defaultCommandHandler(message);
    }
    return defaultHandler(message, channel);
}

function defaultCommandHandler(message) {
    const args = message.split(" ");
    
    if (args.length > 1) {
        args[1] = ":" + args[1];
    }
    
    return args.join(" ");
}

// COMANDO: /user username realname
function userHandler(message) {
    const args = message.split(" ");
    
    if (args.length > 2) {
        args[2] = ":" + args[2];
    }

    args.splice(2, 0, "foo", "foo")    
    return args.join(" ");
}

function channelHandler(message) {
    const args = message.split(" ");
    
    const channel = args[1];
    
    if (channel.charAt(0) === "#" || channel.charAt(0) === "&") {
        return message;
    }
    
    args[1] = "#" + args[1];
    
    return args.join(" ");
}

function dmHandler(message) {
    const args = message.split(" ");
    args[0] = "privmsg";
    args[2] = ":" + args[2];
    return args.join(" ");
}

function defaultHandler(message, channel) {
    return `privmsg ${channel} ${message}`;
}