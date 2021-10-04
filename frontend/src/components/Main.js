import { useState, useContext, useEffect, memo } from 'react'
import DisplayChatContext from "../contexts/DisplayChatContext";
import AddContactsMenu from "../contexts/AddContactsMenu";
import SearchContacts from './SearchContacts'
import MainContacts from './MainContacts'
import BurgerMenu from './BurgerMenu';
import Chat from './Chat';
import socket from './Socket'
import Configuration from './Configuration';
import EditProfile from './EditProfile';
import CreateGroup from './CreateGroup';

const Main = memo(({setUserLoggedMain}) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ showNewMessageNotification, setShowNewMessageNotification ] = useState(false)
    const [ displayConfiguration, setDisplayConfiguration ] = useState(false)
    const [ messagesSent, setMessagesSent ] = useState("");
    const [ lastMessage, setLastMessage ] = useState()
    const [ active, setActive ] = useState(false)
    const [ displayCreateGroup, setDisplayCreateGroup ] = useState(false)
    const { displayChat, setDisplayChat } = useContext(DisplayChatContext)
    const [ displayEditProfile, setDisplayEditProfile ] = useState()
    const [ addContactsMenu, setAddContactsMenu ] = useState(false)
    const [ groupContacts, setGroupContacts ] = useState([])
    useEffect(() => {
        socket.emit('connected', userLogged)
        socket.on("userLogged", (userLoggede) => {
            localStorage.setItem('userLogged', JSON.stringify(userLoggede[0]));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    window.onclick = (event) => {
        if(active && event.target.className !== 'burger__user-info' && event.target.className !== 'main__settings' && event.target.className !== 'fas fa-bars') {
            setActive(false)
        }
    }

    useEffect(() => {
        if(displayChat) document.getElementById('main__left-section').classList = "main__left-section hidden"
    }, [displayChat])

    const displayLeftContent = () => {
        if(addContactsMenu) {
            return <SearchContacts setDisplayCreateGroup={setDisplayCreateGroup} addContactsMenu={addContactsMenu} setAddContactsMenu={setAddContactsMenu} groupContacts={groupContacts} setGroupContacts={setGroupContacts} />
        } else if(displayConfiguration) {
            return <Configuration setDisplayEditProfile={setDisplayEditProfile} setDisplayConfiguration={setDisplayConfiguration} />
        } else if(displayEditProfile) {
            return <EditProfile setDisplayEditProfile={setDisplayEditProfile} />
        } else if (displayCreateGroup) {
            return <CreateGroup groupContacts={groupContacts} setGroupContacts={setGroupContacts}/>
        }else return <MainContacts messagesSent={messagesSent} setLastMessage={setLastMessage} setDisplayChat={setDisplayChat} />
    }

    return(
        <section className="main">
            <section className="main__left-section" id="main__left-section">
                <section className="main__navbar-section">
                    <nav className="main__navbar navbar">
                        <div className="main__settings" onClick={() => active ? setActive(false) : setActive(true)}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <h3 className="navbar__title">Chira</h3>
                        <div className="main__search" onClick={() => setAddContactsMenu('search')}>
                            <i className="fas fa-search"></i>
                        </div>
                    </nav>
                    <BurgerMenu active={active} setUserLoggedMain={setUserLoggedMain} setDisplayConfiguration={setDisplayConfiguration} setDisplayEditProfile={setDisplayEditProfile} setAddContactsMenu={setAddContactsMenu} />
                </section>
                <section className="main__content-section">
                    {displayLeftContent()}
                    {/* {addContactsMenu ? <SearchContacts /> : displayConfiguration ? <Configuration setDisplayConfiguration={setDisplayConfiguration} /> : <MainContacts messagesSent={messagesSent}
                        setLastMessage={setLastMessage} 
                        setDisplayChat={setDisplayChat}
                    />} */}
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