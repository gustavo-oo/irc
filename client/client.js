import { createConnection } from 'net';

const client = createConnection({ port: 6667 }, () => {
  console.log('connected to server!');
});

// setInterval(() => {
client.write(':Eu123 nick teste\r\n');

setTimeout(() => {
  client.write(':a user a a :Gustavo Pereira')
})
// }, 1000)

client.on('data', (data) => {
  console.log(data.toString());
  // client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});