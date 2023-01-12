import { reverse } from 'dns';

import { pendingUsers } from "../store.js"
import { users } from '../store.js';

export default function handleUser(socket, ignore1, ignore2, realname) {
    const clientId = socket.remoteAddress;
    const user = pendingUsers[clientId];
    
    if (user) {
        reverse(clientId, (error, hostnames) => {
            let hostname = clientId;

            if (!error && hostnames.length !== 0) {
                hostname = hostnames[0];
            }

            users[clientId] = {
                ...user,
                realname,
                hostname,
            };
            
            delete pendingUsers[clientId];
        })
    }
}

export { users };