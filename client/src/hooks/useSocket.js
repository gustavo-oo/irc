import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export function useSocket(open) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://192.168.0.199:8000', {
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
    setSocket(io('http://192.168.0.199:8000', {
        transports: ['websocket'],
        origins: 'http://localhost:3000'
    }));
  }

  return { socket, connect, disconnect };
  
  
}