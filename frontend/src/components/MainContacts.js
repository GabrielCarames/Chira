import avatar from '../images/avatar.png'


const MainContacts = () => {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    console.log("amarillomalavado", user)
    return(
        <>
            <main className="main__contacts">
                <ul className="main__contacts-list list">
                    {user && 
                        user.friends.map((friend) => {
                            console.log("amarillo", friend)
                            return (
                                <li className="list__item">
                                    <img className="list__avatar" src={avatar} alt="user-avatar" />
                                    <div className="list__info">
                                        <p className="list__username">{friend.username}</p>
                                        <p className="list__messages">Cosa</p>
                                    </div>
                                    <h6 className="list__time-ago">30:43hs</h6>
                                </li>
                            )
                        })
                    }
                    {/* <li className="list__item">
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
                    </li> */}
                </ul>
            </main>   
        </>
    )
}

export default MainContacts