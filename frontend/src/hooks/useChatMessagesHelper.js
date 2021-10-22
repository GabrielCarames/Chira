import { useState, useEffect, useRef, useContext  } from 'react'
import socket from '../components/Socket';
import { useChatsDispatch, useChatsStore } from '../store/ChatsProvider';
import { useChatDispatch, useChatStore } from '../store/ChatProvider';
import { chatsTypes } from '../store/chatsReducer';
import { chatTypes } from '../store/chatReducer';
import { useSelector, useDispatch } from 'react-redux'

export function useChatMessagesHelper (messagesSent, setMessagesSent, user, focus ) {
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const messagesEndRef = useRef(null)
    const [ doScroll, setDoScroll ] = useState(false)

    // const { chats, setChats } = useContext(ChatsContext)
    
    // const { chats } = useChatsStore()
    // const chatsDispatch = useChatsDispatch()

    // const { chat } = useChatStore()
    // const chatDispatch = useChatDispatch()

    const chat = useSelector(state => state.chatReducer)
    const chats = useSelector(state => state.chatsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on("messageSent", (newMessage) => {
            const contact = chat.users.filter((userInChat) => userInChat._id !== user._id)[0]
            const currentlyChatIndex = chats.findIndex((chatToFind) => chatToFind._id === chat._id)
            const currentlyChat = chats[currentlyChatIndex]
            console.log("chat de ahora", chat)
            const updatedChat = { ...chat, messages: [...chat.messages, newMessage] }
            newMessage.user.username === user.username && socket.emit('newMessageNotification', chats, contact)
            dispatch({
                type: '@updateChat',
                payload: updatedChat
            })
            dispatch({
                type: '@updateChats',
                payload: chats
            })
            setDoScroll(newMessage)
        });
        socket.on("messageAlreadySeen", (updatedChats) => {
            const currentlyChat = updatedChats.filter((chatToFind) => chatToFind._id === chat._id)[0]
            dispatch({
                type: '@updateChat',
                payload: currentlyChat
            })
            dispatch({
                type: '@updateChats',
                payload: chats
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