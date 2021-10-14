import { useState, useContext, memo } from 'react'
import BurgerMenu from './BurgerMenu';
import Chat from './Chat';
import useMainHelper from '../hooks/useMainHelper';
import DisplayChatContext from '../contexts/DisplayChatContext';
import socket from './Socket';
import { useDispatch, useStore } from '../store/ChatsProvider';
const Main = memo(({setUserLoggedMain}) => {
    const [ showNewMessageNotification, setShowNewMessageNotification ] = useState(false)
    const [ displayConfiguration, setDisplayConfiguration ] = useState(false)
    const [ displayBurgerMenu, setDisplayBurgerMenu ] = useState(false)
    const [ displayEditProfile, setDisplayEditProfile ] = useState()
    const [ addContactsMenu, setAddContactsMenu ] = useState(false)
    const [ messagesSent, setMessagesSent ] = useState("");
    const { displayChat, setDisplayChat } = useContext(DisplayChatContext)

    // const { chats, setChats } = useContext(ChatsContext)

    // const [ chats, setChats ] = useState()


    const { displayLeftContent } = useMainHelper(messagesSent, displayBurgerMenu, setDisplayBurgerMenu, addContactsMenu, setAddContactsMenu, displayConfiguration, setDisplayConfiguration, displayEditProfile, setDisplayEditProfile, displayChat, setDisplayChat)

    // useEffect(() => {
    //     socket.on("messageSent", (newMessage) => {
    //         let allChats = chats
    //         console.log("allboys", chats, setChats)
    //         // allChats[chat._id].messages[allChats[chat._id].messages.length -1].push(newMessage)
    //         // setChats(allChats)
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [chats]);

    // useEffect(() => {
    //     console.log("chatrulette", chats)
    // }, [chats])

    return(
        <section className="main">
            <section className="main__left-section" id="main__left-section">
                <section className="main__navbar-section">
                    <nav className="main__navbar navbar">
                        <div className="main__settings" onClick={() => displayBurgerMenu ? setDisplayBurgerMenu(false) : setDisplayBurgerMenu(true)}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <h3 className="navbar__title">Chira</h3>
                        <div className="main__search" onClick={() => setAddContactsMenu('search')}>
                            <i className="fas fa-search"></i>
                        </div>
                    </nav>
                    <BurgerMenu displayBurgerMenu={displayBurgerMenu} setUserLoggedMain={setUserLoggedMain} setDisplayConfiguration={setDisplayConfiguration} setDisplayEditProfile={setDisplayEditProfile} setAddContactsMenu={setAddContactsMenu} />
                </section>
                <section className="main__content-section">
                    {displayLeftContent()}
                    <div className="main_add-contacts-container add-contacts">
                        <div className="add-contacts__sub-container">
                            <div className="add-contacts__left-side">
                                <div className={addContactsMenu ? "add-contacts__button active" : "add-contacts__button" } id="add-contacts__button" onClick={() => {setAddContactsMenu(true)}}>
                                    <i className="fas fa-user-plus"></i>
                                </div>
                            </div>
                            <div className="add-contacts__right-side">

                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <Chat messagesSent={messagesSent} setMessagesSent={setMessagesSent} 
            setShowNewMessageNotification={setShowNewMessageNotification}
            displayChat={displayChat} setDisplayChat={setDisplayChat}
            
            />
        </section>
    )
})

export default Main