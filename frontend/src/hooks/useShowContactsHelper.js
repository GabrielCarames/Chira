import { useState, useEffect } from 'react'
import socket from '../components/Socket';
import useCreateGroupHelper from './useCreateGroupHelper';
import useAddContactsHelper from './useAddContactsHelper';

export function useShowContactsHelper (contactSearch, contactAdded, alreadyContacts, alreadyGroupAdded, addContactsMenu, groupContacts, setGroupContacts, setContactAdded) {
    const [ showContacts, setShowContacts ] = useState();
    const [ loader, setLoader ] = useState();
    const { addContactsToGroupList } = useCreateGroupHelper(groupContacts, setGroupContacts);
    const { addContact, onSearchSubmit } = useAddContactsHelper();

    const user = JSON.parse(localStorage.getItem('userLogged'))

    useEffect(() => {
        if(contactSearch === '') setLoader(false)
        if(contactSearch) {
            setLoader(true)
            const timer = setTimeout(async () => {
                if(contactSearch !== undefined){
                    const results = await onSearchSubmit(contactSearch)
                    setLoader(false)
                    if(results.length >= 1) setShowContacts(results)
                    else setShowContacts('')
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [contactSearch])// eslint-disable-line react-hooks/exhaustive-deps
    
    const goToChat = (contactId) => {
        const userId = user._id
        socket.emit('goToChat', userId, contactId)
    }

    const displayContactIcon = (contact, instance) => {
        if(instance) return <i className="fas fa-user-check"></i>
        else return <i className={contactAdded ? "fas fa-user-check" : "fas fa-user-plus"} onClick={() => {addContactsMenu === 'group' ? addContactsToGroupList(contact) : addContact(contact); setContactAdded(true)}}></i>
    }

    const checkContactIcon = (contact) => {
        alreadyContacts = contact.contacts.filter((contact) => user._id === contact._id )
        alreadyGroupAdded = groupContacts.filter((contactList) => contactList._id === contact._id)
        if(addContactsMenu === 'group') {
            return displayContactIcon(contact, alreadyGroupAdded[0])
        } else {
            return displayContactIcon(contact, alreadyContacts[0])
        }
    }

    return {
        goToChat,
        checkContactIcon,
        showContacts,
        loader
    }
}

export default useShowContactsHelper