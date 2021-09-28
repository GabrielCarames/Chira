import { useState, useEffect, memo } from 'react'
import avatar from '../images/avatar.png'
import socket from './Socket'
import moment from 'moment'
import axios from 'axios'
const MainContacts = memo(({messagesSent, setLastMessage, setDisplayChat}) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ lastRecentMessage, setLastRecentMessage ] = useState()
    const [ chats, setChats ] = useState()
    //lastRecentMessage es para mensajes recientes al contacto unicamente, mas no para todos
    //messagesSent es para todos

    const goToChat = users => {
        const contactId = users.filter((user) => user._id !== userLogged._id)[0]._id
        setDisplayChat(true)
        socket.emit('goToChat', userLogged._id, contactId)
    }

    useEffect(() => {
        const getAllChats = async () => {
            messagesSent && setLastMessage(messagesSent)
            const res = await axios.post('http://localhost:3001/chat/allchatsfromuserlogged', {userLogged})
            const chats = res.data
            chats && setChats(chats)
        }
        getAllChats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messagesSent])


    useEffect(() => {
        socket.on("newNotification", (newMessage, contactChat) => {
            document.getElementById(contactChat[0]._id).children[2].children[0].classList = 'far fa-comment-dots active' //Activa la visibilidad del icono de notificacion de mensaje
            document.getElementById(contactChat[0]._id).children[1].children[1].textContent 
            = contactChat[0].messages[contactChat[0].messages.length -1].message //Agarra el ultimo mensaje actual desactualizado de tal chat, y lo actualiza con el mensaje actualziado unicamente a el
            setLastRecentMessage(newMessage)
        });
    }, [])
    
    const activeMessageNotificationIcon = (chat) => {
        if(chat.messages.length !== 0) {
            if(!chat.messages[chat.messages.length -1].seen && chat.messages[chat.messages.length -1].user.username !== userLogged.username) {
                return 'far fa-comment-dots active'
            } else return 'far fa-comment-dots'
        }
    }

    const showHistoryLastMessage = (messages) => {
        if(messages.length !== 0) {
            console.log("ar", messages)
            const lastMessage = messages[messages.length -1].message
            if(lastMessage === 'false') {
                return 'Foto'
            }
            else return lastMessage
        }
    }

    const showTimeAgoMessage = (messages) => {
        return lastRecentMessage //Si el userLogged recibió un mensaje para EL
            ? moment(lastRecentMessage.createdAt).format("LT")
            : messagesSent //Si el userLogged envió un mensaje para un contacto y lo tiene que visualizar el mismo
                ? moment(messagesSent.createdAt).format("LT") 
                : messages.length !== 0
                    ? moment(messages[messages.length -1].createdAt).format("LT") 
                    : ''
    }

    const contactUsername = (users) => {
        return users.filter((user) => user._id !== userLogged._id)[0].username
    }

    const showSeenIcon = (lastMessage) => {
        if(lastMessage.user.username === userLogged.username) {
            if(lastMessage.seen) {
                return <i className="fas fa-check-double"></i> 
            } else return <i className="fas fa-check"></i>
        }
    }

    return(
        <>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {chats && 
                        chats.map((chat) => {
                            return (
                                <li className="list__item" onClick={() => goToChat(chat.users)} key={chat._id} id={chat._id}>
                                    <img className="list__avatar" src={avatar} alt="user-avatar" />
                                        <div className="list__info">
                                            <p className="list__username">{contactUsername(chat.users)}</p>
                                            <div className="list__message-container">
                                                {chat.messages.length !== 0 && showSeenIcon(chat.messages[chat.messages.length -1])}
                                                <p className="list__messages">{ showHistoryLastMessage(chat.messages) ? showHistoryLastMessage(chat.messages) : ''}</p>
                                            </div>
                                        </div>
                                        <div className="list__message-info">
                                            <i className={activeMessageNotificationIcon(chat)}></i>
                                            <h6 className="list__time-ago" id="notification">{ showTimeAgoMessage(chat.messages)} </h6>
                                        </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </>
    )
})

export default MainContacts