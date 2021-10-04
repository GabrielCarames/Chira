import { useState, useEffect, useContext } from 'react'
import { useAddContactsHelper } from '../hooks/useAddContactsHelper'
import { useCreateGroupHelper } from '../hooks/useCreateGroupHelper'
import avatar from '../images/avatar.png'
import Loader from "react-loader-spinner";
import socket from './Socket'
import AddContactsMenu from "../contexts/AddContactsMenu";

const ShowContacts = ({contactSearch, setDisplayCreateGroup, addContactsMenu, setAddContactsMenu, contactAdded, setContactAdded, groupContacts, setGroupContacts}) => {
    const { addContact, onSearchSubmit } = useAddContactsHelper();
    const { addContactsToGroupList } = useCreateGroupHelper(groupContacts, setGroupContacts);
    const [ showContacts, setShowContacts ] = useState();
    const [ loader, setLoader ] = useState();
    const stringUser = localStorage.getItem('userLogged');
    const user = JSON.parse(stringUser)

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

    var alreadyContacts
    var alreadyGroupAdded

    if(loader) {
        return <Loader type="Oval" color="#00BFFF" className="contacts__loader" height={60} width={60} />
    } else {
        if(showContacts !== '') {
            if(showContacts) {
                return (
                    <>
                        <ul className="contacts-list list">
                            { 
                                showContacts.map(contact => {
                                    return (
                                        <li className="list__item" key={contact._id} onClick={() => addContactsMenu === 'search' && alreadyContacts[0] && goToChat(contact._id)}>   
                                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                                            <div className="list__info">
                                                <p className="list__username">{contact.username}</p>
                                            </div>
                                            <div className="list__add-contact">
                                                {checkContactIcon(contact)}
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {addContactsMenu === 'group' && groupContacts.length >= 2 &&
                            <div className="add-contact-group-container add-group">
                                <div className="add-group__sub-container">
                                    <div className="add-group__left-side">
                                        <div className={addContactsMenu !== 'group' ? "add-group__button active" : "add-group__button" } onClick={() => {setAddContactsMenu(false); setDisplayCreateGroup(true)}}>
                                            <i className="fas fa-check"></i>
                                        </div>
                                    </div>
                                    <div className="add-group__right-side">
        
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                )
            } else return <h4 className="contacts-suggestion">Ingresa un nombre para buscar</h4>
        } else return <h4 className="contacts-not-found">No se han encontrado usuarios. Pruebe buscando otro nombre</h4>
    }
}

export default ShowContacts