import { useState, useEffect, useContext } from 'react'
import TestContext from "../contexts/TestContext";
import SearchMessages from './SearchMessages'
import ChatMessages from './ChatMessages'
import avatar from '../images/avatar.png'
import socket from './Socket'
import ContactProfile from './ContactProfile';
import DisplayPreviousImage from './DisplayPreviousImage';
import ChatGroupInfo from './ChatGroupInfo';

const Chat = ({messagesSent, setMessagesSent, setShowNewMessageNotification, displayChat, setDisplayChat }) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ displayContactProfile, setDisplayContactProfile ] = useState(false)
    const [ displayChatGroupInfo, setDisplayChatGroupInfo ] = useState(false)
    const [ showSearchMessages, setShowSearchMessages ] = useState(false)
    const [ displayPreviousImage, setDisplayPreviousImage ] = useState()
    const [ displayChatSettings, setDisplayChatSettings ] = useState()
    const [ connectedContact, setConnectedContact ] = useState([]);
    const [ goToMessage, setGoToMessage ] = useState(false)
    const [images, setImages] = useState([]);
    const { chat, setChat } = useContext(TestContext)
    
    const contact = chat && chat.users.filter((user) => user.username !== userLogged.username)[0]
    const setConnectedContactState = (users) => setConnectedContact(users.filter((user) => user.userLoggedId === contact._id))

    socket.on("getUsersConnected", (users) => {
        chat && setConnectedContactState(users)
    });
    

    useEffect(() => {
        socket.on("chatFound", (chat) => {
            console.log("chatengrnate", chat) //si es un caht de gurpo darle un segundo arametro de 'grupo' y asi diferenciarlo
            setChat(chat);
        });
    }, [])

    // useEffect(() => {
    //     if(displayChat && chat) document.getElementById('navbar__back').classList = "navbar__back display"
    // }, [displayChat, chat])

    const backToMainContacts = () => {
        setChat(false)
        setDisplayChat(false)
    }

    const displayName = () => {
        console.log("consr", chat)
        if(chat.name) return chat.name
        else return contact.username
    }

    return chat ?
        <>
            <section className={showSearchMessages || displayContactProfile || displayChatGroupInfo ? 'main__chat-section compressed' : 'main__chat-section'}>
                <nav className="main__chat-navbar navbar">
                    <div className={displayChat && chat && !showSearchMessages && !displayContactProfile ? 'navbar__back display' : 'navbar__back'} id="navbar__back" onClick={() => backToMainContacts()}>
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="navbar__contact" onClick={() => {setShowSearchMessages(false); chat.name ? setDisplayChatGroupInfo(true) : setDisplayContactProfile(true)}}>
                        <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                        <div className="navbar__info">
                            <p className="navbar__name">{displayName()}</p>
                            <p className="navbar__connected">{connectedContact.length !== 0 && 'En línea'}</p>
                        </div>
                    </div>
                    <div className="navbar__tools">
                        <div className="navbar__search" onClick={() => {setDisplayContactProfile(false); setShowSearchMessages(true)}}>
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="navbar__settings" onClick={() => {displayChatSettings ? setDisplayChatSettings(false) : setDisplayChatSettings(true)}}> 
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </nav>
                {
                    displayPreviousImage 
                    ? <DisplayPreviousImage images={images} setDisplayPreviousImage={setDisplayPreviousImage} setMessagesSent={setMessagesSent}/> 
                    : <ChatMessages chat={chat} messagesSent={messagesSent} setMessagesSent={setMessagesSent}
                        goToMessage={goToMessage} setShowNewMessageNotification={setShowNewMessageNotification}
                        images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage}
                        displayChatSettings={displayChatSettings} setDisplayChatSettings={setDisplayChatSettings}
                        setDisplayContactProfile={setDisplayContactProfile} contact={contact}
                      />
                }
            </section>
            {displayContactProfile && <ContactProfile setDisplayContactProfile={setDisplayContactProfile} contact={contact}/>}
            {displayChatGroupInfo && <ChatGroupInfo setDisplayChatGroupInfo={setDisplayChatGroupInfo} chat={chat} />}
            {showSearchMessages && <SearchMessages setShowSearchMessages={setShowSearchMessages} goToMessage={goToMessage} setGoToMessage={setGoToMessage}/>}
        </>
    : <div className="main__no-chat"></div>
}

export default Chat