const net = require('net');

const server = net.createServer((socket) => {
  const clientId = socket.remoteAddress;
  
  console.log('client connected');
  
  socket.on('end', () => {
    console.log('client disconnected');
  });
  
  socket.write('Welcome to the IRC server!\r\n');

  socket.on('data', (data) => {
    console.log(`Received data from client ${clientId}: ${data}`);
  });
  
  socket.on('error', (err) => {
    console.log(err);
  });
});

server.listen(6667, () => {
  console.log('server bound');
});
