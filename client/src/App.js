import React, { useState, useEffect } from 'react';
import processMessage from './helpers/processChatMessage';

const App = ({ socket }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit('message', processMessage(message));
      setMessage('');
    };
    
    useEffect(() => {
      if (socket) {
        socket.on('connect', () => {
          console.log('Connected to the server');
        });
    
        socket.on('end', () => {
            console.log('Disconnected from the server');
        });
    
        socket.on('message', (data) => {
            console.log('Received data:', data);
        });
      }
      return () => {
        if (socket) {
          socket.off('message');
        }
      };
    }, [socket]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                        }
                    }}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
};

export default App;