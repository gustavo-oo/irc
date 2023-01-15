import getClientId from "./helpers/getClientId.js";

const users = {};
const pendingUsers = {};
const channels = {};

function getUser(socket) {
    const clientId = getClientId(socket);
    return users[clientId];
}

function addUser(socket, username, hostname, serverName, realname, pendingUser = {}) {
    const clientId = getClientId(socket);
    
    users[clientId] = {
        socket,
        username,
        hostname,
        realname,
        serverName,
        ...pendingUser,
    }
}

function removeUser(socket) {
    const clientId = getClientId(socket);
    delete users[clientId];
}

function getPendingUser(socket) {
    const clientId = getClientId(socket);
    return pendingUsers[clientId];
}

function addPendingUser(socket, nickname, hopcount) {
    const clientId = getClientId(socket);
    pendingUsers[clientId] = {
        socket,
        nickname,
        hopcount,
    }
}

function removePendingUser(socket) {
    const clientId = getClientId(socket);
    delete pendingUsers[clientId];
}

export {
    users,
    pendingUsers,
    getUser,
    addPendingUser,
    addUser,
    removeUser,
    getPendingUser,
    removePendingUser
};