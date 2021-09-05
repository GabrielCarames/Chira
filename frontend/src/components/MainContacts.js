import avatar from '../images/avatar.png'
import socket from './Socket'

const MainContacts = () => {
    
    const user = JSON.parse(localStorage.getItem('userLogged'))
    console.log("estodefriendnotienenada", user)
    const goToChat = (friendId) => {
        const userId = user._id
        socket.emit('goToChat', userId, friendId)
    }

    return(
        <>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {user && 
                        user.friends.map((friend) => {
                            console.log("friend", friend)
                            return (
                                <li className="list__item" onClick={() => goToChat(friend._id)}>
                                    <img className="list__avatar" src={avatar} alt="user-avatar" />
                                    <div className="list__info">
                                        <p className="list__username">{friend.username}</p>
                                        <p className="list__messages">Cosa</p>
                                    </div>
                                    <h6 className="list__time-ago">30:43hs</h6>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>   
        </>
    )
}

export default MainContacts