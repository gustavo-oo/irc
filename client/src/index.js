import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import io from 'socket.io-client';

const socket = io('http://192.168.0.199:8000', {
  transports: ['websocket'],
  origins: 'http://localhost:3000'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode enabled={false}>
    <App socket={socket} />
  </React.StrictMode>
);