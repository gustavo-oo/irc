function getSender(message) {
    return message.split(' ')[0].substring(1);
}

function getMessages(messages) {
    return messages.split('\r\n').filter(i => i);
}

function getStringMessage(messages, command) {
    if (command === "321") {
        return "Canais:";
    }
    
    if (command === "322") {
        return messages.split(" ")[3] + " " + messages.split(" ")[4].replace(":", "- ");
    }
    
    if (command === "352") {
        return messages.split(" ")[4];
    }
    
    const message = messages.substring(1).split(":")[1].replace("\r\n", "");
    return message;
}

function messagesFormater(messagesString, nickname) {
    const messages = getMessages(messagesString);
    console.log(messages);
    
    const messageObject = messages.map((message) => {
        const command = message.split(" ")[1]
        return ({
            sender: getSender(message),
            message: getStringMessage(message, command),
            command,
            args: message.split(" "),
            isPrivate: command === "PRIVMSG" && nickname === message.split(" ")[2],
        })
    })
    
    return messageObject;
}

export { getSender, getMessages, getStringMessage, messagesFormater };