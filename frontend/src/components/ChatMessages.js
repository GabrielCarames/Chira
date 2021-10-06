import { useState, useEffect, memo, useRef  } from 'react'
import useSeenMessageHelper from '../hooks/useSeenMessageHelper'
import useInputSubmitHelper from '../hooks/useInputSubmitHelper'
import DisplayMessages from './DisplayMessages'
import EmojisPicker from './EmojisPicker'
import send from '../images/send.png'
import socket from './Socket'
import UploadImage from './UploadImage'
import DisplayChatSettings from './DisplayChatSettings';
import FormContent from './FormContent'

const ChatMessages = memo((({chat, messagesSent, setMessagesSent, goToMessage, setShowNewMessageNotification, images, setImages, setDisplayPreviousImage, displayChatSettings, setDisplayChatSettings, setDisplayContactProfile, contact}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const [ chosenEmoji, setChosenEmoji ] = useState(null);
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)
    const { inputOnSubmit } = useInputSubmitHelper(inputMessage, setChosenEmoji, user, setUsertyping)
    const { seeMessage } = useSeenMessageHelper()
    const messagesEndRef = useRef(null)

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
      
    const scrollToBottom = () => { 
    messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
    scrollToBottom()
    }, [messagesSent]);

    return (
        <>
            <div className="main__messages-section messages" id="list-messages">
                <div className="messages__scroll">
                    {chat && chat.messages.map((message) => <DisplayMessages message={message} user={user} goToMessage={goToMessage} scrollToBottom={scrollToBottom} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage} />  )}
                    {messagesSent && messagesSent.map((message) => <DisplayMessages message={message} user={user} goToMessage={goToMessage} scrollToBottom={scrollToBottom} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage} />)}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="messages__typing">
                    {userTyping && `${userTyping} está escribiendo`}
                    {showEmojiPicker && <EmojisPicker chosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji}/>}
                </div>
            </div>
            <form enctype="multipart/form-data" className="main__input-section" id="main__input-section" onSubmit={(e) => inputOnSubmit(e, setChosenEmoji )}>
                <FormContent inputOnSubmit={inputOnSubmit} chosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji} 
                setInputMessage={setInputMessage} seeMessage={seeMessage} images={images} setImages={setImages}
                showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} setDisplayPreviousImage={setDisplayPreviousImage}
                messagesSent={messagesSent} user={user} chat={chat} setShowNewMessageNotification={setShowNewMessageNotification} send={send}
                />
            </form>
            <form enctype="multipart/form-data" className="main__desktop-input-section" id="main__desktop-input-section" onSubmit={(e) => inputOnSubmit(e, setChosenEmoji )}>
                <FormContent inputOnSubmit={inputOnSubmit} chosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji} 
                setInputMessage={setInputMessage} seeMessage={seeMessage} images={images} setImages={setImages}
                showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} setDisplayPreviousImage={setDisplayPreviousImage}
                messagesSent={messagesSent} user={user} chat={chat} setShowNewMessageNotification={setShowNewMessageNotification} send={send} 
                placeholder={'desktop'}
                />
            </form>
            {displayChatSettings && <DisplayChatSettings displayChatSettings={displayChatSettings} setDisplayChatSettings={setDisplayChatSettings} setDisplayContactProfile={setDisplayContactProfile} contact={contact} chat={chat} />}
        </>
    )
}))

export default ChatMessages