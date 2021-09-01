import { useState, useContext, useEffect } from 'react'
import { useAddFriendsHelper } from '../hooks/useAddFriendsHelper'
import AddFriendsMenu from "../contexts/AddFriendsMenu";
import avatar from '../images/avatar.png'
import Loader from "react-loader-spinner";

const AddFriend = () => {
    const { setAddFriendsMenu } = useContext(AddFriendsMenu)
    const { onSearchSubmit } = useAddFriendsHelper();
    const [ friendSearch, setFriendSearch ] = useState();
    const [ showFriends, setShowFriends ] = useState();
    const [ loader, setLoader ] = useState();

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
                <ul className="friends-list list">
                    {  
                        showFriends !== ''? 
                            showFriends ? showFriends.map((friend) => {
                                return(
                                    <li className="list__item">
                                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                                            <div className="list__info">
                                                <p className="list__username">{friend.username}</p>
                                                <p className="list__last-seen">Hace 39 horas</p>
                                            </div>
                                        </li>
                                    )
                                })
                            :  <h4 className="friends-suggestion">Ingresa un nombre para buscar</h4>
                        : <h4 className="friends-not-found">No se han encontrado usuarios. Pruebe buscando otro nombre</h4>
                    }
                </ul>
                {loader && <Loader type="Oval" color="#00BFFF" className="friends__loader" height={60} width={60} />}
            </section>
        </section>
    )
}

export default AddFriend