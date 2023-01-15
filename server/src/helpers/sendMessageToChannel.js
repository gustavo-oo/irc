import { getUsersIdInChannel, users, getUser } from "../store.js";

export default function sendMessageToChannel(
  socket,
  command,
  message,
  channel
) {
  const usersId = getUsersIdInChannel(channel);
  const sendingUser = getUser(socket);
  usersId.forEach((userId) => {
    const user = users[userId];
    user.socket.write(`:${sendingUser.nickname} ${command} :${message}\r\n`);
  });
}
