import UploadImage from './UploadImage'

const FormContent = ({chosenEmoji, setInputMessage, seeMessage, images, setImages, showEmojiPicker, setShowEmojiPicker, setDisplayPreviousImage, messagesSent, user, chat, setShowNewMessageNotification, send, placeholder, setFocus}) => {
    return (
        <>
            <div className="main__emoji-container" onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)}>
                <i className="far fa-grin"></i>
            </div>
            <UploadImage images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage}/>
            <input className="main__input" id="cosa" value={chosenEmoji} type="text" name="message" placeholder={placeholder === 'desktop' ? "Escribe un mensaje aquí" : "Mensaje"}  autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seeMessage(messagesSent, user, chat, setShowNewMessageNotification)}} 
            onFocus={() => setFocus(true)} 
            onBlur={() => setFocus(false)}
            />
            <button className="main__send-message" type="submit">
                <img className="main__send-image" src={send} alt="" />
            </button>
        </>
    )
}

export default FormContent