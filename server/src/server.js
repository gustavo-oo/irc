import { createServer } from 'net';

import messageHandler from './commandsHandlers/messageHandler.js';
import { pendingUsers, users } from "./store.js"

const server = createServer((socket) => {
  console.log('client connected');
    
  socket.on('close', () => {
    console.log('client disconnected');
    const clientId = socket.remoteAddress;
    delete pendingUsers[clientId];
    const user = users[clientId];
    
    if (user) {
      user.socket = undefined;
      user.nickname = undefined;
    }
  });
  
  socket.write('Welcome to the IRC server!\r\n');

  socket.on('data', (data) => {
    messageHandler(data.toString(), socket);
  });
  
  socket.on('error', (err) => {
    console.log('Server error: ' + err);
  });
});

server.listen(6667, "0.0.0.0", () => {
  console.log('server bound');
});
