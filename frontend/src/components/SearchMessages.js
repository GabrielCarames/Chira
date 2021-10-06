import { useState } from 'react'
import ShowMessages from './ShowMessages'

const SearchMessages = ({setShowSearchMessages, goToMessage , setGoToMessage}) => {
    const [ messageSearch, setMessageSearch ] = useState();

    return (
        <section className="main__search-messages search">
            <div className="search__navbar-section">
                <div className="search-messages__back" onClick={() => { setShowSearchMessages(false); setGoToMessage(false)}}>
                        <i className="fas fa-arrow-left"></i>
                </div>
                <div className="search-messages__input-container">
                    <i className="fas fa-search"></i>
                    <input className="search-messages__input" name="contactName" type="text" placeholder="Buscar mensaje" onChange={e => setMessageSearch(e.target.value)}/>
                </div>
            </div>
            <div className="search__results-section">
                <ShowMessages messageSearch={messageSearch} goToMessage={goToMessage} setGoToMessage={setGoToMessage} setShowSearchMessages={setShowSearchMessages}/>
            </div>
        </section>
    )
}

export default SearchMessages