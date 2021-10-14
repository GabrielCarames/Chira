import { useState, memo } from 'react'
import useMainContactsHelper from '../hooks/useMainContactsHelper'
import { useChatsDispatch, useChatsStore } from '../store/ChatsProvider'

const MainContacts = ({messagesSent, setLastMessage, setDisplayChat, lastMessager, setLastMessager}) => {
    // const [ chats, setChats ] = useState()
    const { goToChat, activeMessageNotificationIcon, showLastMessage, showTimeAgoMessage, displayName, showSeenIcon, displayAvatar } = useMainContactsHelper(messagesSent, setLastMessage, setDisplayChat)
    const { chats } = useChatsStore()
    console.log("maincontacts", chats)

    return(
        <div>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {chats && 
                        chats.map((chat) => {
                            // console.log("chat", chat)
                            return (
                                <li className="list__item" onClick={() => goToChat(chat)} key={chat._id} id={chat._id}>
                                    <div className="list__avatar-container">
                                        <img className="list__avatar" src={displayAvatar(chat)} alt="user-avatar" />
                                    </div>
                                    <div className="list__info">
                                        <p className="list__name">{displayName(chat)}</p>
                                        <div className="list__message-container">
                                            {chat.messages.length !== 0 && showSeenIcon(chat.messages[chat.messages.length -1])}
                                            <p className="list__messages">{ showLastMessage(chat.messages, chat.users)}</p>
                                        </div>
                                    </div>
                                    <div className="list__message-info">
                                        <i className={activeMessageNotificationIcon(chat)}></i>
                                        <h6 className="list__time-ago" id="notification">{showTimeAgoMessage(chat.messages)} </h6>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </div>
    )
}

export default MainContacts