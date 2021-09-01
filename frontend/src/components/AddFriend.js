import { useState, useContext, useEffect } from 'react'
import { useAddFriendsHelper } from '../hooks/useAddFriendsHelper'
import AddFriendsMenu from "../contexts/AddFriendsMenu";

const AddFriend = () => {
    const { setAddFriendsMenu } = useContext(AddFriendsMenu)
    const { onSearchSubmit, clearResults } = useAddFriendsHelper();
    const [ friendSearch, setFriendSearch ] = useState();
    const [ showFriends, setShowFriends ] = useState();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(friendSearch !== ''){
                const results = await onSearchSubmit(friendSearch)
                setShowFriends(results)
            }
            else{
                clearResults();
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [friendSearch])

    return(
        <section className="main__add-friends add-friends">
            <section className="add-friends__navbar">
            <div className="add-friends__back" onClick={() => { setAddFriendsMenu(false) }}>
                <i class="fas fa-arrow-left"></i>
            </div>
            <div className="add-friends__input-container">
                <i className="fas fa-search"></i>
                <input className="add-friends__input" name="friendName" type="text" placeholder="Buscar por nombre" onChange={e => setFriendSearch(e.target.value)}/>
            </div>
            </section>
            <section className="friends-section friends">
                <ul className="friends-list list">
                    {  
                        showFriends && showFriends.map((friend) => {
                            return(
                                <li className="list__item">
                                    <img className="list__avatar" alt="user-avatar" />
                                    <div className="list__info">
                                        <p className="list__username">{friend.username}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </section>
    )
}

export default AddFriend