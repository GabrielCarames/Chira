import { useState, memo } from 'react'
import useChatMessagesHelper from '../hooks/useChatMessagesHelper'
import useSeenMessageHelper from '../hooks/useSeenMessageHelper'
import useInputSubmitHelper from '../hooks/useInputSubmitHelper'
import DisplayChatSettings from './DisplayChatSettings';
import DisplayMessages from './DisplayMessages'
import EmojisPicker from './EmojisPicker'
import send from '../images/send.png'
import UploadImage from './UploadImage'
import { useChatStore } from '../store/ChatProvider';
const ChatMessages = memo((({messagesSent, setMessagesSent, goToMessage, setShowNewMessageNotification, images, setImages, setDisplayPreviousImage, displayChatSettings, setDisplayChatSettings, setDisplayContactProfile, contact, focus, setFocus}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ chosenEmoji, setChosenEmoji ] = useState(null)
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)
    const { chat } = useChatStore()


    const { messagesEndRef, showEmojiPicker, scrollToBottom, setShowEmojiPicker } = useChatMessagesHelper(messagesSent, setMessagesSent, user, focus )
    const { inputOnSubmit } = useInputSubmitHelper(inputMessage, setChosenEmoji, user, setUsertyping, contact)
    const { seeMessage } = useSeenMessageHelper()


    return (
        <>
            <div className="main__messages-section messages" id="list-messages">
                <div className="messages__scroll">
                    {chat && chat.messages.map((message) => <DisplayMessages message={message} user={user} goToMessage={goToMessage} scrollToBottom={scrollToBottom} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage} key={message._id} />  )}
                    {/* {messagesSent && messagesSent.map((message) => <DisplayMessages message={message} user={user} goToMessage={goToMessage} scrollToBottom={scrollToBottom} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage} key={message._id} />)} */}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="messages__typing">
                    {userTyping && `${userTyping} está escribiendo`}
                    {showEmojiPicker && <EmojisPicker chosenEmoji={chosenEmoji} setChosenEmoji={setChosenEmoji}/>}
                </div>
            </div>
            <form encType="multipart/form-data" className="main__input-section" id="main__input-section" onSubmit={(e) => inputOnSubmit(e, setChosenEmoji)}>
                <div className="main__emoji-container" onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)}>
                    <i className="far fa-grin"></i>
                </div>
                <UploadImage images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage}/>
                <input className="main__input" id="cosa" value={chosenEmoji} type="text" name="message" placeholder="Mensaje" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seeMessage(messagesSent, user, chat, setShowNewMessageNotification)}} 
                    onFocus={() => setFocus(true)} 
                    onBlur={() => setFocus(false)}
                />
                <button className="main__send-message" type="submit" form="main__input-section">
                    <img className="main__send-image" src={send} alt="" />
                </button>
            </form>
            <form encType="multipart/form-data" className="main__desktop-input-section" id="main__desktop-input-section" onSubmit={(e) => inputOnSubmit(e, setChosenEmoji, {"value": 'desktop'})}>
                <div className="main__emoji-container" onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)}>
                    <i className="far fa-grin"></i>
                </div>
                <UploadImage images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage}/>
                <input className="main__input" id="cosa" value={chosenEmoji} type="text" name="message" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seeMessage(messagesSent, user, chat, setShowNewMessageNotification)}} 
                    onFocus={() => setFocus(true)} 
                    onBlur={() => setFocus(false)}
                />
                <button className="main__send-message" type="submit" form="main__desktop-input-section">
                    <img className="main__send-image" src={send} alt="" />
                </button>
            </form>
            {displayChatSettings && <DisplayChatSettings displayChatSettings={displayChatSettings} setDisplayChatSettings={setDisplayChatSettings} setDisplayContactProfile={setDisplayContactProfile} contact={contact} chat={chat} />}
        </>
    )
}))

export default ChatMessages