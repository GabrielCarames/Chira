import { useState, useEffect, useContext } from "react"
import TestContext from "../contexts/TestContext"
import socket from "../components/Socket"
import { useChatDispatch, useChatStore } from "../store/ChatProvider";
import { chatTypes } from "../store/chatReducer";
import { useSelector, useDispatch } from 'react-redux'

export function useChathelper (setDisplayChat) {
    const [ connectedContact, setConnectedContact ] = useState([]);
    const [ groupImage, setGroupImage ] = useState()
    // const { chat, setChat } = useContext(TestContext)
    // const [ chat, setChat ] = useState() este era el ultimo que use 

    // const { chat } = useChatStore()
    // const dispatch = useChatDispatch()
    
    const chat = useSelector(state => state.chatReducer)
    const dispatch = useDispatch()
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))

    const url = process.env.REACT_APP_UPLOAD_URL

    const contact = chat && chat.users.filter((user) => user.username !== userLogged.username)[0]
    
    const setConnectedContactState = (users) => setConnectedContact(users.filter((user) => user.userLoggedId === contact._id))


    useEffect(() => {
        socket.on("chatFound", (chat) => {
            const chata = {
                "messages": [
                  {
                    "message": "hola",
                    "seen": true,
                    "_id": "615d9cdd618468065cc30e81",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T12:55:57.569Z",
                    "__v": 0
                  },
                  {
                    "message": "para",
                    "seen": true,
                    "_id": "615d9e88c8a2a430782ec8ae",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T13:03:04.111Z",
                    "__v": 0
                  },
                  {
                    "message": "ceta",
                    "seen": true,
                    "_id": "615d9e88c8a2a430782ec8bd",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T13:03:04.942Z",
                    "__v": 0
                  },
                  {
                    "message": "mol",
                    "seen": true,
                    "_id": "615d9e8ac8a2a430782ec8cc",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T13:03:06.278Z",
                    "__v": 0
                  },
                  {
                    "message": "dame",
                    "seen": true,
                    "_id": "615d9e8cc8a2a430782ec8db",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T13:03:08.192Z",
                    "__v": 0
                  },
                  {
                    "message": "uno",
                    "seen": true,
                    "_id": "615d9e8cc8a2a430782ec8ea",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T13:03:08.869Z",
                    "__v": 0
                  },
                  {
                    "message": "ya",
                    "seen": true,
                    "_id": "615d9e8dc8a2a430782ec8f9",
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-06T13:03:09.582Z",
                    "__v": 0
                  },
                  {
                    "message": "false",
                    "seen": true,
                    "_id": "615f56e044506e36a8b260dc",
                    "image": {
                      "_id": "615f56df44506e36a8b260da",
                      "title": "MVIMG_20210607_184640.jpg",
                      "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\MVIMG_20210607_184640.jpg",
                      "mimetype": "image/jpeg",
                      "size": 1092829,
                      "createdAt": "2021-10-07T20:21:51.910Z",
                      "__v": 0
                    },
                    "user": {
                      "contacts": [
                        "615d99acdd64643778d7661c",
                        "615d9a5418ceac366c24fec5"
                      ],
                      "avatar": {
                        "_id": "615d9331b45437264036e417",
                        "title": "IMG_20210222_091236.jpg",
                        "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                        "mimetype": "image/jpeg",
                        "size": 5797580,
                        "createdAt": "2021-10-06T12:14:41.432Z",
                        "__v": 0
                      },
                      "_id": "615d91e9b45437264036e40d",
                      "username": "tachancka",
                      "phoneNumber": "+541139153268",
                      "__v": 0,
                      "socketId": "Fo0FZkfylHMiMWaWAAAG"
                    },
                    "createdAt": "2021-10-07T20:21:52.004Z",
                    "__v": 0
                  },
                  {
                    "message": "che",
                    "seen": true,
                    "_id": "615f576d44506e36a8b26111",
                    "user": {
                      "contacts": [
                        "615d91e9b45437264036e40d"
                      ],
                      "avatar": "https://w7.pngwing.com/pngs/971/686/png-transparent-computer-icons-social-media-blog-avatar-material-service-logo-material.png",
                      "_id": "615d99acdd64643778d7661c",
                      "username": "petete",
                      "phoneNumber": "+541199999999",
                      "__v": 0,
                      "socketId": "KNdvHGQCpLFmLxZxAAAA"
                    },
                    "createdAt": "2021-10-07T20:24:13.842Z",
                    "__v": 0
                  }
                ],
                "users": [
                  {
                    "contacts": [
                      "615d99acdd64643778d7661c",
                      "615d9a5418ceac366c24fec5"
                    ],
                    "avatar": {
                      "_id": "615d9331b45437264036e417",
                      "title": "IMG_20210222_091236.jpg",
                      "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
                      "mimetype": "image/jpeg",
                      "size": 5797580,
                      "createdAt": "2021-10-06T12:14:41.432Z",
                      "__v": 0
                    },
                    "_id": "615d91e9b45437264036e40d",
                    "username": "tachancka",
                    "phoneNumber": "+541139153268",
                    "__v": 0,
                    "socketId": "Fo0FZkfylHMiMWaWAAAG"
                  },
                  {
                    "contacts": [
                      "615d91e9b45437264036e40d"
                    ],
                    "avatar": "https://w7.pngwing.com/pngs/971/686/png-transparent-computer-icons-social-media-blog-avatar-material-service-logo-material.png",
                    "_id": "615d99acdd64643778d7661c",
                    "username": "petete",
                    "phoneNumber": "+541199999999",
                    "__v": 0,
                    "socketId": "KNdvHGQCpLFmLxZxAAAA"
                  }
                ],
                "avatar": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F9%2F9272.png&f=1&nofb=1",
                "_id": "615d99e6dd64643778d7663a",
                "type": "private",
                "createdAt": "2021-10-06T12:43:18.561Z",
                "__v": 0
              }
              dispatch({
                type: '@initialChat',
                payload: chat
              })
            //   dispatch({
            //     type: chatTypes.updateChat,
            //     updatedChat: chat
            // })
        });
        socket.on("getUsersConnected", (users) => {
            chat && setConnectedContactState(users)
        });
        socket.on('updatedGroupChat', (updatedGroupChat) => {
            setGroupImage(updatedGroupChat)
        })
    })

    const backToMainContacts = () => {
        // dispatch({
        //   type: chatTypes.updateChat,
        //   updatedChat: false
        // })
        setDisplayChat(false)
    }

    const displayName = () => {
        if(chat.name) return chat.name
        else return contact.username
    }

    const displayAvatar = (chat) => {
        if(chat.name) {
            console.log("avatar", chat.avatar)
            if(groupImage && groupImage._id === chat._id) {
                return url + groupImage.avatar.title
            }else if(chat.avatar.title) {
                return url + chat.avatar.title
            }else return chat.avatar
            
        } else {
            const contact = chat.users.filter((contact) => contact._id !== userLogged._id)[0]
            if(contact.avatar.title) {
                return url + contact.avatar.title
            } else return contact.avatar
        }
    }

    return {
        contact,
        backToMainContacts,
        displayName,
        displayAvatar,
        connectedContact
    }
}

export default useChathelper