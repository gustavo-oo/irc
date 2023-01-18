import './styles.css';
import { useState, useEffect, useCallback } from 'react';
import { FiSend } from 'react-icons/fi'
import formatToIrc from '../../helpers/formatToIrc';
import { getSender, getMessages, getStringMessage, messagesFormater } from '../../helpers/arrivedMessageProcessor';
import replyCodes from '../../enum/replyCodes';

const ChatScreen = ({messages, setMessages, onSubmit, arrivedMessages, setArrivedMessages, socket }) => {
    const [newMessage, setNewMessage] = useState("");
    const [currentChannel, setCurrentChannel] = useState(null);

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

    const formatMessage = (message, sender = null) => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return ({time: time, sender: sender || currentUser, message: message});
    }

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
            const formattedMessages = messagesFormater(data);
            formattedMessages.forEach(({message, sender, command, args}) => {
                console.log(command);
                if (command === replyCodes.join) {
                    setCurrentChannel(args[4]);
                }
                
                const formattedMessage = formatMessage(message, sender);
                setMessages(messages => [...messages, formattedMessage]);
            })
        })
        
        return () => {
            if (socket) {
                socket.off('message');
            }
        };
    }, [socket]);
    
    // useEffect(() => {
    //     if (arrivedMessages) {
            
    //         setArrivedMessages(null);
            
    //         messages.forEach(message => {
    //             const sender = getSender(message);
    //             setMessages(messages => [...messages, formatMessage(arrivedMessages, sender)]);
    //         })
    //     }
    // }, [arrivedMessages, setArrivedMessages, setMessages, formatMessage, messages, newMessage])

    useEffect(() => {
        let object = document.getElementById("messages");
        object.scrollTop = object.scrollHeight;
    }, [messages])

    return(
        <div className='chat-screen'>
            <div className='header'>
                <h1>{currentChannel || "Bem vindo ao chat"}</h1>
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
