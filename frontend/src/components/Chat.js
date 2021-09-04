import avatar from '../images/avatar.png'
import socket from './Socket'
import { useState, useEffect } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'

const Chat = () => {
    const [messages, setMessages] = useState("");
    const [inputMessage, setInputMessage] = useState("")
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const { _id, username, phoneNumber } = user

    useEffect(() => {
        socket.emit('connected', user)
    }, [])
    
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

    return(
        <section className="main__chat-section">
                <nav className="main__chat-navbar navbar">
                    <div className="navbar__contact">
                        <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                        <div className="navbar__info">
                            <p className="navbar__username">Contacto1</p>
                            <p className="navbar__timeago">Ultima vez hace 3032</p>
                        </div>
                    </div>
                    <div className="navbar__tools">
                        <div className="navbar__search">
                            <i className="fas fa-search"></i>

                        </div>
                        <div className="navbar__settings">
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </nav>
                <div className="main__messages-section messages">
                <ReactScrolleableFeed>
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
            </section>
    )
}

export default Chat