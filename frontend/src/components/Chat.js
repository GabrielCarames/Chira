import { useState, useEffect, useContext } from 'react'
import TestContext from "../contexts/TestContext";
import SearchMessages from './SearchMessages'
import ChatMessages from './ChatMessages'
import avatar from '../images/avatar.png'
import socket from './Socket'

const Chat = ({messagesSent, setMessagesSent, setShowNewMessageNotification, messageAlreadySeen, setMessageAlreadySeen}) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ showSearchMessages, setShowSearchMessages ] = useState(false)
    const [ connectedContact, setConnectedContact ] = useState([]);
    const [ goToMessage, setGoToMessage ] = useState(false)
    const { chat, setChat } = useContext(TestContext)
    // const [ userConnected, setGoToMessage ] = useState(false)
    const contact = chat && chat.users.filter((user) => user.username !== userLogged.username)[0]
    const setConnectedContactState = (users) => setConnectedContact(users.filter((user) => user.userLoggedId === contact._id))
    const [ contactSeeingChat, setContactSeeingChat ] = useState(false)
    socket.on("getUsersConnected", (users) => {
        chat && setConnectedContactState(users)
    });

    useEffect(() => {
        socket.on("disconnectingFromAllChats", () => {
            console.log("el contacto se fue al re carajo de este chat")
            setContactSeeingChat(false)
            // setMessageAlreadySeen(false)
        });
        socket.on("contactSeeingChat", () => {
            console.log("el contacto me esta viendo el pitulind")
            setContactSeeingChat(true)
        });
    }, [])
    

    socket.on("chatFound", (chat) => {
        setChat(chat);
    });

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
                <ChatMessages setChat={setChat} chat={chat} messagesSent={messagesSent} setMessagesSent={setMessagesSent}
                 goToMessage={goToMessage} setShowNewMessageNotification={setShowNewMessageNotification}
                 messageAlreadySeen={messageAlreadySeen} setMessageAlreadySeen={setMessageAlreadySeen} connectedContact={connectedContact}
                 contactSeeingChat={contactSeeingChat}
                 />
            </section>
            {showSearchMessages && <SearchMessages setShowSearchMessages={setShowSearchMessages} goToMessage={goToMessage} setGoToMessage={setGoToMessage}/>}
        </>
    : <div className="main__no-chat"></div>
}

export default Chat