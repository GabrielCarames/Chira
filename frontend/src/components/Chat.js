import { useState, useEffect, useContext } from 'react'
import TestContext from "../contexts/TestContext";
import SearchMessages from './SearchMessages'
import ChatMessages from './ChatMessages'
import avatar from '../images/avatar.png'
import socket from './Socket'

const Chat = ({messages, setMessages, setShowIcon}) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ showSearchMessages, setShowSearchMessages ] = useState(false)
    const [ connectedContact, setConnectedContact ] = useState([]);
    const [ goToMessage, setGoToMessage ] = useState(false)
    const [ onlineUsers, setOnlineUsers ] = useState([]);
    const { chat, setChat } = useContext(TestContext)
    
    const contact = chat && chat[0].users.filter((user) => user.username !== userLogged.username)[0]
    
    useEffect(() => {
        socket.on("getUsersConnected", (users) => {
            setOnlineUsers(users)
            if(chat) {
                setConnectedContact(onlineUsers.filter((user) => user.userLoggedId === contact._id))
            }
        });
        socket.on("chatFound", (chat) => {
            setChat(chat);
        });
    }, [])

    useEffect(() => {
        if(chat) {
            setConnectedContact(onlineUsers.filter((user) => user.userLoggedId === contact._id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat, onlineUsers])

    return chat ? 
        <>
            <section className={showSearchMessages ? 'main__chat-section search' : 'main__chat-section'}>
                <nav className="main__chat-navbar navbar">
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
                <ChatMessages chat={chat} messages={messages} setMessages={setMessages} goToMessage={goToMessage} setShowIcon={setShowIcon}/>
            </section>
            {showSearchMessages && <SearchMessages setShowSearchMessages={setShowSearchMessages} goToMessage={goToMessage} setGoToMessage={setGoToMessage}/>}
        </>
    : <div className="main__no-chat"></div>
}

export default Chat