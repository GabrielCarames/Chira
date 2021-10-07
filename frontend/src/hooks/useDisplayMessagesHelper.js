export function useDisplayMessagesHelper (setImages, setDisplayPreviousImage, scrollToBottom) {

    const url = process.env.REACT_APP_UPLOAD_URL
    
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
        } else return <p className="messages__message">{message.message}</p>
    }

    return {
        displayMessage
    }
}

export default useDisplayMessagesHelper