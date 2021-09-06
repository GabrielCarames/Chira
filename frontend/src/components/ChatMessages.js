import avatar from '../images/avatar.png'
import socket from './Socket'
import { useState, useEffect } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'
import moment from 'moment'

const ChatMessages = ({chat, setChat, messages, setMessages}) => {
    const [inputMessage, setInputMessage] = useState("")
    // const [messages, setMessages] = useState("");
    // const [ chat, setChat ] = useState()
    const user = JSON.parse(localStorage.getItem('userLogged'))

    useEffect(() => {
        socket.on("mensajes", (newMessage) => {
          setMessages([...messages, newMessage]);
        });
        return () => {
          socket.off();
        };
    }, [messages]);    

    const messageInput = (message) => {
        socket.emit("mensaje", user, message);
    };

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                const input = document.getElementsByClassName('main__input');
                if (input[0] === document.activeElement) {
                    event.preventDefault();
                    if(inputMessage!== '') {
                        messageInput(inputMessage)
                        input[0].value = ''
                    }
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
      }, [inputMessage]);

    return (
        <>
            <div className="main__messages-section messages">
                <ReactScrolleableFeed>
                    {
                        chat && chat[0].messages.map((message) => {
                            return (
                                message.user.username === user.username ?
                                <div className="messages-user-logged-messages" key={message._id}>
                                    <div className="messages-message-container">
                                        <span className="messages__username">{message.user.username}</span>
                                        <p className="messages__message">{message.message}</p>
                                        <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                                    </div>
                                </div>
                            : 
                            <div className="messages-contact-messages">
                                <div className="messages-message-container">
                                    <span className="messages__username">{message.user.username}</span>
                                    <p className="messages__message">{message.message}</p>
                                    <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                                </div>
                            </div>
                            )
                        })
                    }
                    {messages && messages.map((message) => {
                        return (
                            message.username === user.username ?
                                <div className="messages-user-logged-messages">
                                    <div className="messages-message-container">
                                        <span className="messages__username">{message.username}</span>
                                        <p className="messages__message">{message.message}</p>
                                        <h6 className="messages__timeago">30:43hs</h6>
                                    </div>
                                </div>
                            : 
                            <div className="messages-contact-messages">
                                <div className="messages-message-container">
                                    <span className="messages__username">{message.username}</span>
                                    <p className="messages__message">{message.message}</p>
                                    <h6 className="messages__timeago">30:43hs</h6>
                                </div>
                            </div>
                        )
                    })}
                </ReactScrolleableFeed>
            </div>
            <div className="main__input-section" >
                <input className="main__input" id="cosa" type="text" name="message" id="" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} />
            </div>
        </>
    )
}

export default ChatMessages