import { users, pendingUsers, getPendingUser, addUser, removePendingUser } from '../store.js';
import getHostName from '../helpers/getHostName.js';

export default async function handleUser(socket, username, ignore1, ignore2, realname) {
    const pendingUser = getPendingUser(socket);
    const hostname = await getHostName(socket);

    if (pendingUser) {
        addUser(socket, username, hostname, "localhost", realname, pendingUser);
        removePendingUser(socket);
        return;
    }
    
    addUser(socket, username, hostname, realname, { nickname: "*" });
}