import avatar from '../images/avatar.png'

const Main = () => {

    return(
        <section className="main">
            <section className="main__left-section">
                <nav className="main__navbar navbar">
                    <i className="fas fa-bars"></i>
                    <h3 className="navbar__title">Chira</h3>
                    <i className="fas fa-search"></i>
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
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
                        <li className="list__item">
                            <img className="list__avatar" src={avatar} alt="user-avatar" />
                            <div className="list__info">
                                <p className="list__username">Contacto1</p>
                                <p className="list__messages">Cosa</p>
                            </div>
                            <h6 className="list__time-ago">30:43hs</h6>
                        </li>
                        <hr className="list__divisor"/>
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
                <div className="main__vertical-line"></div>
                <nav className="main__chat-navbar navbar">
                    <div className="navbar__contact">
                        <img className="navbar__avatar" src={avatar} alt="contact-avatar" />
                        <div className="navbar__info">
                            <p className="navbar__username">Contacto1</p>
                            <p className="navbar__timeago">Ultima vez hace 3032</p>
                        </div>
                    </div>
                    <div className="navbar__tools">
                        <i className="fas fa-search"></i>
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                </nav>
            </section>
        </section>
    )
}

export default Main