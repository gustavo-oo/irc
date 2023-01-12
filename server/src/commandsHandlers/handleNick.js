import { pendingUsers } from "../store.js"

export default function handleNick(socket, nickname) {    
    const clientId = socket.remoteAddress;
    pendingUsers[clientId] = {
        nickname,
        socket,
        hopcount: 0,
    };
}