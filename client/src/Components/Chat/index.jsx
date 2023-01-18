import './styles.css';
import { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi'

const ChatScreen = ({channelName}) => {
    const [messages, setMessages] = useState([{time: '11:02', sender: "Servidor", message: "Welcome to IRC Server"}]);
    const [newMessage, setNewMessage] = useState("");

    const currentUser = "David";

    const submitOnEnter = (event) => {
        if(event.which === 13 && !event.shiftKey) {
            if (!event.repeat) {
                const newEvent = new Event("submit", {cancelable: true});
                event.target.form.dispatchEvent(newEvent);
                sendMessage(event);
            }
            
            event.preventDefault();
        }
    }

    const formatMessage = (message) => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return ({time: time, sender: currentUser, message: message});
    }

    const sendMessage = (e) => {
        e.preventDefault();

        if(!!newMessage){
            setMessages(messages => [...messages, formatMessage(newMessage)]);
            setNewMessage("");
        }
    }

    useEffect(() => {
        let object = document.getElementById("messages");
        object.scrollTop = object.scrollHeight;
    }, [messages])

    return(
        <div className='chat-screen'>
            <div className='header'>
                <h1>{channelName || "Bem vindo ao chat"}</h1>
                <h2>Sair</h2>
            </div>
            <div className='messages-container'>
                <div id="messages" className='messages'>
                    {
                        messages.map((message, key) => {return(
                            <div key={key}>
                                <span className='sender-info'>{`[${message.time}] ${message.sender} diz:`}</span>
                                <p>{message.message}</p>
                            </div>
                        )})
                    }
                </div>
                <div className='send-message'>
                    <div className='image-container'/>
                    <form id="form" onSubmit={(e) => sendMessage(e)}>
                        <textarea
                            id="textarea" onChange={e => setNewMessage(e.target.value)}
                            type="text" rows={4} onKeyDown={submitOnEnter} value={newMessage}
                            placeholder='Digite uma mensagem...' >
                        </textarea>
                        <button className="submit-button" type='Submit'><FiSend size={18}/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatScreen;
