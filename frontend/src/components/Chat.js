import avatar from '../images/avatar.png'
import socket from './Socket'
import { useState, useEffect } from 'react'
import ChatMessages from './ChatMessages'
import axios from 'axios'

const Chat = ({messages, setMessages}) => {
    const [ chat, setChat ] = useState()
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const contact = chat && chat[0].users.filter((user) => user.username !== userLogged.username)[0]
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [connectedContact, setConnectedContact] = useState([]);
    console.log("USURARIO LOGUEADO SUPUESTAMNETE", userLogged)
    console.log("contacto", contact)

    useEffect(() => {
        socket.on("getUsersConnected", (users) => {
            console.log("usuarios conectados", users)
            setOnlineUsers(users)
            if(chat) {
                setConnectedContact(onlineUsers.filter((user) => user.userLoggedId === contact._id))
            }
        });
        socket.on("chatFound", (chat) => {
            setChat(chat);
        });
    }, [])

    useEffect(() => {
        if(chat) {
            console.log("MASTODONTE GRANDE", onlineUsers)
            console.log("cosa", onlineUsers.filter((user) => user.userLoggedId === contact._id))
            setConnectedContact(onlineUsers.filter((user) => user.userLoggedId === contact._id))
        }
    }, [chat, onlineUsers])

    return chat ? 
        <section className="main__chat-section">
            <nav className="main__chat-navbar navbar">
                <div className="navbar__contact">
                    <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                    <div className="navbar__info">
                        <p className="navbar__username">{contact.username}</p>
                        <p className="navbar__connected">{connectedContact.length !== 0 && 'En línea'}</p>
                    </div>
                </div>
                <div className="navbar__tools">
                    <div className="navbar__search">
                        <i className="fas fa-search"></i>

                    </div>
                    <div className="navbar__settings">
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                </div>
            </nav>
            <ChatMessages chat={chat} setChat={setChat} messages={messages} setMessages={setMessages}/> 
        </section>
    : <div className="main__no-chat"></div>
}

export default Chat