import { useState, useEffect } from 'react'
// import ShowMessages from './ShowMessages'
import avatar from '../images/avatar.png'
import erick from '../images/erick.jpg'
import Loader from "react-loader-spinner";
import useEditUserNameHelper from '../hooks/useEditUserNameHelper';
import axios from 'axios'
import socket from './Socket';

const ChatGroupInfo = ({setDisplayChatGroupInfo, chat}) => {
    const {handleChange, editUserName } = useEditUserNameHelper()
    const [ groupImage, setGroupImage ] = useState()
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const url = 'http://localhost:3001/public/uploads/'

    useEffect(() => {
        socket.on('updatedGroupChat', (updatedGroupChat) => {
            const updatedAvatar = updatedGroupChat.avatar.title
            console.log("updated", updatedGroupChat)
            setGroupImage(updatedAvatar)
        })
    })

    const displayAvatar = (avatar) => {
        if(groupImage) {
            return url + groupImage
        }else {
            if(avatar.title ) {
                return url + avatar.title
            } else return avatar
        }
    }

    const changeGroupImage = async (e) => {
        const imageData = e.target.files[0]
        const data = new FormData()
        data.append("file", imageData)
        const res = await axios.post('http://localhost:3001/chat/uploadimage', data )
        console.log("estaimagensubida", res.data)
        socket.emit('newGroupImage', chat._id, res.data)
    }

    const displayContactAvatar = (contact) => {
        if(contact.avatar.title) {
            return url + contact.avatar.title
        } else return contact.avatar
    }

    return (
        <section className="main__group-info info">
            <div className="info__navbar-section">
                <div className="info__back" onClick={() => { setDisplayChatGroupInfo(false)}}>
                    <i className="fas fa-times"></i>
                </div>
                <h3 className="info__name">{chat.name}</h3>
                <div className="info__edit" onClick={(e) => {e.preventDefault(); alert('Configuración del grupo todavía no disponible')}}>
                    <i className="fas fa-edit"></i>
                </div>
            </div>
            <div className="info__avatar-container">
                    <label htmlFor="info__image-input" className="info__image-label">
                        <img className="info__image" src={displayAvatar(chat.avatar)} alt="" />
                        <i className="fas fa-camera"></i>
                    </label>
                    <input type="file" name="file" accept="image/png, image/gif, image/jpeg" id="info__image-input" className="info__image-input" onChange={(e) => changeGroupImage(e)} />
                {/* <img className="info__avatar" src={displayAvatar(chat.avatar)} alt="contact-avatar" /> */}
            </div>
            <form className="info__edit-name form" onSubmit={(e) => {e.preventDefault(); alert('Cambiar nombre todavía no disponible')}} >
                <div className="form__name-section">
                    <label className="form__label" htmlFor="groupname">Editar nombre</label>
                    <input className="form__input" placeholder={chat.name} id="groupname" type="text" name="groupname" onChange={handleChange} minLength="0" maxLength="18" pattern="[A-Za-z0-9]+"/>
                </div>
                <button type="submit" className="form__button" /*className={active ? "form__button active" : loading ? "form__button loading" : "form__button"}*/>
                    {/* {loading
                         ? <Loader type="Oval" color="#00BFFF" height={40} width={65} /> : <p className="form__text-button">Enviar código de verificación</p>} */}
                    <p className="form__text-button">Editar nombre</p>
                </button>
            </form>
            <div className="info__contacts-container">
                <h3 className="info__contacts-title">Miembros &nbsp; - &nbsp; {chat.users.length} </h3>
                <ul className="info__contact-list list">
                    { 
                        chat.users.map(contact => {
                            return (
                                <li className="list__item" key={contact._id}>   
                                    <img className="list__avatar" src={displayContactAvatar(contact)} alt="user-avatar" />
                                    <div className="list__info">
                                        <p className="list__username">{contact.username}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default ChatGroupInfo