import { getPendingUser, addUser, removePendingUser } from "../store.js";
import getHostName from "../helpers/getHostName.js";
import { serverName } from "../server.js";

export default async function handleUser(
  socket,
  username,
  ignore1,
  ignore2,
  realname
) {
  const hostname = await getHostName(socket);
  addUser(socket, { username, hostname, serverName, realname });
  console.log(`Usuário "${username}@${hostname} :${realname}" adicionado`)
}
