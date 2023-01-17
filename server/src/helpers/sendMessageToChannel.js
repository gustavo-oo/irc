import { getUsersIdInChannel, users, getUser } from "../store.js";

export default function sendMessageToChannel(
  socket,
  command,
  message,
  channel,
  includeSender = true
) {
  const usersId = getUsersIdInChannel(channel);
  const sendingUser = getUser(socket);

  usersId.forEach((userId) => {
    const user = users[userId];
    if (!(user === sendingUser && !includeSender)) {
      user.socket.write(
        `:${sendingUser.nickname} ${command} ${
          message ? ":" + message : ""
        }\r\n`
      );
    }
  });
}
