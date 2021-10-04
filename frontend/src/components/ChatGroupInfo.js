import { useState } from 'react'
// import ShowMessages from './ShowMessages'
import avatar from '../images/avatar.png'
import erick from '../images/erick.jpg'
import Loader from "react-loader-spinner";
import useEditUserNameHelper from '../hooks/useEditUserNameHelper';

const ChatGroupInfo = ({setDisplayChatGroupInfo, chat}) => {
    const {handleChange, editUserName } = useEditUserNameHelper()

    const displayAvatar = (avatar) => {
        console.log("avatar", avatar)
        if(avatar.search('http') !== -1 ) {
            return avatar.title
        } else return avatar
    }

    return (
        <section className="main__group-info info">
            <div className="info__navbar-section">
                <div className="info__back" onClick={() => { setDisplayChatGroupInfo(false)}}>
                    <i className="fas fa-times"></i>
                </div>
                <h3 className="info__name">{chat.name}</h3>
                <div className="info__edit">
                    <i className="fas fa-edit"></i>
                </div>
            </div>
            <div className="info__user-info info">
                <div className="info__avatar-container">
                    <img className="info__avatar" src={displayAvatar(chat.avatar)} alt="contact-avatar" />
                </div>
                
            </div>
            <form className="info__edit-contact form" /*onSubmit={(e) => editUserName(e, .username)}*/ >
                <div className="form__name-section">
                    <label className="form__label" htmlFor="username">Nuevo nombre</label>
                    <input className="form__input" id="username" type="text" name="username" onChange={handleChange} minLength="0" maxLength="18" pattern="[A-Za-z0-9]+"/>
                </div>
                <button type="submit" className="form__button" /*className={active ? "form__button active" : loading ? "form__button loading" : "form__button"}*/>
                    {/* {loading
                         ? <Loader type="Oval" color="#00BFFF" height={40} width={65} /> : <p className="form__text-button">Enviar código de verificación</p>} */}
                    <p className="form__text-button">Editar nombre</p>
                </button>
            </form>
        </section>
    )
}

export default ChatGroupInfo