import { reverse } from 'dns';

export default async function getHostName(socket) {
    return new Promise((resolve, reject) => {
        reverse(socket.remoteAddress, (error, hostnames) => {
            if (error || hostnames.length === 0) {
                resolve(`${socket.remoteAddress}:${socket.remotePort}`);
                return;
            }
            
            resolve(hostnames[0]);
        })
    })
}