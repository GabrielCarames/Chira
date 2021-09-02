import { useState, useContext } from 'react'
import AddFriend from './AddFriend'
import MainContacts from './MainContacts'
import AddFriendsMenu from "../contexts/AddFriendsMenu";
import BurgerMenu from './BurgerMenu';
import Chat from './Chat';

const Main = () => {
    const [ active, setActive ] = useState(false)
    const { addFriendsMenu, setAddFriendsMenu } = useContext(AddFriendsMenu)

    return(
        <section className="main">
            <section className="main__left-section">
                <section className="main__navbar-section">
                    <nav className="main__navbar navbar">
                        <div className="main__settings" onClick={() => active ? setActive(false) : setActive(true)}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <h3 className="navbar__title">Chira</h3>
                        <div className="main__search">
                            <i className="fas fa-search"></i>
                        </div>
                    </nav>
                    <BurgerMenu active={active}/>
                </section>
                <section className="main__content-section">
                    {addFriendsMenu ? <AddFriend /> : <MainContacts />}
                    <div className="main_add-friends-container">
                        <div className={addFriendsMenu ? "main__add-friend-button active" : "main__add-friend-button" } onClick={() => {setAddFriendsMenu(true)}}>
                            <i className="fas fa-user-plus"></i>
                        </div>
                    </div>
                </section>
            </section>
            <Chat />
        </section>
    )
}

export default Main