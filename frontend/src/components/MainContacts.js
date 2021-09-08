import { useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import socket from './Socket'
import axios from 'axios'
import moment from 'moment'

const MainContacts = ({messages, setMessages}) => {
    const [ chats, setChats ] = useState()
    const [ lastMessage, setLastMessage ] = useState()
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const goToChat = (friendId) => {
        const userId = user._id
        socket.emit('goToChat', userId, friendId)
    }
        
    useEffect(async () => {
        messages && setLastMessage(messages)
        const data = await axios.get('http://localhost:3001/chat/allchats')
        let chats = data.data
        setChats(chats)
        console.log("chats", chats)
    }, [messages])

    return(
        <>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {user &&
                        user.friends.map((friend) => {
                            return (
                                <li className="list__item" onClick={() => goToChat(friend._id)}>
                                    <img className="list__avatar" src={avatar} alt="user-avatar" />
                                    {
                                        chats ? chats.map((chat) => {
                                            console.log("chats.users", chat.users)
                                            return chat.users.map((user) => {
                                                if(user._id === friend._id) {
                                                    return (
                                                        <>
                                                            <div className="list__info">
                                                                <p className="list__username">{friend.username}</p>{/*abajo si el mensaje del input se envia, arriba lo toma y realiza un re render en donde llega aca y se fija si messages fue actualizado para mostrar el ultimo mensaje actualizado */}
                                                                <p className="list__messages">{chat.messages.length !== 0 ? (messages ? chat.messages[chat.messages.length -1].message : chat.messages[chat.messages.length -1].message) : ""}</p>
                                                            </div>{/*ambos se fijan PRIMERO SI, hay un "historiaL" de mensajes?, caso falso no muestra nada, caso verdadero se pregunta SEGUNDO SI, se envió algun mensaje ahora mismo? y forzosamente muestra el ultimo mensaje / hora de ultiam vez */}
                                                            <h6 className="list__time-ago">{chat.messages.length !== 0 ? (messages ? moment(chat.messages[chat.messages.length -1].createdAt).format("LT") : moment(chat.messages[chat.messages.length -1].createdAt).format("LT")) : ""}</h6>
                                                        </>
                                                    )
                                                }
                                            })
                                        })
                                        : <div>puto</div>
                                    }
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