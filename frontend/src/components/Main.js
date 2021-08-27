import avatar from '../images/avatar.png'

const Main = () => {

    return(
        <section className="main">
            <section className="main__left-section">
                <nav className="main__navbar navbar">
                    <div className="main__settings">
                        <i className="fas fa-bars"></i>
                    </div>
                    <h3 className="navbar__title">Chira</h3>
                    <div className="main__search">
                        <i className="fas fa-search"></i>
                    </div>
                </nav>
                <main className="main__contacts-container">
                    <ul className="main__contacts-list list">
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                    </ul>
                </main>
                {/* FIJATE COMO OBTENER LAS VARIABLES DE ACA DE LAS HORAS Y METERLAS EN SASS */}
                {/* <aside className="list__time-container">
                    
                    <h6 className="list__time-ago">30:43hs</h6>
                    <h6 className="list__time-ago">30:43hs</h6>
                    <h6 className="list__time-ago">30:43hs</h6>
                    <h6 className="list__time-ago">30:43hs</h6>
                    <h6 className="list__time-ago">30:43hs</h6>
                    <h6 className="list__time-ago">30:43hs</h6>
                </aside> */}
            </section>
            <section className="main__chat-section">
                <nav className="main__chat-navbar navbar">
                    <div className="navbar__contact">
                        <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                        <div className="navbar__info">
                            <p className="navbar__username">Contacto1</p>
                            <p className="navbar__timeago">Ultima vez hace 3032</p>
                        </div>
                    </div>
                    <div className="navbar__tools">
                        <div className="navbar__search">
                            <i className="fas fa-search"></i>

                        </div>
                        <div className="navbar__settings">
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </nav>
                <div className="main__messages-section">

                </div>
                <div className="main__input-section">
                    <input className="main__input" type="text" name="message" id="" placeholder="Escribe un mensaje aquí" autocomplete="off"/>
                </div>
            </section>
        </section>
    )
}

export default Main