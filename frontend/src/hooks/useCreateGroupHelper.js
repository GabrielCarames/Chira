import { useState, useEffect } from "react"
import axios from 'axios'
import socket from "../components/Socket"
import avatar from '../images/avatar.png'
export function useCreateGroupHelper (groupContacts, setGroupContacts) {
    // const [ groupContacts, setGroupContacts ] = useState([])
    const [ form, setForm ] = useState()
    const [ groupImage, setGroupImage ] = useState(avatar)

    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
  

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

    const createGroup = async (e, groupContacts) => { //le tengo que pasar el estado como parametro porque sino se pierde
        e.preventDefault()
        const groupName = form.groupName
        const groupImageToUpload = groupImage.imageToUpload
        console.log("rotativas", groupImageToUpload, groupImage)
        groupContacts.push(userLogged)
        var newImage
        if(groupImageToUpload) {
            const data = new FormData()
            data.append("file", groupImageToUpload)
            const response = await axios.post('http://localhost:3001/chat/uploadimage', data)
            newImage = response.data
        } else newImage = groupImage
        const res = await axios.post('http://localhost:3001/chat/creategroup', {groupName, newImage, groupContacts} )
        console.log("daleursula", res) 
        // newGroupChat
        socket.emit('goToGroupChat', groupName)
    }

    const addContactsToGroupList = (contact) => {
        setGroupContacts([...groupContacts, contact])
    }

    return {
        addContactsToGroupList,
        groupImage,
        setGroupImage,
        handleChange,
        createGroup
    }
}

export default useCreateGroupHelper