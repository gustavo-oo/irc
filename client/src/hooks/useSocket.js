import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const url = "172.23.64.1";

export function useSocket(open) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(`${url}:8000`, {
        transports: ['websocket'],
        origins: 'http://localhost:3000'
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [open]);
  
  function disconnect(){
    if(socket) socket.disconnect();
  }

  function connect(){
    setSocket(io(`${url}:8000`, {
      transports: ['websocket'],
      origins: 'http://localhost:3000'
    }));
  }

  return { socket, connect, disconnect };
  
  
}