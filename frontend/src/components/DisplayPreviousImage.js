import send from '../images/send.png'
import socket from '../components/Socket'
import axios from 'axios'

const DisplayPreviousImage = ({images, setDisplayPreviousImage, setMessagesSent}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))

    const uploadImage = async () => {
        console.log("RAR", images[1])
        const imageData = images[1]
        const data = new FormData()
        data.append("file", imageData)
        const res = await axios.post('http://localhost:3001/chat/upload', data)
        socket.emit("sendMessage", user, res.data)
        setDisplayPreviousImage(false)
    }

    return (
        <div className="main__previous-image previous">
            <div className="previous__close" onClick={() => setDisplayPreviousImage(false)}>
                <i className="fas fa-times"></i>
            </div>
            <div className="previous__image-container" id="previous__image">
                <div className="previous__image-item">
                    <img className="previous__image" src={images[0]} alt="" width="100" />
                </div>
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