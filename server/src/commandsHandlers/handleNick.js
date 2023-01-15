import { getUser, addPendingUser } from "../store.js"

export default function handleNick(socket, nickname) {
    const user = getUser(socket)
    if (user) {
        user.nickname = nickname;
        user.hopcount = 0;
        return;
    }
    
    addPendingUser(socket, nickname, 0);
}