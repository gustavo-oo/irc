export default function getClientId(socket) {
    return socket.remoteAddress;
}