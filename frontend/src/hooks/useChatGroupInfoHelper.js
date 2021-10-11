import { useState, useEffect } from 'react'
import socket from '../components/Socket'
import axios from 'axios'

export function useChatGroupInfoHelper (chat) {
    const [ groupImage, setGroupImage ] = useState()
    const url = process.env.REACT_APP_UPLOAD_URL

    useEffect(() => {
        socket.on('updatedGroupChat', (updatedGroupChat) => {
            const updatedAvatar = updatedGroupChat.avatar.title
            console.log("updated", updatedGroupChat)
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
        const res = await axios.post('http://localhost:3001/chat/uploadimage', data )
        console.log("estaimagensubida", res.data)
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