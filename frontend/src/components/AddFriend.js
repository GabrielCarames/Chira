import { useContext } from 'react'
import AddFriendsMenu from "../contexts/AddFriendsMenu";

const AddFriend = () => {
    const { setAddFriendsMenu } = useContext(AddFriendsMenu)

    return(
        <section className="main__add-friends add-friends">
            <section className="add-friends__navbar">
            <div className="add-friends__back" onClick={() => { setAddFriendsMenu(false) }}>
                <i class="fas fa-arrow-left"></i>
            </div>
            <div className="add-friends__input-container">
                <i className="fas fa-search"></i>
                <input className="add-friends__input" type="text" />
            </div>
            </section>
        </section>
    )
}

export default AddFriend