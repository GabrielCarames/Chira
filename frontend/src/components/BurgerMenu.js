const BurgerMenu = ({displayBurgerMenu, setUserLoggedMain, setDisplayConfiguration, setDisplayEditProfile, setAddContactsMenu}) => {
    const userLogged = JSON.parse(localStorage.getItem('userLogged'))
    const url = process.env.REACT_APP_UPLOAD_URL

    const displayAvatar = () => {
        if(userLogged.avatar.title) {
            return url + userLogged.avatar.title
        } else return userLogged.avatar
    }

    return(
        <div className={displayBurgerMenu ? "main__burger-menu burger active" : "main__burger-menu burger"}>
            <section className="burger__user-info">
                <div className="burger__user-avatar-container" onClick={() => setDisplayEditProfile(true)}>
                    <img className="burger__user-avatar" src={displayAvatar()} alt="userLogged-avatar" />
                    <i className="fas fa-user-edit"></i>
                </div>
                <h4 className="burger__user-name">{userLogged.username}</h4>
                <p className="burger__user-number">{userLogged.phoneNumber}</p>
            </section>
            <section className="burger__settings-section">
                <ul className="burger__setting-list list">
                    <li className="list__item" onClick={() => setAddContactsMenu('group')}>
                        <i className="list-avatar fas fa-users"></i>
                        <h6 className="list-title">Crear nuevo grupo</h6>
                    </li>
                    <li className="list__item" onClick={() => alert('Contactos todavía no está disponible')}>
                        <i className="list-avatar fas fa-user"></i>
                        <h6 className="list-title">Contactos</h6>
                    </li>
                    <li className="list__item" onClick={() => alert('Mensajes guardados todavía no está disponible')}>
                        <i className="list-avatar fas fa-bookmark"></i>
                        <h6 className="list-title">Mensajes guardados</h6>
                    </li>
                    <li className="list__item" onClick={() => {setAddContactsMenu(false); setDisplayConfiguration(true)}}>
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