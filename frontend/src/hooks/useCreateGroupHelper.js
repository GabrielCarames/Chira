import { useState, useEffect } from "react"
import socket from "../components/Socket"
import axios from 'axios'
import avatar from '../images/avatar.png'

export function useCreateGroupHelper (groupContacts, setGroupContacts) {
    const [ groupImage, setGroupImage ] = useState(avatar)
    const [ form, setForm ] = useState()

    const userLogged = JSON.parse(localStorage.getItem('userLogged'))

    const url = process.env.REACT_APP_UPLOAD_URL
  
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const uploadImage = async (e) => {
        const imageData = e.target.files[0]
        const data = new FormData()
        data.append("file", imageData)
        const res = await axios.post('http://localhost:3001/chat/uploadimage', data )
        socket.emit('newImageProfile', userLogged._id, res.data)
    };

    const createGroup = async (e, groupContacts) => {
        e.preventDefault()
        const groupName = form.groupName
        const groupImageToUpload = groupImage.imageToUpload
        groupContacts.push(userLogged)
        var newImage
        if(groupImageToUpload) {
            const data = new FormData()
            data.append("file", groupImageToUpload)
            const response = await axios.post('http://localhost:3001/chat/uploadimage', data)
            newImage = response.data
        } else newImage = groupImage
        await axios.post('http://localhost:3001/chat/creategroup', {groupName, newImage, groupContacts} )
        socket.emit('goToGroupChat', groupName)
    }

    const addContactsToGroupList = (contact) => {
        setGroupContacts([...groupContacts, contact])
    }

    useEffect(() => {
        document.getElementById('add-contacts__button').className = 'add-contacts__button active'
    }, [])

    const displayAvatar = (contact) => {
        if(contact.avatar.title) {
            return url + contact.avatar.title
        } else return contact.avatar
    }

    return {
        addContactsToGroupList,
        groupImage,
        setGroupImage,
        handleChange,
        createGroup,
        displayAvatar
    }
}

export default useCreateGroupHelper