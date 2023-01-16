import { getUser } from "../store.js";

export default function sendMessageToUser(
  senderName,
  receiverSocket,
  command,
  args,
) {
  let message = args[0];
  for (let i = 1; i < args.length; i++) {    
    message += " ";
    
    if (i == args.length - 1) {
      message += ":";
    }
    
    const arg = args[i];
    message += arg;
  }
  
  if (args.length == 1) {
    message = ":" + message;
  }
  
  const user = getUser(receiverSocket);

  receiverSocket.write(`:${senderName} ${command} ${user?.nickname || "*"} ${message}\r\n`);
}
