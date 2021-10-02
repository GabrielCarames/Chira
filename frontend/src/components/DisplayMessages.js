import DisplaySeenIcon from './DisplaySeenIcon'
import moment from 'moment'

const DisplayMessages = (({message, user, goToMessage, scrollToBottom, setImages, setDisplayPreviousImage}) => {

    const url = 'http://localhost:3001/public/uploads/'
    
    const displayPreviousImage = (pathImage) => {
        setImages([pathImage])
        setDisplayPreviousImage(true)
    }
    
    const displayMessage = (message) => {
        if(message.message === 'false') {
            const imageSource = url + message.image.title
            const img = new Image();
            img.src = message.image.title;
            return <img className="messages__image" loading='lazy' onClick={() => displayPreviousImage(imageSource)} onLoad={() => scrollToBottom()} src={imageSource} alt="contactImage" />
        }else return <p className="messages__message">{message.message}</p>
    }

    return (
        message.user.username === user.username || message.username === user.username ?
        <div className={goToMessage === message._id ? 'messages-user-logged-messages active' : 'messages-user-logged-messages'} key={message._id} id={message._id}>
            <div className="messages-message-container">
                <span className="messages__username">{message.user.username}</span>
                {displayMessage(message)}
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
                {displayMessage(message)}
                <div className="message__info">
                    <h6 className="messages__timeago">{moment(message.createdAt).format('LT')}</h6>
                </div>
            </div>
        </div>
    )
})

export default DisplayMessages