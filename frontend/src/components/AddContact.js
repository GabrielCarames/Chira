import { useState, useContext } from 'react'
import AddContactsMenu from "../contexts/AddContactsMenu";
import ShowContacts from './ShowContacts';

const AddContact = () => {
    const { setAddContactsMenu } = useContext(AddContactsMenu)
    const [ contactSearch, setContactSearch ] = useState();
    
    return(
        <section className="main__add-contacts add-contacts">
            <section className="add-contacts__navbar">
                <div className="add-contacts__back" onClick={() => { setAddContactsMenu(false) }}>
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div className="add-contacts__input-container">
                    <i className="fas fa-search"></i>
                    <input className="add-contacts__input" name="contactName" type="text" placeholder="Buscar por nombre" onChange={e => setContactSearch(e.target.value)}/>
                </div>
            </section>
            <section className="contacts-section contacts">
                <ShowContacts contactSearch={contactSearch}/>
            </section>
        </section>
    )
}

export default AddContact