import { useState, useEffect, useRef  } from 'react'
import socket from '../components/Socket';

export function useChatMessagesHelper (chat, setChat, messagesSent, setMessagesSent, user, focus, chats, setChats) {
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const messagesEndRef = useRef(null)
    const [ doScroll, setDoScroll ] = useState(false)
    useEffect(() => {
        socket.on("messageSent", (newMessage) => {
            console.log("memandaloriaron")
            // const contact = chat.users.filter((userInChat) => userInChat._id !== user._id)
            // console.log("newMessage.user.username", newMessage.message, "user.username", user.username)
            // newMessage.user.username === user.username && socket.emit('newMessageNotification', newMessage, user, contact)
            // setMessagesSent(messagesSent => [...messagesSent, newMessage]); //Representa los mensajes enviados ahora mismo en el chat, no el historial.

            let allChats = chats
            console.log("allboys", allChats)
            const currentlyChat = allChats.filter((chatToFind) => chatToFind._id === chat._id)[0]
            currentlyChat.messages.push(newMessage)
            setChats(allChats)
            console.log("currentlyChat", currentlyChat.messages)
            setChat(currentlyChat)
            setDoScroll(newMessage)
        });
    }, []);


    window.onclick = (event) => {
        if(showEmojiPicker && !document.getElementsByClassName('emoji-picker-react')[0].contains(event.target) && event.target.className !== 'far fa-grin' && event.target.className !== 'main__emoji-container') {
            setShowEmojiPicker(false)
        }
    }
      
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView()

    useEffect(() => {
        scrollToBottom()
        focus && 
        setTimeout(() => {
            scrollToBottom()
        }, 500);
    }, [doScroll, focus]);

    return {
        messagesEndRef,
        showEmojiPicker,
        scrollToBottom,
        setShowEmojiPicker
    }
}

export default useChatMessagesHelper