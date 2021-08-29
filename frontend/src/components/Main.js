import { useState } from 'react'
import avatar from '../images/avatar.png'

const Main = () => {
    const [ active, setActive ] = useState()

    return(
        <section className="main">
            <section className="main__left-section">
                <nav className="main__navbar navbar">
                    <div className="main__settings" onClick={() => active ? setActive(false) : setActive(true)}>
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
                <div className={active ? "main__burger-menu burger active" : "main__burger-menu burger"}>
                    <section className="burger__user-info">
                        <img className="burger__user-avatar" src={avatar} alt="user-avatar" />
                        <h4 className="burger__user-name">Finisterix</h4>
                        <p className="burger__user-number">+54 11 3915 3265</p>
                    </section>
                    <section className="burger__settings-section">
                        <ul className="burger__setting-list list">
                            <li className="list__item">
                                <i className="list-avatar fas fa-users"></i>
                                <h6 className="list-title">Crear nuevo grupo</h6>
                            </li>
                            <li className="list__item">
                                <i className="list-avatar fas fa-user"></i>
                                <h6 className="list-title">Contactos</h6>
                            </li>
                            <li className="list__item">
                                <i className="list-avatar fas fa-bookmark"></i>
                                <h6 className="list-title">Mensajes guardados</h6>
                            </li>
                            <li className="list__item">
                                <i className="list-avatar fas fa-cog"></i>
                                <h6 className="list-title">Configuración</h6>
                            </li>
                            <li className="list__item" onClick={() => localStorage.removeItem('userLogged')}>
                                <i className="list-avatar fas fa-sign-out-alt"></i>
                                <h6 className="list-title">Salir</h6>
                            </li>
                        </ul>
                    </section>
                </div>
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
                    <input className="main__input" type="text" name="message" id="" placeholder="Escribe un mensaje aquí" autoComplete="off"/>
                </div>
            </section>
        </section>
    )
}

export default Main