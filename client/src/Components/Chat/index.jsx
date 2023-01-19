import './styles.css';
import { useState, useEffect } from 'react';
import formatToIrc from '../../helpers/formatToIrc';
import { messagesFormater } from '../../helpers/arrivedMessageProcessor';
import replyCodes from '../../enum/replyCodes';
import MsnIcon from '../MsnIcon/MsnIcon';
import msnIconImg from "../../msn_icon.png"

const ChatScreen = ({messages, setMessages, onSubmit, socket, currentUser }) => {

  const [newMessage, setNewMessage] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);

  const submitOnEnter = (event) => {
    if (event.which === 13 && !event.shiftKey) {
      if (!event.repeat) {
        const newEvent = new Event("submit", { cancelable: true });
        event.target.form.dispatchEvent(newEvent);
        sendMessage(event);
      }

      event.preventDefault();
    }
  };

  const formatMessage = (message, sender, isPrivate = false) => {
    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return { time: time, sender: sender || currentUser, message: message, isPrivate };
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if(!!newMessage){
      onSubmit(formatToIrc(newMessage, currentChannel));
      setMessages(messages => [...messages, formatMessage(newMessage)]);
      setNewMessage("");
    }  
  }

  useEffect(() => {
    socket.on('message', (data) => {
        const formattedMessages = messagesFormater(data, currentUser);
        formattedMessages.forEach(({message, sender, command, args, isPrivate}) => {
            if (command === replyCodes.join) {
              setCurrentChannel(args[4]);
            }
            
            console.log({message, sender, command, args, isPrivate});
            
            if (command === "QUIT" && sender === currentUser) {
              setCurrentChannel(null);
            }
            
            const formattedMessage = formatMessage(message, sender, isPrivate);
            setMessages(messages => [...messages, formattedMessage]);
        })
    })
    
    return () => {
      if (socket) {
          socket.off('message');
      }
    };
  }, [socket]);

  useEffect(() => {
      let object = document.getElementById("messages");
      object.scrollTop = object.scrollHeight;
  }, [messages])

  return (
    <div className="chat-screen">
      <div className="header">
        <img alt="" src={msnIconImg} width="50px"></img>
        <h1>{currentChannel || "Bem vindo ao chat"}</h1>
      </div>
      <div class="bar__bottom">
        <button class="action__button" title="Add a friend to the conversation">
          ➕
        </button>
        <button class="action__button" title="Share a file">
          🗂
        </button>
        <button class="action__button" title="Start a video call">
          🎥
        </button>
        <button class="action__button" title="Start a phone call">
          📞
        </button>
        <button class="action__button" title="Share some music">
          🎵
        </button>
        <button class="action__button" title="Start a game">
          🎲
        </button>
        <button class="action__button" title="Block user">
          🚷
        </button>
      </div>
      <div className="messages-container">
        <div id="messages" className="messages">
          {messages.map((message, key) => {
            return (
              <div key={key}>
                <span className="sender-info">{`[${message.time}] ${message.sender} diz:`}</span>
                <p style={ message.isPrivate ? { color: 'red' } : {}} >{message.message}</p>
              </div>
            );
          })}
        </div>
        <div className="send-message">
          <div className="image-container">
            <MsnIcon />
          </div>
          <div className="formConteiner">
            <div class="send-message__buttons">
              <button class="send-message__button" title="Send an emoticon">
                😊
              </button>
              <button class="send-message__button" title="Send a wink">
                😉
              </button>
              <button
                class="send-message__button"
                id="nudge-button"
                title="Send a nudge"
              >
                🥴
              </button>
              <button class="send-message__button" title="Send a voice message">
                📢
              </button>
              <button class="send-message__button" title="Change the font">
                🔤
              </button>
              <button class="send-message__button" title="Change text color">
                🎨
              </button>
              <button class="send-message__button" title="Send an image">
                🏞
              </button>
              <button class="send-message__button" title="Send a gift">
                🎁
              </button>
            </div>
            <form id="form" onSubmit={(e) => sendMessage(e)}>
              <textarea
                className="textArea"
                id="textarea"
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                rows={4}
                onKeyDown={submitOnEnter}
                value={newMessage}
                placeholder="Digite uma mensagem..."
              ></textarea>
              <div className="buttonConteiner">
                <button className="submit-button" type="Submit">
                  Enviar
                </button>
                <button onClick={() => socket.emit("message", "QUIT")} className="submit-button">
                  Sair
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
