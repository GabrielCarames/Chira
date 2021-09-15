import { useState, useEffect } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'
import send from '../images/send.png'
import socket from './Socket'
import moment from 'moment'

const ChatMessages = ({chat, messagesSent, setMessagesSent, goToMessage, setShowNewMessageNotification}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)
    const [ messageAlreadySeen, setMessageAlreadySeen ] = useState(false)
    
    useEffect(() => {
        socket.on("messageSent", async (newMessage) => {
            const contact = chat.users.filter((userInChat) => userInChat._id !== user._id)
            newMessage.user.username === user.username && socket.emit('newMessageNotification', newMessage, user, contact)
            setMessagesSent([...messagesSent, newMessage]); //Representa los mensajes enviados ahora mismo en el chat, no el historial.
        });
        return () => {
          socket.off();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messagesSent]);    

    const messageInput = message => socket.emit("sendMessage", user, message)
    const verifyAndSendInputValue = input => input !== '' && messageInput(input)
    
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

    const inputOnSubmit = (e) => {
        e.preventDefault()
        const inputValue = e.target[0].value
        verifyAndSendInputValue(inputValue)
        e.target[0].value = ''
    }

    const timeOutFunction = () => setUsertyping(false)

    useEffect(() => {
        let timeout;
        socket.on('typing', (username) => {
            setUsertyping(username)
            clearTimeout(timeout);
            timeout = setTimeout(timeOutFunction, 2000); //Basicamente el clear es retardar a la ejecucion del setTimeOut
        })
    }, [])

    const seenMessages = () => {
        if(chat.messages.length !== 0 && chat.messages[chat.messages.length -1].user._id !== user._id) {
            console.log("acabo de ver un mensaje")
            const contactToAdviseSeenMessage = chat.messages[chat.messages.length -1].user
            document.getElementById(chat._id).children[2].children[0].classList = 'far fa-comment-dots'
            setShowNewMessageNotification(false)
            socket.emit('seenMessage', contactToAdviseSeenMessage)
        }
    }

    socket.on('messageAlreadySeen', () => {
        console.log('me dieron ayuda')
        setMessageAlreadySeen(true)
    })

    const showSeenIconMessage = (seen, recientlyChat) => {
        // console.log("mensaje visto", messageAlreadySeen)
     console.log("soyreobob", recientlyChat)
        if(!messageAlreadySeen) {
            if(seen) {
                return <i className="fas fa-check-double"></i>
            } else return <i className="fas fa-check"></i>
        } else {
            // setMessageAlreadySeen(false)
            return <i className="fas fa-check-double"></i>
        }
        
        // message.seen === true ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>
    }

    const showChatMessages = (message, recientlyChat=false) => {
        return (
            message.user.username === user.username || message.username === user.username ?
            <div className={goToMessage === message._id ? 'messages-user-logged-messages active' : 'messages-user-logged-messages'} key={message._id} id={message._id}>
                <div className="messages-message-container">
                    <span className="messages__username">{message.user.username}</span>
                    <p className="messages__message">{message.message}</p>
                    <div className="message__info">
                        <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                        {showSeenIconMessage(message.seen, recientlyChat)}
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
                        {/* {message.seen === true ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>  } */}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="main__messages-section messages" id="list-messages">
                <ReactScrolleableFeed className="messages__scroll">
                    {chat && chat.messages.map((message) => { console.log("me renderizo historial"); return showChatMessages(message)})}
                    {messagesSent && messagesSent.map((message) => {console.log("me renderizo actual"); return showChatMessages(message, true)})}
                </ReactScrolleableFeed>
                <div className="messages__typing">{userTyping && `${userTyping} está escribiendo`} </div>
            </div>
            <form className="main__input-section" onSubmit={(e) => inputOnSubmit(e)}>
                <input className="main__input" id="cosa" type="text" name="message" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seenMessages()}}/>
                <button className="main__send-message" type="submit">
                    <img className="main__send-image" src={send} alt="" />
                </button>
            </form>
        </>
    )
}

export default ChatMessages