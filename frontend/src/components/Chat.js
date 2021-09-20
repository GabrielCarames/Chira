import { useState, useEffect, useContext } from 'react'
import TestContext from "../contexts/TestContext";
import SearchMessages from './SearchMessages'
import ChatMessages from './ChatMessages'
import avatar from '../images/avatar.png'
import socket from './Socket'

const Chat = ({messagesSent, setMessagesSent, setShowNewMessageNotification, displayChat }) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ showSearchMessages, setShowSearchMessages ] = useState(false)
    const [ connectedContact, setConnectedContact ] = useState([]);
    const [ goToMessage, setGoToMessage ] = useState(false)
    const { chat, setChat } = useContext(TestContext)
    const contact = chat && chat.users.filter((user) => user.username !== userLogged.username)[0]
    const setConnectedContactState = (users) => setConnectedContact(users.filter((user) => user.userLoggedId === contact._id))

    socket.on("getUsersConnected", (users) => {
        chat && setConnectedContactState(users)
    });

    socket.on("chatFound", (chat) => {
        setChat(chat);
    });

    useEffect(() => {
        if(displayChat && chat) document.getElementById('navbar__back').classList = "navbar__back display"
    }, [displayChat, chat])

    const backToMainContacts = () => {
        setChat(false)
    }

    return chat ?
        <>
            <section className={showSearchMessages ? 'main__chat-section search' : 'main__chat-section'}>
                <nav className="main__chat-navbar navbar">
                    <div className="navbar__back" id="navbar__back" onClick={() => backToMainContacts()}>
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="navbar__contact">
                        <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                        <div className="navbar__info">
                            <p className="navbar__username">{contact.username}</p>
                            <p className="navbar__connected">{connectedContact.length !== 0 && 'En línea'}</p>
                        </div>
                    </div>
                    <div className="navbar__tools">
                        <div className="navbar__search" onClick={() => setShowSearchMessages(true)}>
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="navbar__settings">
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </nav>
                <ChatMessages chat={chat} messagesSent={messagesSent} setMessagesSent={setMessagesSent}
                 goToMessage={goToMessage} setShowNewMessageNotification={setShowNewMessageNotification}
                 />
            </section>
            {showSearchMessages && <SearchMessages setShowSearchMessages={setShowSearchMessages} goToMessage={goToMessage} setGoToMessage={setGoToMessage}/>}
        </>
    : <div className="main__no-chat"></div>
}

export default Chat