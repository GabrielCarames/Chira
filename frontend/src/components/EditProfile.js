import { useEffect, useState } from 'react'
import axios from 'axios'
import socket from './Socket'

const EditProfile = ({setDisplayEditProfile}) => {
    const [ updatedProfileImage, setUpdatedProfileImage ] = useState()

    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const url = process.env.REACT_APP_UPLOAD_URL
    
    useEffect(() => {
        socket.on('newImageProfileUpdated', (updatedUser) => {
            setUpdatedProfileImage(updatedUser)
        })
    }, [])

    const verifyImage = async (e) => {
        const imageData = e.target.files[0]
        const data = new FormData()
        data.append("file", imageData)
        const res = await axios.post('http://localhost:3001/chat/uploadimage', data )
        socket.emit('newImageProfile', userLogged._id, res.data)
    };

    const displayAvatar = () => {
        if(updatedProfileImage) {
            return url + updatedProfileImage[0].avatar.title
        }else {
            if(!userLogged.avatar.title) {
                return userLogged.avatar
            } else return url + userLogged.avatar.title
        }
    }

    return (
        <div className="main__edit-profile">
            <div className="edit-profile__navbar-section navbar">
                <div className="navbar__close-section" onClick={() => setDisplayEditProfile(false)}>
                    <i className="fas fa-times" aria-hidden="true"></i>
                </div>
                <h3 className="navbar__title">Editar perfil</h3>
            </div>
            <div className="edit-profile__main-content">
                <div className="edit-profile__change-avatar">
                    <label for="edit-profile__image-input" className="edit-profile__image-label">
                        <img className="edit-profile__avatar" src={displayAvatar()} alt="" />
                        <i className="fas fa-camera"></i>
                    </label>
                    <input type="file" name="file" accept="image/png, image/gif, image/jpeg" id="edit-profile__image-input" className="edit-profile__image-input" onChange={(e) => verifyImage(e)}/>
                </div>
                <div className="edit-profile__change-username">
                    <form className="edit-profile__username-section form" id="edit-profile__username-section" onSubmit={(e) => {alert('Cambiar nombre todavía no disponible'); e.preventDefault()}}>
                        <label className="form__label" htmlFor="username">Nombre</label>
                        <input className="form__input" id="username" type="text" name="username" /*onChange={handleChange}*/  minLength="0" maxLength="18" pattern="[A-Za-z0-9]+"/>
                    </form>
                    <button className="form__button" type="submit" /*className={active ? "form__button active" : loading ? "form__button loading" : "form__button"}*/>
                        <p className="form__text-button">Editar nombre</p>
                    </button>
                </div>
            </div>
            <div className="edit-profile__form-button form">
                <button className="form__button" type="submit" form="edit-profile__username-section" >
                    <p className="form__text-button">Cambiar nombre</p>
                </button>
            </div>
        </div>
    )
}

export default EditProfile