import { useState } from 'react'
import { useShowMessagesHelper } from '../hooks/useShowMessagesHelper'
import Loader from "react-loader-spinner"
import avatar from '../images/avatar.png'
import moment from 'moment'

const ShowMessages = ({messageSearch, goToMessage , setGoToMessage, setShowSearchMessages}) => {
    const [ showMessages, setShowMessages ] = useState();
    const [ loader, setLoader ] = useState();
    const { scrollToMessage } = useShowMessagesHelper(messageSearch, setShowMessages, setShowSearchMessages, setGoToMessage, setLoader);
    
    if(loader) {
        return <Loader type="Oval" color="#00BFFF" className="messages__loader" height={60} width={60} />
    } else {
        if(showMessages !== '') {
            if(showMessages) {
                return (
                    <ul className="messages-list list">
                        {
                            showMessages.map(message => {
                                return (
                                    <li className="list__item" key={message._id} onClick={() => scrollToMessage(message._id)}>
                                        <img className="list__avatar" src={avatar} alt="user-avatar" />
                                        <div className="list__info">
                                            <p className="list__username">{message.user.username}</p>
                                            <div className="list__message-container">
                                                <p className="list__message">{message.message}</p>
                                            </div>
                                        </div>
                                        <p className="list__date-message" >
                                            {moment(message.createdAt).format('LT')}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            } else return <h4 className="messages-suggestion">Ingresa un mensaje a buscar</h4>
        } else return <h4 className="messages-not-found">No se han encontrado mensajes coincidentes. Pruebe buscando otro mensaje</h4>
    }
}

export default ShowMessages