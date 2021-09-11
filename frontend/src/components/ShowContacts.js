import { useState, useEffect } from 'react'
import { useAddContactsHelper } from '../hooks/useAddContactsHelper'
import avatar from '../images/avatar.png'
import Loader from "react-loader-spinner";

const ShowContacts = ({contactSearch}) => {
    const { addContact, onSearchSubmit } = useAddContactsHelper();
    const [ showContacts, setShowContacts ] = useState();
    const [ loader, setLoader ] = useState();
    const [ contactAdded, setContactAdded ] = useState();
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
    
    var alreadyContacts
    if(loader) {
        return <Loader type="Oval" color="#00BFFF" className="contacts__loader" height={60} width={60} />
    } else {
        if(showContacts !== '') {
            if(showContacts) {
                return (
                    <ul className="contacts-list list">
                        { 
                            showContacts.map(contact => {
                                alreadyContacts = contact.contacts.filter((contact) => user._id === contact._id )
                                return (
                                    <li className="list__item" key={contact._id}>    
                                        <img className="list__avatar" src={avatar} alt="user-avatar" />
                                        <div className="list__info">
                                            <p className="list__username">{contact.username}</p>
                                        </div>
                                        <div className="list__add-contact" >
                                            {
                                                alreadyContacts[0]
                                                ? <i className="fas fa-user-check"></i>
                                                : <i className={contactAdded ? "fas fa-user-check" : "fas fa-user-plus"} onClick={() => {addContact(contact); setContactAdded(true)}}></i>
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            } else return <h4 className="contacts-suggestion">Ingresa un nombre para buscar</h4>
        } else return <h4 className="contacts-not-found">No se han encontrado usuarios. Pruebe buscando otro nombre</h4>
    }
}

export default ShowContacts