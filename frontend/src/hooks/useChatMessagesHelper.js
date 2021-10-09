import { useState, useEffect, useRef  } from 'react'
import socket from '../components/Socket';

export function useChatMessagesHelper (chat, messagesSent, setMessagesSent, user, focus) {
    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        socket.on("messageSent", async (newMessage) => {
            const contact = chat.users.filter((userInChat) => userInChat._id !== user._id)
            newMessage.user.username === user.username && socket.emit('newMessageNotification', newMessage, user, contact)
            setMessagesSent([...messagesSent, newMessage]); //Representa los mensajes enviados ahora mismo en el chat, no el historial.
        });
        return () => {
          socket.off();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messagesSent]);

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
    }, [messagesSent, focus]);

    return {
        messagesEndRef,
        showEmojiPicker,
        scrollToBottom,
        setShowEmojiPicker
    }
}

export default useChatMessagesHelper