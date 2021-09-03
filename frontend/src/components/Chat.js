import avatar from '../images/avatar.png'
import socket from './Socket'
import { useState, useEffect } from 'react'
const Chat = () => {

    useEffect(() => {
        socket.emit('connected', 'hola tdesde aca')
    }, [])
    

    const messageInput = (message) => {
        console.log(message)
    }

    return(
        <section className="main__chat-section">
                <nav className="main__chat-navbar navbar">
                    <div className="navbar__contact">
                        <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                        <div className="navbar__info">
                            <p className="navbar__username">Contacto1</p>
                            <p className="navbar__timeago">Ultima vez hace 3032</p>
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
                <div className="main__messages-section">

                </div>
                <div className="main__input-section">
                    <input className="main__input" type="text" name="message" id="" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => messageInput(e.target.value)} />
                </div>
            </section>
    )
}

export default Chat