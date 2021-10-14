import { useEffect } from 'react'
import socket from '../components/Socket'
import axios from 'axios'

export function useEditProfileHelper (updatedProfileImage, setUpdatedProfileImage) {

    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    
    const url = process.env.REACT_APP_UPLOAD_URL

    useEffect(() => {
        socket.on('newImageProfileUpdated', (updatedUser) => {
            setUpdatedProfileImage(updatedUser)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const verifyImage = async (e) => {
        const imageData = e.target.files[0]
        const data = new FormData()
        data.append("file", imageData)
        const res = await axios.post('/chat/uploadimage', data )
        socket.emit('newImageProfile', userLogged._id, res.data)
    };

    const displayAvatar = () => {
        if(updatedProfileImage) {
            return url + updatedProfileImage.avatar.title
        }else {
            if(!userLogged.avatar.title) {
                return userLogged.avatar
            } else return url + userLogged.avatar.title
        }
    }

    return {
       verifyImage,
       displayAvatar
    }
}

export default useEditProfileHelper