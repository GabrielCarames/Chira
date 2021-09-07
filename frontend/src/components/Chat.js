import avatar from '../images/avatar.png'
import socket from './Socket'
import { useState, useEffect } from 'react'
import ChatMessages from './ChatMessages'

const Chat = ({messages, setMessages}) => {
    const [ chat, setChat ] = useState()
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const { _id, username, phoneNumber } = user
    const [userConnected, setUserConnected] = useState(false)

    useEffect(() => {
        socket.emit('connected', user)
    }, [])

    useEffect(() => {
        socket.on('userConnected', () => {setUserConnected('En Linea')})
        socket.on('userDisconnected', () => {setUserConnected(false)})
        socket.on("chatFound", (chat) => {
            setChat(chat);
        });
    })

    return chat ? 
        <section className="main__chat-section">
            <nav className="main__chat-navbar navbar">
                <div className="navbar__contact">
                    <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                    <div className="navbar__info">
                        <p className="navbar__username">{chat[0].users[1].username}</p>
                        <p className="navbar__timeago">{userConnected ? userConnected : 'Ultima vez hace 3032'}</p>
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