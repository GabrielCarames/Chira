import { useState, useContext } from 'react'
import AddContactsMenu from "../contexts/AddContactsMenu";
import ShowContacts from './ShowContacts';

const SearchContacts = () => {
    const { setAddContactsMenu } = useContext(AddContactsMenu)
    const [ contactSearch, setContactSearch ] = useState();
    
    return(
        <section className="main__search-contacts search-contacts">
            <section className="search-contacts__navbar">
                <div className="search-contacts__back" onClick={() => { setAddContactsMenu(false) }}>
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div className="search-contacts__input-container">
                    <i className="fas fa-search"></i>
                    <input className="search-contacts__input" name="contactName" type="text" placeholder="Buscar por nombre" onChange={e => setContactSearch(e.target.value)}/>
                </div>
            </section>
            <section className="contacts-section contacts">
                <ShowContacts contactSearch={contactSearch}/>
            </section>
        </section>
    )
}

export default SearchContacts