import  { createServer } from "http";
import cors from 'cors';
import { Server } from "socket.io";
import  { createConnection } from "net";

const server = createServer(cors());
const io = new Server(server, { origin: "*" });

io.on("connection", (socket) => {
    const client = createConnection({ port: 6667, host: "172.23.64.1" }, () => {
        console.log("connected to server!");
    });
    
    client.on("end", () => {
      socket.disconnect();
    })

    socket.on("disconnect", () => {
      client.end();
      console.log("client disconnected");
    });

    socket.on("message", (data) => {
      console.log(data);
      client.write(data);
    });
    
    client.on("data", (data) => {
      socket.emit("message", data.toString());
    });

    socket.on("error", (err) => {
        client.emit('error', new Error('Connection closed'));
        // client.end();
        console.log("client disconnected");
    });
});

server.listen(8000, "0.0.0.0", () => {
  console.log("server bound");
});