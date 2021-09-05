import { useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import socket from './Socket'
import axios from 'axios'
import moment from 'moment'

const MainContacts = ({messages, setMessages}) => {
    const [ chats, setChats ] = useState()
    const [ lastMessage, setLastMessage ] = useState()
    const user = JSON.parse(localStorage.getItem('userLogged'))
    const goToChat = (friendId) => {
        const userId = user._id
        socket.emit('goToChat', userId, friendId)
    }

    useEffect(async () => {
        const data = await axios.get('http://localhost:3001/chat/allchats')
        let chats = data.data
        setChats(chats)
        console.log("chats", chats)
    }, [])

    useEffect(async () => {
        setLastMessage(messages)
        console.log("JJOASDJOASDJAP´SDNPASFKASDFSDFKAEDGDAGDFSSDFGDFÑSG´FDLHOKTWERK", messages)
    }, [messages])
    
    return(
        <>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {user && 
                        user.friends.map((friend) => {
                            return (
                                <li className="list__item" onClick={() => goToChat(friend._id)}>
                                    <img className="list__avatar" src={avatar} alt="user-avatar" />
                                    {/* <div className="list__info">
                                        <p className="list__username">{friend.username}</p>
                                        <p className="list__messages">{ 
                                            chats && chats.map((chat) => {
                                                return chat.users.map((user) => {
                                                    if(user._id === friend._id) {
                                                        return chat.messages[chat.messages.length -1].message
                                                    } 
                                                })
                                            })
                                        }</p>
                                    </div>
                                    <h6 className="list__time-ago">
                                    {    
                                        chats && chats.map((chat) => {
                                            return chat.users.map((user) => {
                                                if(user._id === friend._id) {
                                                    return chat.messages[chat.messages.length -1].createdAt
                                                } 
                                            })
                                        })
                                        }
                                    </h6> */}
                                    {
                                        chats && chats.map((chat) => {
                                            return chat.users.map((user) => {
                                                if(user._id === friend._id) {
                                                    console.log(moment(chat.messages[chat.messages.length -1].createdAt).format("h:mm"))
                                                    return (
                                                        <>
                                                            <div className="list__info">
                                                                <p className="list__username">{friend.username}</p>
                                                                <p className="list__messages">{chat.messages[chat.messages.length -1].message}</p>
                                                            </div>
                                                            <h6 className="list__time-ago">{moment(chat.messages[chat.messages.length -1].createdAt).format("LT")}</h6>
                                                        </>
                                                    )
                                                } 
                                            })
                                        })
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </main>   
        </>
    )
}

export default MainContacts