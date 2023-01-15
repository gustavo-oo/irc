import { getUser } from "../store.js";

export default function sendMessageToUser(
  senderName,
  receiverSocket,
  command,
  args
) {
  let message = args[0];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    message += " ";

    if (i == args.length - 1) {
      message += ":";
    }

    message += arg;
  }

  const user = getUser(receiverSocket);

  receiverSocket.write(
    `:${senderName} ${command} ${user?.nickname || "*"} :${message}\r\n`
  );
}
