import { useState, useContext, useEffect } from 'react'
import SearchContacts from './SearchContacts'
import MainContacts from './MainContacts'
import AddContactsMenu from "../contexts/AddContactsMenu";
import BurgerMenu from './BurgerMenu';
import Chat from './Chat';
import socket from './Socket'

const Main = ({setUserLoggedMain}) => {
    const [ active, setActive ] = useState(false)
    const { addContactsMenu, setAddContactsMenu } = useContext(AddContactsMenu)
    const [ messages, setMessages ] = useState("");
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))

    useEffect(() => {
        socket.emit('connected', userLogged) // ver forma de actualizar el usuario solo cuando lo quiero + la primera vez que logueas
        socket.on("userLogged", (userLoggede) => {
            localStorage.setItem('userLogged', JSON.stringify(userLoggede[0]));
        });
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
                    {addContactsMenu ? <SearchContacts /> : <MainContacts messages={messages} setMessages={setMessages}/>}
                    <div className="main_add-contacts-container">
                        <div className={addContactsMenu ? "main__add-contact-button active" : "main__add-contact-button" } onClick={() => {setAddContactsMenu(true)}}>
                            <i className="fas fa-user-plus"></i>
                        </div>
                    </div>
                </section>
            </section>
            <Chat messages={messages} setMessages={setMessages}/>
        </section>
    )
}

export default Main