import avatar from '../images/avatar.png'

const BurgerMenu = ({active, setUserLoggedMain}) => {
    const user = JSON.parse(localStorage.getItem('userLogged'))

    return(
        <div className={active ? "main__burger-menu burger active" : "main__burger-menu burger"}>
            <section className="burger__user-info">
                <img className="burger__user-avatar" src={avatar} alt="user-avatar" />
                <h4 className="burger__user-name">{user.username}</h4>
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
                    <li className="list__item" onClick={() => {localStorage.removeItem('userLogged'); setUserLoggedMain(false)}}>
                        <i className="list-avatar fas fa-sign-out-alt"></i>
                        <h6 className="list-title">Salir</h6>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default BurgerMenu