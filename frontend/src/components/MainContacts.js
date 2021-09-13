import { useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import socket from './Socket'
import moment from 'moment'
import axios from 'axios'

const MainContacts = ({messages, setLastMessage, showIcon, setShowIcon}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ messageAlreadySeen, setMessageAlreadySeen ] = useState(false)
    const [ lastMessageToShow, setLastMessageToShow ] = useState()
    const [ contactData, setContactData ] = useState(false)
    const [ contactChat, setContactChat ] = useState()
    const [ chats, setChats ] = useState()

    const goToChat = contactId => socket.emit('goToChat', user._id, contactId)

    useEffect(() => {
        const getAllChats = async () => {
            messages && setLastMessage(messages)
            const data = await axios.get('http://localhost:3001/chat/allchats')
            let chats = data.data
            chats && setChats(chats)
        }
        getAllChats()
    }, [messages])

    const algo = (contact) => {
        if(chats){
            var contactToShow
            chats.forEach((chat) => {
                contactToShow = chat.users.filter((user) => user._id === contact._id)
            })
            const chatToShow = chats.filter((chat) => {
                return chat.users.filter((user) => user._id === contact._id)
            })
            setContactChat(chatToShow[0])
            setContactData(contactToShow[0])
        }
    }

    const showNotification = () => {
        // if(notification.username !== user.username) return <i className="far fa-comment-dots"></i>
    }

    useEffect(() => {
        socket.on("newNotification", (newMessage, receptorUser) => {
            setLastMessageToShow(newMessage)
            if(receptorUser[0].username === user.username) setShowIcon(true)
        });
    }, [])
    

    const showCurrentLastMessage = () => {
        if(messages) {
            return messages[messages.length -1].message
        } else if(lastMessageToShow){ 
            return lastMessageToShow.message
        }
        else return false
    }

    const showHistoryLastMessage = () => {
        if(contactChat.messages.length !== 0) return contactChat.messages[contactChat.messages.length -1].message
        else return false
    }

    const showSeenIcon = () => {
        console.log("armageddon", contactChat && contactChat.messages[contactChat.messages.length -1].user._id, user._id)
        if(messages){
            console.log("mensajejerererer", messages)
        //     if(messages.seen === true) {
        //         return <i class="fas fa-check-double"></i>
        //    } else {
               return <i class="fas fa-check"></i>
        //    }
        } 
            
            // if(contactChat.messages[contactChat.messages.length -1].seen === true) {
            // } else {
            //     return <i class="fas fa-check"></i>
            // }
        
    }

    socket.on('messageAlreadySeen', () => {
        setMessageAlreadySeen(true)
        return <i class="fas fa-check-double"></i>
    })

    return(
        <>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {user.contacts && 
                        user.contacts.map((contact) => {
                            !contactData && algo(contact)
                            return (
                                <li className="list__item" onClick={() => goToChat(contact._id)} key={contact}>
                                    <img className="list__avatar" src={avatar} alt="user-avatar" />
                                    {
                                        contactData && 
                                        <>
                                            <div className="list__info">
                                                <p className="list__username">{contactData && contactData.username}</p>{/*abajo si el mensaje del input se envia, arriba lo toma y realiza un re render en donde llega aca y se fija si messages fue actualizado para mostrar el ultimo mensaje actualizado */}
                                                <div className="list__message-container">
                                                    {contactChat.messages[contactChat.messages.length -1].user._id === user._id && (messageAlreadySeen ? <i class="fas fa-check-double"></i> : <i class="fas fa-check"></i>) }
                                                    <p className="list__messages">{showCurrentLastMessage() ? showCurrentLastMessage() : showHistoryLastMessage() ? showHistoryLastMessage() : ''}</p>
                                                </div>
                                            </div>{/*ambos se fijan PRIMERO SI, se envio un mensaje ahora mismo?, caso falso no muestra nada, caso verdadero se pregunta SEGUNDO SI, hay un "historiaL" de mensajes?y forzosamente muestra el ultimo mensaje / hora de ultiam vez */}
                                            <div className="list__message-info">
                                                <i className={showIcon ? 'far fa-comment-dots active' : 'far fa-comment-dots'}></i>
                                                <h6 className="list__time-ago" id="notification">{contactChat.messages.length !== 0 ? (messages && messages[0].username !== user.username ? showNotification() : moment(contactChat.messages[contactChat.messages.length -1].createdAt).format("LT")) : ""} </h6>
                                            </div>
                                        </>
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