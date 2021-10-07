import { useState, memo } from 'react'
import useChatMessagesHelper from '../hooks/useChatMessagesHelper'
import useSeenMessageHelper from '../hooks/useSeenMessageHelper'
import useInputSubmitHelper from '../hooks/useInputSubmitHelper'
import DisplayChatSettings from './DisplayChatSettings';
import DisplayMessages from './DisplayMessages'
import EmojisPicker from './EmojisPicker'
import FormContent from './FormContent'
import send from '../images/send.png'

const ChatMessages = memo((({chat, messagesSent, setMessagesSent, goToMessage, setShowNewMessageNotification, images, setImages, setDisplayPreviousImage, displayChatSettings, setDisplayChatSettings, setDisplayContactProfile, contact}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ chosenEmoji, setChosenEmoji ] = useState(null)
    const [ inputMessage, setInputMessage ] = useState("")
    const [ userTyping, setUsertyping ] = useState(false)
    const { messagesEndRef, showEmojiPicker, scrollToBottom, setShowEmojiPicker } = useChatMessagesHelper(chat, messagesSent, setMessagesSent, user)
    const { inputOnSubmit } = useInputSubmitHelper(inputMessage, setChosenEmoji, user, setUsertyping, contact, chat)
    const { seeMessage } = useSeenMessageHelper()

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
                <FormContent chosenEmoji={chosenEmoji} setInputMessage={setInputMessage} seeMessage={seeMessage} images={images} setImages={setImages}
                showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} setDisplayPreviousImage={setDisplayPreviousImage}
                messagesSent={messagesSent} user={user} chat={chat} setShowNewMessageNotification={setShowNewMessageNotification} send={send}
                />
            </form>
            <form enctype="multipart/form-data" className="main__desktop-input-section" id="main__desktop-input-section" onSubmit={(e) => inputOnSubmit(e, setChosenEmoji )}>
                <FormContent chosenEmoji={chosenEmoji} setInputMessage={setInputMessage} seeMessage={seeMessage} images={images} setImages={setImages}
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