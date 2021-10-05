import { useState } from 'react'
// import ShowMessages from './ShowMessages'
import avatar from '../images/avatar.png'
import erick from '../images/erick.jpg'
import Loader from "react-loader-spinner";
import useEditUserNameHelper from '../hooks/useEditUserNameHelper';

const ContactProfile = ({setDisplayContactProfile, contact}) => {
    // const [ messageSearch, setMessageSearch ] = useState();
    const {handleChange, editUserName } = useEditUserNameHelper()
    const url = 'http://localhost:3001/public/uploads/'
    const displayAvatar = (contact) => {
        if(contact.avatar.title) {
            return url + contact.avatar.title
        } else return contact.avatar
    }

    return (
        <section className="main__contact-profile profile">
            <div className="profile__navbar-section">
                <div className="profile__back" onClick={() => { setDisplayContactProfile(false)}}>
                    <i className="fas fa-times"></i>
                </div>
                <h3 className="profile__username">{contact.username}</h3>
                <div className="profile__edit">
                    <i className="fas fa-edit"></i>
                </div>
            </div>
            <div className="profile__user-info info">
                <div className="info__avatar-container">
                    <img className="info__avatar" src={displayAvatar(contact)} alt="contact-avatar" />
                </div>
                <div className="info__phone-number-section">
                    <i className="fas fa-phone-alt"></i>
                    <p className="info__phone-number">{contact.phoneNumber}</p>
                </div>
            </div>
            <form className="profile__edit-contact form" onSubmit={(e) => editUserName(e, contact.username)}>
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

export default ContactProfile