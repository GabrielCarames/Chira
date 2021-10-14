import socket from '../components/Socket'
import send from '../images/send.png'
import axios from 'axios'
import { usePreviousImageDispatch, usePreviousImageStore } from '../store/PreviousImageProvider'
import { previousImageTypes } from '../store/previousImageReducer'
import { memo } from 'react'

const DisplayPreviousImage = memo(({images, setDisplayPreviousImage}) => {

    const user = JSON.parse(localStorage.getItem('userLogged'))

    const { previousImage } = usePreviousImageStore()
    const previousImageDispatch = usePreviousImageDispatch()

    const uploadImage = async () => {
        const imageData = images[1]
        const data = new FormData()
        data.append("file", imageData)
        previousImageDispatch({
            type: previousImageTypes.hide
        })
        const res = await axios.post('/chat/uploadimage', data)
        socket.emit("sendMessage", user, res.data)
        // setDisplayPreviousImage(false)
    }

    return (
        <div className="main__previous-image previous">
            <div className="previous__close" onClick={() => previousImageDispatch({
            type: previousImageTypes.hide
        })}>
                <i className="fas fa-times"></i>
            </div>
            <div className="previous__image-container" id="previous__image">
                <div className="previous__image-item">
                    <img className="previous__image" src={images[0]} alt="previousImg" width="100" />
                </div>
            </div>
            {
                images[0].search('blob') !== -1 &&
                <div className="previous__bottom-container">
                    <button className="previous__send-image" type="submit" onClick={() => uploadImage()}>
                        <img className="previous__send-image-image" src={send} alt="previousImg" />
                    </button>
                </div>
            }
        </div>
    )
})

export default DisplayPreviousImage