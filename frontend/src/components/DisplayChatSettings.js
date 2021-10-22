import { useHistory } from "react-router-dom";
import axios from 'axios'

const DisplayChatSettings = ({ displayChatSettings, setDisplayChatSettings, setDisplayContactProfile, contact, chat}) => {
    
    let history = useHistory();

    const deleteContact = async () => {
        const userLogged = JSON.parse(localStorage.getItem('userLogged'))
        await axios.post('/users/deletecontact', {userLogged, contact, chat})
        history.push('/')
    }

    window.onclick = (event) => {
        if(displayChatSettings && !document.getElementsByClassName('main__chat-settings')[0].contains(event.target) && event.target.className !== 'fas fa-ellipsis-v' && event.target.className !== 'navbar__settings') {
            setDisplayChatSettings(false)
        }
    }

    return (
        <section className="main__chat-settings settings">
            <ul className="main__chat-settings__list list">
                <li className="list__item" onClick={() => {setDisplayChatSettings(false); setDisplayContactProfile(true)}}>
                    <i className="fas fa-user"></i>
                    <h4 className="list__setting-title">Información del contacto</h4>
                </li>
                <li className="list__item" onClick={() => alert('Configuración todavía no está disponible')}>
                    <i className="fas fa-comment-slash"></i>
                    <h4 className="list__setting-title">Silenciar notificaciones</h4>
                </li>
                <li className="list__item" onClick={() => alert('Eliminar contacto todavía no está disponible')}>
                    <i className="fas fa-user-times"></i>
                    <h4 className="list__setting-title">Eliminar contacto</h4>
                </li>
            </ul>
        </section>
    )
}

export default DisplayChatSettings