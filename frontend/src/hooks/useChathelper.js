import { useState, useEffect, useContext } from "react"
import TestContext from "../contexts/TestContext"
import socket from "../components/Socket"

export function useChathelper (setDisplayChat, ) {
    const { chat, setChat } = useContext(TestContext)
    const [ groupImage, setGroupImage ] = useState()
    const [ connectedContact, setConnectedContact ] = useState([]);

    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const url = process.env.REACT_APP_UPLOAD_URL
    const contact = chat && chat.users.filter((user) => user.username !== userLogged.username)[0]
    const setConnectedContactState = (users) => setConnectedContact(users.filter((user) => user.userLoggedId === contact._id))

    useEffect(() => {
        socket.on("chatFound", (chat) => {
            setChat(chat);
        });
        socket.on("getUsersConnected", (users) => {
            chat && setConnectedContactState(users)
        });
        socket.on('updatedGroupChat', (updatedGroupChat) => {
            setGroupImage(updatedGroupChat)
        })
    })

    const backToMainContacts = () => {
        setChat(false)
        setDisplayChat(false)
    }

    const displayName = () => {
        if(chat.name) return chat.name
        else return contact.username
    }

    const displayAvatar = (chat) => {
        if(chat.name) {
            if(groupImage && groupImage._id === chat._id) {
                return url + groupImage.avatar.title
            }else return url + chat.avatar.title
        } else {
            const contact = chat.users.filter((contact) => contact._id !== userLogged._id)[0]
            if(contact.avatar.title) {
                return url + contact.avatar.title
            } else return contact.avatar
        }
    }

    return {
        chat, 
        contact,
        backToMainContacts,
        displayName,
        displayAvatar,
        connectedContact
    }
}

export default useChathelper