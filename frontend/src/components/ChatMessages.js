import { useState, useEffect, memo } from 'react'
import useSeenMessageHelper from '../hooks/useSeenMessageHelper'
import useInputSubmitHelper from '../hooks/useInputSubmitHelper'
import ReactScrolleableFeed from 'react-scrollable-feed'
import DisplayMessages from './DisplayMessages'
import EmojisPicker from './EmojisPicker'
import send from '../images/send.png'
import socket from './Socket'

const ChatMessages = memo((({chat, messagesSent, setMessagesSent, goToMessage, setShowNewMessageNotification}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const [ chosenEmoji, setChosenEmoji ] = useState(null);
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)
    const { inputOnSubmit } = useInputSubmitHelper(inputMessage, setChosenEmoji, user, setUsertyping)
    const { seeMessage } = useSeenMessageHelper()

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
            <form className="main__input-section" onSubmit={(e) => inputOnSubmit(e, setChosenEmoji )}>
                <div className="main__emoji-container" onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)}>
                    <i className="far fa-grin"></i>
                </div>
                <input className="main__input" id="cosa" value={chosenEmoji} type="text" name="message" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seeMessage(messagesSent, user, chat, setShowNewMessageNotification)}}/>
                <button className="main__send-message" type="submit">
                    <img className="main__send-image" src={send} alt="" />
                </button>
            </form>
        </>
    )
}))

export default ChatMessages