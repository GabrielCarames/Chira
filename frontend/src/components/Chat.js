import { useState, useEffect } from 'react'
import DisplayPreviousImage from './DisplayPreviousImage'
import ContactProfile from './ContactProfile'
import SearchMessages from './SearchMessages'
import ChatGroupInfo from './ChatGroupInfo'
import ChatMessages from './ChatMessages'
import useChathelper from '../hooks/useChathelper'
import socket from './Socket'
import { useChatStore } from '../store/ChatProvider'
import { usePreviousImageDispatch, usePreviousImageStore } from '../store/PreviousImageProvider'
import { useSelector, useDispatch } from 'react-redux'

const Chat = ({messagesSent, setMessagesSent, setShowNewMessageNotification, displayChat, setDisplayChat }) => {
    const {contact, backToMainContacts, displayName, displayAvatar, connectedContact } = useChathelper(setDisplayChat)
    const [ displayContactProfile, setDisplayContactProfile ] = useState(false)
    const [ displayChatGroupInfo, setDisplayChatGroupInfo ] = useState(false)
    const [ showSearchMessages, setShowSearchMessages ] = useState(false)
    const [ displayPreviousImage, setDisplayPreviousImage ] = useState()
    const [ displayChatSettings, setDisplayChatSettings ] = useState()
    const [ goToMessage, setGoToMessage ] = useState(false)
    const [ images, setImages ] = useState([])
    const [ focus, setFocus ] = useState()

    // const { chat } = useChatStore()
    
    const { previousImage } = usePreviousImageStore()
    const previousImageDispatch = usePreviousImageDispatch()
    const chat = useSelector(state => state.chatReducer)
    return chat ?
        <>
            <section className={showSearchMessages || displayContactProfile || displayChatGroupInfo ? 'main__chat-section compressed' : focus? 'main__chat-section focus' :'main__chat-section'} id="main__chat-section">
                <nav className="main__chat-navbar navbar">
                    <div className={displayChat && chat && !showSearchMessages && !displayContactProfile && !displayChatGroupInfo ? 'navbar__back display' : 'navbar__back'} id="navbar__back" onClick={() => backToMainContacts()}>
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="navbar__contact" onClick={() => {setShowSearchMessages(false); chat.name ? setDisplayChatGroupInfo(true) : setDisplayContactProfile(true)}}>
                        <div className="navbar__avatar-container">
                            <img className="navbar__avatar" src={displayAvatar(chat)} alt="contact-avatar" />
                        </div>
                        <div className="navbar__info">
                            <p className="navbar__name">{displayName()}</p>
                            <p className="navbar__connected">{connectedContact.length !== 0 && 'En línea'}</p>
                        </div>
                    </div>
                    <div className="navbar__tools">
                        <div className="navbar__search" onClick={() => {setDisplayContactProfile(false); setDisplayChatGroupInfo(false); setShowSearchMessages(true)}}>
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="navbar__settings" onClick={() => {displayChatSettings ? setDisplayChatSettings(false) : setDisplayChatSettings(true)}}> 
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </nav>
                {
                    previousImage 
                    ? <DisplayPreviousImage images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage} /> 
                    : <ChatMessages messagesSent={messagesSent} setMessagesSent={setMessagesSent}
                        goToMessage={goToMessage} setShowNewMessageNotification={setShowNewMessageNotification}
                        images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage}
                        displayChatSettings={displayChatSettings} setDisplayChatSettings={setDisplayChatSettings}
                        setDisplayContactProfile={setDisplayContactProfile} contact={contact}
                        focus={focus} setFocus={setFocus}
                      />
                }
            </section>
            {displayContactProfile && <ContactProfile setDisplayContactProfile={setDisplayContactProfile} contact={contact} />}
            {displayChatGroupInfo && <ChatGroupInfo setDisplayChatGroupInfo={setDisplayChatGroupInfo} />}
            {showSearchMessages && <SearchMessages setShowSearchMessages={setShowSearchMessages} goToMessage={goToMessage} setGoToMessage={setGoToMessage} />}
        </>
    : <div className="main__no-chat"></div>
}

export default Chat