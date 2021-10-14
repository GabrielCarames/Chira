import { useState, useEffect, useRef, useContext  } from 'react'
import socket from '../components/Socket';
import { useChatsDispatch, useChatsStore } from '../store/ChatsProvider';
import { useChatDispatch, useChatStore } from '../store/ChatProvider';
import { chatsTypes } from '../store/chatsReducer';
import { chatTypes } from '../store/chatReducer';

export function useChatMessagesHelper (messagesSent, setMessagesSent, user, focus ) {
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const messagesEndRef = useRef(null)
    const [ doScroll, setDoScroll ] = useState(false)

    // const { chats, setChats } = useContext(ChatsContext)
    
    const { chats } = useChatsStore()
    const chatsDispatch = useChatsDispatch()

    const { chat } = useChatStore()
    const chatDispatch = useChatDispatch()

    console.log("memandaloriaron", chat)
    useEffect(() => {
        socket.on("messageSent", (newMessage) => {

            const contact = chat.users.filter((userInChat) => userInChat._id !== user._id)[0]
            // console.log("newMessage.user.username", newMessage.message, "user.username", user.username)
            // setMessagesSent(messagesSent => [...messagesSent, newMessage]); //Representa los mensajes enviados ahora mismo en el chat, no el historial.
            
            console.log("allboys", chat)
            const currentlyChatIndex = chats.findIndex((chatToFind) => chatToFind._id === chat._id)
            const currentlyChat = chats[currentlyChatIndex]
            chats[currentlyChatIndex].messages.push(newMessage)
            // setChats([...chats[currentlyChatIndex].messages, newMessage])
            console.log("currentlyChat", currentlyChat)
            console.log("chatstodosdeldisaptch este", chats)
            newMessage.user.username === user.username && socket.emit('newMessageNotification', chats, contact)
            console.log("contacto", contact)
            chatDispatch({
                type: chatTypes.updateChat,
                updatedChat: currentlyChat
            })
            // setChat(currentlyChat)
            // chats => chats.map((chat, index) => index === currentlyChatIndex ? 
            // { ...chat, messages: [...chat.messages, newMessage] } : chat
            chatsDispatch({
                type: chatsTypes.updateChats,
                updatedChats: chats
            })
            // setChats(chats => chats.map((chat, index) => index === currentlyChatIndex ? 
            // { ...chat, messages: [...chat.messages, newMessage] } : chat))

            // chats => [...chats[currentlyChatIndex].messages, newMessage])
            // chats => [...chats, cosa]
            setDoScroll(newMessage)
        });
        socket.on("messageAlreadySeen", (updatedChats) => {
            console.log("updatedchatdelarelgadydsene", updatedChats)
            const currentlyChat = updatedChats.filter((chatToFind) => chatToFind._id === chat._id)[0]
            console.log("currentlychatdelpeus", currentlyChat)
            chatDispatch({
                type: chatTypes.updateChat,
                updatedChat: currentlyChat
            })
            chatsDispatch({
                type: chatsTypes.updateChats,
                updatedChats: updatedChats
            })
        })
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
    }, [doScroll, focus, chat]);

    return {
        messagesEndRef,
        showEmojiPicker,
        scrollToBottom,
        setShowEmojiPicker
    }
}

export default useChatMessagesHelper