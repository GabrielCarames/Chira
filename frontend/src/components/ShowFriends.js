import { useState, useEffect } from 'react'
import { useAddFriendsHelper } from '../hooks/useAddFriendsHelper'
import avatar from '../images/avatar.png'
import Loader from "react-loader-spinner";

const ShowFriends = ({friendSearch}) => {
    const { addFriend, onSearchSubmit } = useAddFriendsHelper();
    const [ showFriends, setShowFriends ] = useState();
    const [ loader, setLoader ] = useState();
    const [ friendAdded, setFriendAdded ] = useState();
    const stringUser = localStorage.getItem('userLogged');
    const user = JSON.parse(stringUser)

    useEffect(() => {
        if(friendSearch === '') setLoader(false)
        if(friendSearch) {
            setLoader(true)
            const timer = setTimeout(async () => {
                if(friendSearch !== undefined){
                    const results = await onSearchSubmit(friendSearch)
                    setLoader(false)
                    if(results.length >= 1) setShowFriends(results)
                    else setShowFriends('')
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [friendSearch])// eslint-disable-line react-hooks/exhaustive-deps
    
    var alreadyFriends
    if(loader) {
        return <Loader type="Oval" color="#00BFFF" className="friends__loader" height={60} width={60} />
    } else {
        if(showFriends !== '') {
            if(showFriends) {
                return (
                    <ul className="friends-list list">
                        { 
                            showFriends.map(friend => {
                                alreadyFriends = friend.friends.filter((friend) => user._id === friend._id )
                                return (
                                    <li className="list__item" key={friend._id}>    
                                        <img className="list__avatar" src={avatar} alt="user-avatar" />
                                        <div className="list__info">
                                            <p className="list__username">{friend.username}</p>
                                            <p className="list__last-seen">Hace 39 horas</p>
                                        </div>
                                        <div className="list__add-friend" >
                                            {
                                                alreadyFriends[0]
                                                ? <i className="fas fa-user-check"></i>
                                                : <i className={friendAdded ? "fas fa-user-check" : "fas fa-user-plus"} onClick={() => {addFriend(friend); setFriendAdded(true)}}></i>
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            } else return <h4 className="friends-suggestion">Ingresa un nombre para buscar</h4>
        } else return <h4 className="friends-not-found">No se han encontrado usuarios. Pruebe buscando otro nombre</h4>
    }
}

export default ShowFriends