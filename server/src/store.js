import getClientId from "./helpers/getClientId.js";

const users = {};
const pendingUsers = {};
const channels = {};

function getUser(socket) {
  const clientId = getClientId(socket);
  return users[clientId];
}

function addUser(
  socket,
  username,
  hostname,
  serverName,
  realname,
  pendingUser = {}
) {
  const clientId = getClientId(socket);

  users[clientId] = {
    socket,
    username,
    hostname,
    realname,
    serverName,
    ...pendingUser,
  };
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
  };
}

function removePendingUser(socket) {
  const clientId = getClientId(socket);
  delete pendingUsers[clientId];
}

function removeUserFromChannel(socket) {
  if (!getUser(socket)) {
    return;
  }

  const userChannel = getUserChannel(socket);

  const usersInChannel = getUsersIdInChannel(userChannel);
  const indexUser = usersInChannel.indexOf(getClientId(socket));

  channels.splice(indexUser, 1);
}

function getUsersIdInChannel(channelName) {
  return channels[channelName];
}

function getUserChannel(socket) {
  const user = getUser(socket);
  return user.channel;
}

function isUserInChannel(socket) {
  const user = getUser(socket);
  return !!user && !!user.channel;
}

export {
  users,
  pendingUsers,
  getUser,
  addPendingUser,
  addUser,
  removeUser,
  getPendingUser,
  removePendingUser,
  removeUserFromChannel,
  getUsersIdInChannel,
  getUserChannel,
  isUserInChannel,
};
