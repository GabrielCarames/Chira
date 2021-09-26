import DisplaySeenIcon from './DisplaySeenIcon'
import moment from 'moment'

const DisplayMessages = (({message, user, goToMessage, images}) => {
    const displayMessage = (message) => {
        if(message.search("image") >= 1) {
            return <img className="messages__image" src={message} alt="" width="100" />
        }
        else return message
    }

    return (
        message.user.username === user.username || message.username === user.username ?
        <div className={goToMessage === message._id ? 'messages-user-logged-messages active' : 'messages-user-logged-messages'} key={message._id} id={message._id}>
            <div className="messages-message-container">
                <span className="messages__username">{message.user.username}</span>
                <p className="messages__message">{displayMessage(message.message)}</p>
                <div className="message__info">
                    <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                    <DisplaySeenIcon message={message}/>
                </div>
            </div>
        </div>
        : 
        <div className={goToMessage === message._id ? 'messages-contact-messages active' : 'messages-contact-messages'} key={message._id} id={message._id}>
            <div className="messages-message-container">
                <span className="messages__username">{message.user.username}</span>
                <p className="messages__message">{message.message}</p>
                <div className="message__info">
                    <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                </div>
            </div>
        </div>
    )
})

export default DisplayMessages