import socket from '../components/Socket'
import { useChatsDispatch, useChatsStore } from '../store/ChatsProvider'
import { chatsTypes } from '../store/chatsReducer'

export function useSeenMessageHelper() {
  
  const { chats } = useChatsStore()
  const chatsDispatch = useChatsDispatch()
  
  const updateSeenMessagesFromChat = (user, chat) => {
    const currentlyChatIndex = chats.findIndex((chatToFind) => chatToFind._id === chat._id)
    const currentlyChat = chats[currentlyChatIndex]
    const messagesToSetSeen = currentlyChat.messages.filter((message) => message.user._id !== user._id)
    messagesToSetSeen.map((message) => message.seen = true)
    console.log("messagestosetseen", messagesToSetSeen)
    console.log("chats", chats)
    return chats
    
  }

  const warnMessageSeen = (user, chat, contactIdToAdviseSeenMessage, setShowNewMessageNotification, lastMessage) => {
    document.getElementById(chat._id).children[2].children[0].classList = 'far fa-comment-dots'
    setShowNewMessageNotification(false)
    const updatedChats = updateSeenMessagesFromChat(user, chat)
    // dispatch({
    //   type: types.updateChats,
    //   updatedChats: updatedChats
    // })
    socket.emit('seenMessage', contactIdToAdviseSeenMessage, updatedChats, lastMessage)
  }
  
  const seeMessage = (messagesSent, user, chat, setShowNewMessageNotification) => {
    const chatLastMessage = chat.messages[chat.messages.length -1]
    if(chat.messages.length !== 0 && chatLastMessage.user._id !== user._id) {
      const contactIdToAdviseSeenMessage = chatLastMessage.user._id
      warnMessageSeen(user, chat, contactIdToAdviseSeenMessage, setShowNewMessageNotification, chatLastMessage)
    }
  }

  return {
    seeMessage
  }
}

export default useSeenMessageHelper