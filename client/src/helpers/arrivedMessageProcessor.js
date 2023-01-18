function getSender(message) {
    return message.split(' ')[0].substring(1);
}

function getMessages(messages) {
    return messages.split('\r\n').filter(i => i);
}

function getStringMessage(messages) {
    const message = messages.substring(1).split(":")[1].replace("\r\n", "");
}

function messagesFormater(messagesString) {
    const messages = getMessages(messagesString);
    
    const messageObject = messages.map((message) => (
        {
            sender: getSender(message),
            message: getStringMessage(message),
            command: message.split(" ")[1],
            args: message.split(" "),
        }
    ))
    
    return messageObject;
}

export { getSender, getMessages, getStringMessage, messagesFormater };