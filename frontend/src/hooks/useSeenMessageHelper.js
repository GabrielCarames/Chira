import socket from '../components/Socket'

export function useSeenMessageHelper() {
  
  const warnMessageSeen = (user, chat, contactIdToAdviseSeenMessage, setShowNewMessageNotification, lastMessage) => {
    document.getElementById(chat._id).children[2].children[0].classList = 'far fa-comment-dots'
    setShowNewMessageNotification(false)
    socket.emit('seenMessage', user, contactIdToAdviseSeenMessage, lastMessage)
  }
  
  const seeMessage = (messagesSent, user, chat, setShowNewMessageNotification) => {
    const chatLastMessage = chat.messages[chat.messages.length -1]
    const recentLastMessage = messagesSent[messagesSent.length -1]
    if(messagesSent && messagesSent.length !== 0 && recentLastMessage.user._id !== user._id) {
      const contactIdToAdviseSeenMessage = recentLastMessage.user._id
      warnMessageSeen(user, chat, contactIdToAdviseSeenMessage, setShowNewMessageNotification, recentLastMessage)
    } else if(chat.messages.length !== 0 && chatLastMessage.user._id !== user._id) {
      const contactIdToAdviseSeenMessage = chatLastMessage.user._id
      warnMessageSeen(user, chat, contactIdToAdviseSeenMessage, setShowNewMessageNotification, chatLastMessage)
    }
  }

  return {
    seeMessage
  }
}

export default useSeenMessageHelper