import send from '../images/send.png'
import socket from './Socket'
import { useState, useEffect } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'
import moment from 'moment'
import ShowMessages from './ShowMessages'

const SearchMessages = ({setShowSearchMessages}) => {
    const [ messageSearch, setMessageSearch ] = useState();
    

    return (
        <section className="main__search-messages search">
            <div className="search__navbar-section">
                <div className="search-messages__back" onClick={() => { setShowSearchMessages(false) }}>
                        <i className="fas fa-arrow-left"></i>
                </div>
                <div className="search-messages__input-container">
                    <i className="fas fa-search"></i>
                    <input className="search-messages__input" name="contactName" type="text" placeholder="Buscar por nombre" onChange={e => setMessageSearch(e.target.value)}/>
                </div>
            </div>
            <div className="search__results-section">
                <ShowMessages messageSearch={messageSearch}/>
            </div>
        </section>
    )
}

export default SearchMessages