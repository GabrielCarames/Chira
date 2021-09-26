import send from '../images/send.png'
import socket from '../components/Socket'

const DisplayPreviousImage = ({images, setDisplayPreviousImage, setMessagesSent}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))

    const uploadImage = () => {
        const imageUrl = images[0].data_url
        console.log(imageUrl)
        socket.emit("sendMessage", user, imageUrl)
        setDisplayPreviousImage(false)
    }

    return (
        <div className="main__previous-image previous">
            <div className="previous__close" onClick={() => setDisplayPreviousImage(false)}>
                <i className="fas fa-times"></i>
            </div>
            <div className="previous__image-container" id="previous__image">
                {images.map((image, index) => (
                    <div key={index} className="previous__image-item">
                        <img className="previous__image" src={image.data_url} alt="" width="100" />
                    </div>
                ))}
            </div>
            <div className="previous__bottom-container">
                <button className="previous__send-image" type="submit" onClick={() => uploadImage()}>
                    <img className="previous__send-image-image" src={send} alt="" />
                </button>
            </div>
        </div>
    )
}

export default DisplayPreviousImage