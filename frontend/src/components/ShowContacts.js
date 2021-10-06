import avatar from '../images/avatar.png'
import Loader from "react-loader-spinner";
import useShowContactsHelper from '../hooks/useShowContactsHelper';

const ShowContacts = ({contactSearch, setDisplayCreateGroup, addContactsMenu, setAddContactsMenu, contactAdded, setContactAdded, groupContacts, setGroupContacts}) => {

    var alreadyContacts
    var alreadyGroupAdded

    const { goToChat, checkContactIcon, showContacts, loader } = useShowContactsHelper(contactSearch, contactAdded, alreadyContacts, alreadyGroupAdded, addContactsMenu, groupContacts, setGroupContacts, setContactAdded)

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
                        {
                            addContactsMenu === 'group' && groupContacts.length >= 2 &&
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