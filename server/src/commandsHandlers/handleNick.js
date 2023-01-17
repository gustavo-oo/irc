import { getUser, isNickNameInUse, addUser, updateUser } from "../store.js";

import { noNickNameGivenErrorHandler, nickNameInUseErrorHandler } from "../helpers/errorHandlers.js";
import validateNickName from "../helpers/validateNickName.js";

export default function handleNick(socket, nickname) {
  if(!nickname) {
    noNickNameGivenErrorHandler(socket);
    return;
  }
  
  if (!validateNickName(nickname)) {
    erroneusNickNameErrorHandler(socket, nickname);
    return;
  }
  
  if (isNickNameInUse(nickname)) {
    nickNameInUseErrorHandler(socket, nickname);
    return;
  }
  
  const user = getUser(socket);
  if (user) {
    updateUser(socket, { nickname });
    console.log(`Nickname updated to "${nickname}"`);
    return;
  }
  
  addUser(socket, { nickname });
  console.log(`Nickname updated to "${nickname}"`);
}
