import { useState, useEffect, memo } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'
import send from '../images/send.png'
import socket from './Socket'


import EmojiPicker from 'emoji-picker-react';
import EmojisPicker from './EmojisPicker'
import DisplayMessages from './DisplayMessages'
const ChatMessages = memo((({chat, messagesSent, setMessagesSent, goToMessage, setShowNewMessageNotification}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const [ chosenEmoji, setChosenEmoji ] = useState(null);

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
                    console.log("input?", input[0])
                    event.preventDefault();
                    verifyAndSendInputValue(input[0].value)
                    input[0].value = ''
                    input[0].defaultValue = ''
                    setChosenEmoji(null)
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
        e.target[0].defaultValue = ''
        setChosenEmoji(null)
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
        if(messagesSent.length !== 0 && messagesSent[messagesSent.length -1].user._id !== user._id) {
            const contactIdToAdviseSeenMessage = messagesSent[messagesSent.length -1].user._id
            document.getElementById(chat._id).children[2].children[0].classList = 'far fa-comment-dots'
            setShowNewMessageNotification(false)
            socket.emit('seenMessage', user, contactIdToAdviseSeenMessage)
        }
        else if(chat.messages.length !== 0 && chat.messages[chat.messages.length -1].user._id !== user._id) {
            const contactIdToAdviseSeenMessage = chat.messages[chat.messages.length -1].user._id
            document.getElementById(chat._id).children[2].children[0].classList = 'far fa-comment-dots'
            setShowNewMessageNotification(false)
            socket.emit('seenMessage', user, contactIdToAdviseSeenMessage)
        }
    }

    window.onclick = (event) => {
        if(showEmojiPicker && !document.getElementsByClassName('emoji-picker-react')[0].contains(event.target) && event.target.className !== 'far fa-grin' && event.target.className !== 'main__emoji-container') {
            setShowEmojiPicker(false)
        }
    }

    return (
        <>
            <div className="main__messages-section messages" id="list-messages">
                <ReactScrolleableFeed className="messages__scroll">
                    {chat && chat.messages.map((message) => <DisplayMessages message={message} user={user} goToMessage={goToMessage}/>)}
                    {messagesSent && messagesSent.map((message) => <DisplayMessages message={message} user={user} goToMessage={goToMessage} />)}
                </ReactScrolleableFeed>
                <div className="messages__typing">
                    {userTyping && `${userTyping} está escribiendo`}
                    {showEmojiPicker && <EmojisPicker chosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji}/>}
                </div>
            </div>
            <form className="main__input-section" onSubmit={(e) => inputOnSubmit(e)}>
                <div className="main__emoji-container" onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)}>
                    <i className="far fa-grin"></i>
                </div>
                <input className="main__input" id="cosa" value={chosenEmoji} type="text" name="message" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seenMessages()}}/>
                <button className="main__send-message" type="submit">
                    <img className="main__send-image" src={send} alt="" />
                </button>
            </form>
        </>
    )
}))

export default ChatMessages