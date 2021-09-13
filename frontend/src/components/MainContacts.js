import { useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import socket from './Socket'
import axios from 'axios'
import moment from 'moment'

const MainContacts = ({messages, lastMessage, setLastMessage, showIcon, setShowIcon}) => {
    const [ chats, setChats ] = useState()
    const [ contactChat, setContactChat ] = useState()
    const [ lastMessageToShow, setLastMessageToShow ] = useState()
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ contactData, setContactData ] = useState(false)
    // const [ showIcon, setShowIcon ] = useState(false)

    const goToChat = (contactId) => {
        const userId = user._id
        socket.emit('goToChat', userId, contactId)
    }
        
    useEffect(() => {
        // socket.on('latenesadentro', () => {
        //     console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        //     setChatEvent('reloadContacts')
        // })
    }, [])

    // useEffect(() => {
    //     notification &&
    //         console.log("soynofiticaicon", notification)
    //         if(notification.username !== user.username)
    // }, [notification])

    useEffect(() => {
        const getChats = async () => {
            messages && setLastMessage(messages)
            const data = await axios.get('http://localhost:3001/chat/allchats')
            let chats = data.data
            chats && setChats(chats)
        }
        getChats()
    }, [messages])

    useEffect(() => {
        console.log("hagamos la prueba de fuego", messages)
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

    useEffect(() => {
        socket.on("newNotification", (newMessage, receptorUser) => {
            console.log("soynofiticaicon", newMessage, receptorUser, user)
            setLastMessageToShow(newMessage) //y este tambien, proba usando un nuevo useState
            if(receptorUser[0].username === user.username) setShowIcon(true)
        });
    }, [])
    

    const showCurrentLastMessage = () => {
        // if(messages) console.log("soymessage", messages)
        // if(lastMessage) console.log(lastMessage[lastMessage.length -1])
        // if(lastMessage[lastMessage.length -1].username !== user.username)
        console.log("tengo que ser lastmessage", lastMessageToShow) ///////////////aca hay maldad para arreglar
        if(messages) {
            return messages[messages.length -1].message
        } else if(lastMessageToShow){ 
            return lastMessageToShow.message
        }
        else return false
        // if(lastMessage) return lastMessage[lastMessage.length -1].message
        // else return false
    }

    const showHistoryLastMessage = () => {
        if(contactChat.messages.length !== 0) return contactChat.messages[contactChat.messages.length -1].message
        else return false
    }

    const showNotification = () => {
        // if(notification.username !== user.username) return <i className="far fa-comment-dots"></i>
    }

    useEffect(() => {
        console.log("jonhfsu", lastMessage)
    }, [lastMessage])
    

    // useEffect(() => {
    //     socket.on("newNotification", (newMessage) => {
    //         console.log("soynofiticaicon", newMessage)
    //         const notificationContainer = document.getElementById('notification')
    //         if(newMessage.username !== user.username) setShowIcon(true)
    //     });
    //         // if(notification.username !== user.username)
    // }, [])

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
                                                <p className="list__messages">{showCurrentLastMessage() ? showCurrentLastMessage() : showHistoryLastMessage() ? showHistoryLastMessage() : ''}</p>
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