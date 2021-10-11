import { useState, useContext, memo, useEffect } from 'react'
import BurgerMenu from './BurgerMenu';
import Chat from './Chat';
import useMainHelper from '../hooks/useMainHelper';
import DisplayChatContext from '../contexts/DisplayChatContext';
// import TestContext from '../contexts/TestContext';
// import useMainContactsHelper from '../hooks/useMainContactsHelper';
const Main = memo(({setUserLoggedMain}) => {
    const [ showNewMessageNotification, setShowNewMessageNotification ] = useState(false)
    const [ displayConfiguration, setDisplayConfiguration ] = useState(false)
    const [ displayBurgerMenu, setDisplayBurgerMenu ] = useState(false)
    const [ displayEditProfile, setDisplayEditProfile ] = useState()
    const [ addContactsMenu, setAddContactsMenu ] = useState(false)
    const [ messagesSent, setMessagesSent ] = useState("");
    const { displayChat, setDisplayChat } = useContext(DisplayChatContext)
    const { displayLeftContent } = useMainHelper(messagesSent, displayBurgerMenu, setDisplayBurgerMenu, addContactsMenu, setAddContactsMenu, displayConfiguration, setDisplayConfiguration, displayEditProfile, setDisplayEditProfile, displayChat, setDisplayChat)
    // const { chat, setChat } = useContext(TestContext)

    // const chata = {
    //             "messages": [
    //               {
    //                 "message": "hola",
    //                 "seen": true,
    //                 "_id": "615d9cdd618468065cc30e81",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T12:55:57.569Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "para",
    //                 "seen": true,
    //                 "_id": "615d9e88c8a2a430782ec8ae",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T13:03:04.111Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "ceta",
    //                 "seen": true,
    //                 "_id": "615d9e88c8a2a430782ec8bd",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T13:03:04.942Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "mol",
    //                 "seen": true,
    //                 "_id": "615d9e8ac8a2a430782ec8cc",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T13:03:06.278Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "dame",
    //                 "seen": true,
    //                 "_id": "615d9e8cc8a2a430782ec8db",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T13:03:08.192Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "uno",
    //                 "seen": true,
    //                 "_id": "615d9e8cc8a2a430782ec8ea",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T13:03:08.869Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "ya",
    //                 "seen": true,
    //                 "_id": "615d9e8dc8a2a430782ec8f9",
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-06T13:03:09.582Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "false",
    //                 "seen": true,
    //                 "_id": "615f56e044506e36a8b260dc",
    //                 "image": {
    //                   "_id": "615f56df44506e36a8b260da",
    //                   "title": "MVIMG_20210607_184640.jpg",
    //                   "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\MVIMG_20210607_184640.jpg",
    //                   "mimetype": "image/jpeg",
    //                   "size": 1092829,
    //                   "createdAt": "2021-10-07T20:21:51.910Z",
    //                   "__v": 0
    //                 },
    //                 "user": {
    //                   "contacts": [
    //                     "615d99acdd64643778d7661c",
    //                     "615d9a5418ceac366c24fec5"
    //                   ],
    //                   "avatar": {
    //                     "_id": "615d9331b45437264036e417",
    //                     "title": "IMG_20210222_091236.jpg",
    //                     "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                     "mimetype": "image/jpeg",
    //                     "size": 5797580,
    //                     "createdAt": "2021-10-06T12:14:41.432Z",
    //                     "__v": 0
    //                   },
    //                   "_id": "615d91e9b45437264036e40d",
    //                   "username": "tachancka",
    //                   "phoneNumber": "+541139153268",
    //                   "__v": 0,
    //                   "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //                 },
    //                 "createdAt": "2021-10-07T20:21:52.004Z",
    //                 "__v": 0
    //               },
    //               {
    //                 "message": "che",
    //                 "seen": true,
    //                 "_id": "615f576d44506e36a8b26111",
    //                 "user": {
    //                   "contacts": [
    //                     "615d91e9b45437264036e40d"
    //                   ],
    //                   "avatar": "https://w7.pngwing.com/pngs/971/686/png-transparent-computer-icons-social-media-blog-avatar-material-service-logo-material.png",
    //                   "_id": "615d99acdd64643778d7661c",
    //                   "username": "petete",
    //                   "phoneNumber": "+541199999999",
    //                   "__v": 0,
    //                   "socketId": "KNdvHGQCpLFmLxZxAAAA"
    //                 },
    //                 "createdAt": "2021-10-07T20:24:13.842Z",
    //                 "__v": 0
    //               }
    //             ],
    //             "users": [
    //               {
    //                 "contacts": [
    //                   "615d99acdd64643778d7661c",
    //                   "615d9a5418ceac366c24fec5"
    //                 ],
    //                 "avatar": {
    //                   "_id": "615d9331b45437264036e417",
    //                   "title": "IMG_20210222_091236.jpg",
    //                   "path": "C:\\Users\\bocag\\Documents\\GitHub\\Chira\\src\\public\\uploads\\IMG_20210222_091236.jpg",
    //                   "mimetype": "image/jpeg",
    //                   "size": 5797580,
    //                   "createdAt": "2021-10-06T12:14:41.432Z",
    //                   "__v": 0
    //                 },
    //                 "_id": "615d91e9b45437264036e40d",
    //                 "username": "tachancka",
    //                 "phoneNumber": "+541139153268",
    //                 "__v": 0,
    //                 "socketId": "Fo0FZkfylHMiMWaWAAAG"
    //               },
    //               {
    //                 "contacts": [
    //                   "615d91e9b45437264036e40d"
    //                 ],
    //                 "avatar": "https://w7.pngwing.com/pngs/971/686/png-transparent-computer-icons-social-media-blog-avatar-material-service-logo-material.png",
    //                 "_id": "615d99acdd64643778d7661c",
    //                 "username": "petete",
    //                 "phoneNumber": "+541199999999",
    //                 "__v": 0,
    //                 "socketId": "KNdvHGQCpLFmLxZxAAAA"
    //               }
    //             ],
    //             "avatar": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F9%2F9272.png&f=1&nofb=1",
    //             "_id": "615d99e6dd64643778d7663a",
    //             "type": "private",
    //             "createdAt": "2021-10-06T12:43:18.561Z",
    //             "__v": 0
    //           }
    //           const [ chats, setChats ] = useState()
    //           const [ lastMessage, setLastMessage ] = useState()
    //           const { goToChat } = useMainContactsHelper(setChats, setDisplayChat, setLastMessage, setDisplayChat)

    return(
        
        <section className="main">
            {/* <button onClick={() => setChat(chata)}> */}
            {/* </button> */}
            <section className="main__left-section" id="main__left-section">
                <section className="main__navbar-section">
                    <nav className="main__navbar navbar">
                        <div className="main__settings" onClick={() => displayBurgerMenu ? setDisplayBurgerMenu(false) : setDisplayBurgerMenu(true)}>
                            <i className="fas fa-bars"></i>
                        </div>
                        <h3 className="navbar__title">Chira</h3>
                        <div className="main__search" onClick={() => setAddContactsMenu('search')}>
                            <i className="fas fa-search"></i>
                        </div>
                    </nav>
                    <BurgerMenu displayBurgerMenu={displayBurgerMenu} setUserLoggedMain={setUserLoggedMain} setDisplayConfiguration={setDisplayConfiguration} setDisplayEditProfile={setDisplayEditProfile} setAddContactsMenu={setAddContactsMenu} />
                </section>
                <section className="main__content-section">
                    {displayLeftContent()}
                    <div className="main_add-contacts-container add-contacts">
                        <div className="add-contacts__sub-container">
                            <div className="add-contacts__left-side">
                                <div className={addContactsMenu ? "add-contacts__button active" : "add-contacts__button" } id="add-contacts__button" onClick={() => {setAddContactsMenu(true)}}>
                                    <i className="fas fa-user-plus"></i>
                                </div>
                            </div>
                            <div className="add-contacts__right-side">

                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <Chat messagesSent={messagesSent} setMessagesSent={setMessagesSent} 
            setShowNewMessageNotification={setShowNewMessageNotification}
            displayChat={displayChat} setDisplayChat={setDisplayChat}
            />
        </section>
    )
})

export default Main