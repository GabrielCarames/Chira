import useChatGroupInfoHelper from '../hooks/useChatGroupInfoHelper';
import useEditUserNameHelper from '../hooks/useEditUserNameHelper';
import { useChatStore } from '../store/ChatProvider';

const ChatGroupInfo = ({setDisplayChatGroupInfo}) => {
    const { chat } = useChatStore()
    const { displayAvatar, changeGroupImage, displayContactAvatar } = useChatGroupInfoHelper()
    // const { handleChange, editUserName } = useEditUserNameHelper()

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
            </div>
            <form className="info__edit-name form" onSubmit={(e) => {e.preventDefault(); alert('Cambiar nombre todavía no disponible')}} >
                <div className="form__name-section">
                    <label className="form__label" htmlFor="groupname">Editar nombre</label>
                    <input className="form__input" placeholder={chat.name} id="groupname" type="text" name="groupname" /*onChange={handleChange}*/ minLength="0" maxLength="18" pattern="[A-Za-z0-9]+"/>
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