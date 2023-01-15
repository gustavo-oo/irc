import getClientId from "./getClientId.js";

import { reverse } from 'dns';

export default async function getHostName(socket) {
    const clientId = getClientId(socket);

    return new Promise((resolve, reject) => {
        reverse(clientId, (error, hostnames) => {
            if (error || hostnames.length === 0) {
                resolve(clientId);
                return;
            }
            
            resolve(hostnames[0]);
        })
    })
}