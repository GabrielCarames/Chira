import { useState, useEffect } from 'react'
import socket from '../components/Socket'
import axios from 'axios'

export function useChatGroupInfoHelper (chat) {
    const [ groupImage, setGroupImage ] = useState()
    const url = process.env.REACT_APP_UPLOAD_URL

    useEffect(() => {
        socket.on('updatedGroupChat', (updatedGroupChat) => {
            const updatedAvatar = updatedGroupChat.avatar.title
            setGroupImage(updatedAvatar)
        })
    })

    const displayAvatar = (avatar) => {
        if(groupImage) {
            return url + groupImage
        }else {
            if(avatar.title) {
                return url + avatar.title
            } else return avatar
        }
    }

    const changeGroupImage = async (e) => {
        const imageData = e.target.files[0]
        const data = new FormData()
        data.append("file", imageData)
        const res = await axios.post('/chat/uploadimage', data )
        socket.emit('newGroupImage', chat._id, res.data)
    }

    const displayContactAvatar = (contact) => {
        if(contact.avatar.title) {
            return url + contact.avatar.title
        } else return contact.avatar
    }
    
    return {
        displayAvatar,
        changeGroupImage,
        displayContactAvatar
    }
}

export default useChatGroupInfoHelper