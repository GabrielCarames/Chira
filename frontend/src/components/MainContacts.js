import { useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import socket from './Socket'
import axios from 'axios'
import moment from 'moment'

const MainContacts = ({messages}) => {
    const [ chats, setChats ] = useState()
    const [ contactChat, setContactChat ] = useState()
    const [ lastMessage, setLastMessage ] = useState()
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const [ contactData, setContactData ] = useState(false)

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

    useEffect(() => {
        const getChats = async () => {
            messages && setLastMessage(messages)
            const data = await axios.get('http://localhost:3001/chat/allchats')
            let chats = data.data
            chats && setChats(chats)
        }
        getChats()
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

    const showCurrentLastMessage = () => {
        if(lastMessage) return lastMessage[lastMessage.length -1].message 
        else return false
    }

    const showHistoryLastMessage = () => {
        if(contactChat.messages.length !== 0) return contactChat.messages[contactChat.messages.length -1].message
        else return false
    }

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
                                            <h6 className="list__time-ago">{contactChat.messages.length !== 0 ? (messages ? moment(contactChat.messages[contactChat.messages.length -1].createdAt).format("LT") : moment(contactChat.messages[contactChat.messages.length -1].createdAt).format("LT")) : ""}</h6>
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