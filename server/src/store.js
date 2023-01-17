import getClientId from "./helpers/getClientId.js";
import sendMessageToChannel from "./helpers/sendMessageToChannel.js";

const users = {};
const pendingUsers = {};
const channels = {};

function getUser(socket) {
  const clientId = getClientId(socket);
  return users[clientId];
}

function addUser(
  socket,
  { nickname, username, hostname, serverName, realname }
) {
  const clientId = getClientId(socket);
  users[clientId] = {
    socket,
    nickname,
    hopcount: 0,
    username,
    hostname,
    realname,
    serverName,
  };
}

function updateUser(socket, params) {
  const clientId = getClientId(socket);
  users[clientId] = {
    ...users[clientId],
    ...params,
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

function addUserToChannel(socket, channelName) {
  const clientId = getClientId(socket);

  if (isUserInChannel(socket)) removeUserFromChannel(socket);

  if (channels[channelName] === undefined) channels[channelName] = [clientId];
  else channels[channelName].push(clientId);

  users[clientId].channel = channelName;
}

function removeUserFromChannel(socket, quitMessage = undefined) {
  const user = getUser(socket);
  if (!user || !isUserInChannel(socket)) {
    return;
  }

  const defaultMessage = `${user.nickname} saiu do canal`;
  const userChannel = getUserChannel(socket);

  sendMessageToChannel(
    socket,
    "QUIT",
    quitMessage || defaultMessage,
    userChannel
  );

  const usersInChannel = getUsersIdInChannel(userChannel);
  const clientId = getClientId(socket);
  const indexUser = usersInChannel.indexOf(clientId);

  channels[userChannel].splice(indexUser, 1);

  delete users[clientId].channel;

  if (channels[userChannel].length === 0) {
    delete channels[userChannel];
  }
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
  return user?.channel;
}

function userHasUserName(socket) {
  const user = getUser(socket);
  return user?.username;
}

function isUserRegistered(socket) {
  const user = getUser(socket);
  return user?.username && user?.nickname;
}

function isNickNameInUse(nickname) {
  let isNickNameInUse = false;
  Object.values(users).forEach((user) => {
    if (user.nickname === nickname) {
      isNickNameInUse = true;
    }
  });

  return isNickNameInUse;
}

function getChannelsInformations() {
  return Object.entries(channels).map(([channel, users]) => {
    return { channel, numberOfUsers: users.length };
  });
}

function channelExists(channelName) {
  return !!channels[channelName];
}

function getUserByNickname(nickname) {
  let target;
  Object.values(users).forEach((user) => {
    if (user.nickname === nickname) {
      target = user;
    }
  });
  return target;
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
  addUserToChannel,
  removeUserFromChannel,
  getUsersIdInChannel,
  getUserChannel,
  isUserInChannel,
  getChannelsInformations,
  isUserRegistered,
  isNickNameInUse,
  updateUser,
  channelExists,
  userHasUserName,
  getUserByNickname,
};
