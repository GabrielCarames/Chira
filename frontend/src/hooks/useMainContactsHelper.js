import { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import socket from "../components/Socket"

export function useMainContactsHelper (setChats, messagesSent, setLastMessage, setDisplayChat) {
    const [ lastRecentMessage, setLastRecentMessage ] = useState()
    const [ groupImage, setGroupImage ] = useState()

    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const url = process.env.REACT_APP_UPLOAD_URL

    const goToChat = chat => {
        if(chat.type === 'group') {
            setDisplayChat(true)
            socket.emit('goToGroupChat', chat.name)
        } else {
            const contactId = chat.users.filter((user) => user._id !== userLogged._id)[0]._id
            setDisplayChat(true)
            socket.emit('goToChat', userLogged._id, contactId)
        }
    }

    useEffect(() => {
        const getAllChats = async () => {
            messagesSent && setLastMessage(messagesSent)
            const res = await axios.post('/chat/allchatsfromuserlogged', {userLogged})
            const chats = res.data
            chats && setChats(chats)
        }
        getAllChats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messagesSent])

    useEffect(() => {
        socket.on("newNotification", (newMessage, contactChat) => {
            setLastRecentMessage(newMessage)
        });
    }, [])

    useEffect(() => {
        socket.on('updatedGroupChat', (updatedGroupChat) => {
            setGroupImage(updatedGroupChat)
        })
    })
    
    const activeMessageNotificationIcon = (chat) => {
        if(chat.messages.length !== 0) {
            if(!chat.messages[chat.messages.length -1].seen && chat.messages[chat.messages.length -1].user.username !== userLogged.username) {
                return 'far fa-comment-dots active'
            } else return 'far fa-comment-dots'
        }
    }

    const showHistoryLastMessage = (historyLastMessage) => {
        const lastMessage = historyLastMessage
        if(lastMessage === 'false') {
            return 'Foto'
        } else return lastMessage
    }

    const showRecentLastMessage = (lastMessager, setLastMessager) => {
        setLastMessager(lastRecentMessage.message)
        if(lastMessager === 'false') {
            return 'Foto'
        } else {
            return lastMessager
        }
    }

    const showLastMessage = (messages, users, lastMessager, setLastMessager) => {
        
        const contactUsername = users.filter((user) => user._id !== userLogged._id)[0].username
        if(lastRecentMessage && lastMessager === lastRecentMessage.message) {
            return showHistoryLastMessage(messages[messages.length -1].message)
        } else {

            if(lastRecentMessage && contactUsername === lastRecentMessage.user.username) { //si recibiste un mensaje
                return showRecentLastMessage(lastMessager, setLastMessager)
            }else if(messages.length !== 0) {
                return showHistoryLastMessage(messages[messages.length -1].message)
            } else return ''
        }
    }

    const showTimeAgoMessage = (messages) => {
        return lastRecentMessage //Si el userLogged recibió un mensaje para EL
            ? moment(lastRecentMessage.createdAt).format("LT")
            : messages.length !== 0
                ? moment(messages[messages.length -1].createdAt).format("LT") 
                : ''
    }

    const displayName = (chat) => {
        if(chat.name) {
            return chat.name
        } else {
            const users = chat.users
            return users.filter((user) => user._id !== userLogged._id)[0].username
        }
    }

    const showSeenIcon = (lastMessage) => {
        if(lastMessage.user.username === userLogged.username) {
            if(lastMessage.seen) {
                return <i className="fas fa-check-double"></i> 
            } else return <i className="fas fa-check"></i>
        }
    }

    const displayAvatar = (chat) => {
        if(chat.name) {
            if(groupImage && groupImage._id === chat._id) {
                return url + groupImage.avatar.title
            } else return url + chat.avatar.title
        } else {
            const contact = chat.users.filter((contact) => contact._id !== userLogged._id)[0]
            if(contact.avatar.title) {
                return url + contact.avatar.title
            } else return contact.avatar
        }
    }

    return {
        goToChat, 
        activeMessageNotificationIcon, 
        showLastMessage, 
        showTimeAgoMessage, 
        displayName, 
        showSeenIcon, 
        displayAvatar
    }
}

export default useMainContactsHelper