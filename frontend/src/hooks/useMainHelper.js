import { useState, useEffect } from 'react'
import SearchContacts from '../components/SearchContacts';
import Configuration from '../components/Configuration';
import MainContacts from '../components/MainContacts';
import EditProfile from '../components/EditProfile';
import CreateGroup from '../components/CreateGroup';
import socket from '../components/Socket';

export function useMainHelper (messagesSent, displayBurgerMenu, setDisplayBurgerMenu, addContactsMenu, setAddContactsMenu, displayConfiguration, setDisplayConfiguration, displayEditProfile, setDisplayEditProfile, displayChat, setDisplayChat) {
    const [ displayCreateGroup, setDisplayCreateGroup ] = useState(false)
    const [ groupContacts, setGroupContacts ] = useState([])
    const [ lastMessage, setLastMessage ] = useState()
    
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const [ lastMessager, setLastMessager ] = useState()

    useEffect(() => {
        socket.emit('connected', userLogged)
        socket.on("userLogged", (userLoggede) => {
            localStorage.setItem('userLogged', JSON.stringify(userLoggede[0]));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    window.onclick = (event) => {
        if(displayBurgerMenu && event.target.className !== 'burger__user-info' && event.target.className !== 'main__settings' && event.target.className !== 'fas fa-bars') {
            setDisplayBurgerMenu(false)
        }
    }

    useEffect(() => {
        if(displayChat) document.getElementById('main__left-section').classList = "main__left-section hidden"
    }, [displayChat])

    const displayLeftContent = () => {
        if(addContactsMenu) {
            return <SearchContacts setDisplayCreateGroup={setDisplayCreateGroup} addContactsMenu={addContactsMenu} setAddContactsMenu={setAddContactsMenu} groupContacts={groupContacts} setGroupContacts={setGroupContacts} />
        } else if(displayConfiguration) {
            return <Configuration setDisplayEditProfile={setDisplayEditProfile} setDisplayConfiguration={setDisplayConfiguration} />
        } else if(displayEditProfile) {
            return <EditProfile setDisplayEditProfile={setDisplayEditProfile} />
        } else if (displayCreateGroup) {
            return <CreateGroup groupContacts={groupContacts} setDisplayCreateGroup={setDisplayCreateGroup}/>
        }else return <MainContacts messagesSent={messagesSent} setLastMessage={setLastMessage} setDisplayChat={setDisplayChat} lastMessager={lastMessager} setLastMessager={setLastMessager} />
    }

    return {
        displayLeftContent
    }
}

export default useMainHelper