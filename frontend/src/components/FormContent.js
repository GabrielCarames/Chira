import UploadImage from './UploadImage'

const FormContent = ({inputOnSubmit, chosenEmoji, setChosenEmoji, setInputMessage, seeMessage, images, setImages, showEmojiPicker, setShowEmojiPicker, setDisplayPreviousImage, messagesSent, user, chat, setShowNewMessageNotification, send}) => {
    return (
        <>
            <div className="main__emoji-container" onClick={() => showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)}>
                <i className="far fa-grin"></i>
            </div>
            <UploadImage images={images} setImages={setImages} setDisplayPreviousImage={setDisplayPreviousImage}/>
            <input className="main__input" id="cosa" value={chosenEmoji} type="text" name="message" placeholder="Escribe un mensaje aquí" autoComplete="off" onChange={(e) => setInputMessage(e.target.value)} onClick={() => {seeMessage(messagesSent, user, chat, setShowNewMessageNotification)}}/>
            <button className="main__send-message" type="submit">
                <img className="main__send-image" src={send} alt="" />
            </button>
        </>
    )
}

export default FormContent