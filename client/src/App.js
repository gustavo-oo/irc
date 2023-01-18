import React, { useState, useEffect } from 'react';
import './App.css';
import ChatScreen from './Components/Chat';
import "./Globals.css";
import HomePage from "./pages/HomePage/HomePage";
import replyCodes from './enum/replyCodes';
import { useSocket } from './hooks/useSocket';

function App() {
  const { socket, connect } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [arrivedMessages, setArrivedMessages] = useState(null);
  const [messages, setMessages] = useState([]);
  const [nick, setNick] = useState("");

  
  function handleSubmit(message) {
    socket.emit("message", message);
  }
  
  const pages = [
    <HomePage
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      onSubmit={handleSubmit}
      nick={nick}
      setNick={setNick}
    />,
    <ChatScreen
      messages={messages}
      setMessages={setMessages}
      socket={socket}
      arrivedMessages={arrivedMessages}
      setArrivedMessages={setArrivedMessages}
      channelName={currentChannel}
      onSubmit={handleSubmit}
      currentUser={nick}
    />
  ];
  
  function resetChat() {
    setCurrentPage(0);
    setIsLoading(false);
    connect();
    setMessages([]);
  }
  
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to the server");
      });
      
      socket.on('disconnect', () => {
        console.log('Disconnected from the server');
        resetChat();
      });
  
      socket.on('message', (data) => {
        // setArrivedMessages(data);
        const messages = data.split("\r\n").filter(i => i);
        messages.forEach(message => {
          const args = message.split(" ");
          // console.log(args);
          const replyCode = args[1];
          
          if (replyCode === replyCodes.logged) {
            setCurrentPage(1);
          }
          
          if (replyCode === replyCodes.join) {
            setCurrentChannel(args[4]);
          }
        })
      });
    }
    return () => {
      if (socket) {
        // socket.off('message');
      }
    };
  }, [socket]);
    
  return (
    <div className="App">
      {pages[currentPage]}
    </div>
  );
};

export default App;
