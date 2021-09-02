import { useState, useContext } from 'react'
import AddFriendsMenu from "../contexts/AddFriendsMenu";
import ShowFriends from './ShowFriends';

const AddFriend = () => {
    const { setAddFriendsMenu } = useContext(AddFriendsMenu)
    const [ friendSearch, setFriendSearch ] = useState();

    return(
        <section className="main__add-friends add-friends">
            <section className="add-friends__navbar">
                <div className="add-friends__back" onClick={() => { setAddFriendsMenu(false) }}>
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div className="add-friends__input-container">
                    <i className="fas fa-search"></i>
                    <input className="add-friends__input" name="friendName" type="text" placeholder="Buscar por nombre" onChange={e => setFriendSearch(e.target.value)}/>
                </div>
            </section>
            <section className="friends-section friends">
                <ShowFriends friendSearch={friendSearch}/>
            </section>
        </section>
    )
}

export default AddFriend