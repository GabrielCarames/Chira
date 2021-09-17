import { useState, useContext, useEffect } from 'react'
import AddContactsMenu from "../contexts/AddContactsMenu";
import SearchContacts from './SearchContacts'
import MainContacts from './MainContacts'
import BurgerMenu from './BurgerMenu';
import Chat from './Chat';
import socket from './Socket'

const Main = ({setUserLoggedMain}) => {
    const [ active, setActive ] = useState(false)
    const { addContactsMenu, setAddContactsMenu } = useContext(AddContactsMenu)
    const [ messagesSent, setMessagesSent ] = useState("");
    const [ lastMessage, setLastMessage ] = useState()
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ contactChat, setContactChat ] = useState()
    const [ showNewMessageNotification, setShowNewMessageNotification ] = useState(false)
    const [ messageAlreadySeen, setMessageAlreadySeen ] = useState(false)

    useEffect(() => {
        socket.emit('connected', userLogged) // ver forma de actualizar el usuario solo cuando lo quiero + la primera vez que logueas
        socket.on("userLogged", (userLoggede) => {
            localStorage.setItem('userLogged', JSON.stringify(userLoggede[0]));
        });
    }, [])

    socket.on('messageAlreadySeen', (message) => {
        // console.log('me dieron ayuda', message)
        setMessageAlreadySeen(message)
    })

    window.onclick = (event) => {
        if(active && event.target.className !== 'burger__user-info' && event.target.className !== 'main__settings' && event.target.className !== 'fas fa-bars') {
            setActive(false)
        }
    }

    return(
        <section className="main">
            <section className="main__left-section">
                <section className="main__navbar-section">
                    <nav className="main__navbar navbar">
                        <div className="main__settings" onClick={() => active ? setActive(false) : setActive(true)}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <h3 className="navbar__title">Chira</h3>
                        <div className="main__search" onClick={() => setAddContactsMenu(true)}>
                            <i className="fas fa-search"></i>
                        </div>
                    </nav>
                    <BurgerMenu active={active} setUserLoggedMain={setUserLoggedMain}/>
                </section>
                <section className="main__content-section">
                    {addContactsMenu ? <SearchContacts /> : <MainContacts messagesSent={messagesSent} setLastMessage={setLastMessage} showNewMessageNotification={showNewMessageNotification} setShowNewMessageNotification={setShowNewMessageNotification} />}
                    <div className="main_add-contacts-container">
                        <div className={addContactsMenu ? "main__add-contact-button active" : "main__add-contact-button" } onClick={() => {setAddContactsMenu(true)}}>
                            <i className="fas fa-user-plus"></i>
                        </div>
                    </div>
                </section>
            </section>
            <Chat messagesSent={messagesSent} setMessagesSent={setMessagesSent} 
            setShowNewMessageNotification={setShowNewMessageNotification} messageAlreadySeen={messageAlreadySeen} setMessageAlreadySeen={setMessageAlreadySeen}/>
        </section>
    )
}

export default Main