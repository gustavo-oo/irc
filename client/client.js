import { createConnection } from "net";
import { createInterface } from "readline";

const client = createConnection({ port: 6667, host: "192.168.0.199" }, () => {
  console.log("connected to server!");
});

client.on("data", (data) => {
  console.log(data.toString());
  // client.end();
});

client.on("end", () => {
  console.log("disconnected from server");
});

const commandInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askCommand() {
  commandInterface.question("", (answer) => {
    client.write(answer);
    askCommand();
  });
}

askCommand();
