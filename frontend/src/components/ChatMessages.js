import { useState, useEffect } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'
import send from '../images/send.png'
import socket from './Socket'
import moment from 'moment'

const ChatMessages = ({chat, messages, setMessages, goToMessage, setShowIcon}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)

    useEffect(() => {
        socket.on("mensajes", async (newMessage) => {
            const receptorUser = chat[0].users.filter((userInChat) => userInChat._id !== user._id)
            if(newMessage.username === user.username) socket.emit('newMessageNotification', newMessage, receptorUser)
            setMessages([...messages, newMessage]);
        });
        return () => {
          socket.off();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    const messageInput = message => socket.emit("mensaje", user, message)

    useEffect(() => {
        if(inputMessage) socket.emit('typing', user.username)
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                const input = document.getElementsByClassName('main__input');
                if (input[0] === document.activeElement) {
                    event.preventDefault();
                    verifyAndSendInputValue(input[0].value)
                    input[0].value = ''
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputMessage]);

    const verifyAndSendInputValue = input => input !== '' && messageInput(input)

    const inputOnSubmit = (e) => {
        e.preventDefault()
        const inputValue = e.target[0].value
        verifyAndSendInputValue(inputValue)
        e.target[0].value = ''
    }

    const timeoutFunction = () => setUsertyping(false)

    useEffect(() => {
        let timeout;
        socket.on('typing', (username) => {
            setUsertyping(username)
            clearTimeout(timeout);
            timeout = setTimeout(timeoutFunction, 2000); //Basicamente el clear es retardar a la ejecucion del setTimeOut
        })
    }, [])

    const seenMessages = () => {
        messages && console.log("me viste", messages[0].username, user.username)
        chat && console.log("chat", chat[0].messages[chat[0].messages.length -1].user.username, user.username)
        if(chat && chat[0].messages[chat[0].messages.length -1].user._id !== user._id) {
            const userToAdviseSeenMessage = chat[0].messages[chat[0].messages.length -1].user
            setShowIcon(false)
            socket.emit('seenMessage', userToAdviseSeenMessage)
        }
    }

    return (
        <>
            <div className="main__messages-section messages" id="list-messages">
                <ReactScrolleableFeed className="messages__scroll">
                    {
                        chat && chat[0].messages.map((message) => {
                            return (
                                message.user.username === user.username ?
                                <div className={goToMessage === message._id ? 'messages-user-logged-messages active' : 'messages-user-logged-messages'} key={message._id} id={message._id}>
                                    <div className="messages-message-container">
                                        <span className="messages__username">{message.user.username}</span>
                                        <p className="messages__message">{message.message}</p>
                                        <div className="message__info">
                                            <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                                            {message.seen === true ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>  }
                                        </div>
                                    </div>
                                </div>
                            : 
                                <div className={goToMessage === message._id ? 'messages-contact-messages active' : 'messages-contact-messages'} key={message._id} id={message._id}>
                                    <div className="messages-message-container">
                                        <span className="messages__username">{message.user.username}</span>
                                        <p className="messages__message">{message.message}</p>
                                        <div className="message__info">
                                            <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                                            {message.seen === true ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>  }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {messages && messages.map((message) => {
                        return (
                            message.username === user.username ?
                                <div className={goToMessage === message._id ? 'messages-user-logged-messages active' : 'messages-user-logged-messages'} id={message._id} key={message._id}>
                                    <div className="messages-message-container">
                                        <span className="messages__username">{message.username}</span>
                                        <p className="messages__message">{message.message}</p>
                                        <div className="message__info">
                                            <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                                            {message.seen === true ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>  }
                                        </div>
                                    </div>
                                </div>
                            : 
                                <div className={goToMessage === message._id ? 'messages-contact-messages active' : 'messages-contact-messages'} id={message._id} key={message._id}>
                                    <div className="messages-message-container">
                                        <span className="messages__username">{message.username}</span>
                                        <p className="messages__message">{message.message}</p>
                                        <div className="message__info">
                                            <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                                            {message.seen === true ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>  }
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </ReactScrolleableFeed>
                    <div className="messages__typing">{userTyping && `${userTyping} está escribiendo`} </div>
            </div>
            <form className="main__input-section" onSubmit={(e) => inputOnSubmit(e)}>
                <input className="main__input" id="cosa" type="text" name="message" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seenMessages(true)}}/>
                <button className="main__send-message" type="submit">
                    <img className="main__send-image" src={send} alt="" />
                </button>
            </form>
        </>
    )
}

export default ChatMessages