import EditProfile from "./EditProfile"

const Configuration = ({setDisplayEditProfile, setDisplayConfiguration}) => {

    return(
        <>
            <div className="main__configuration-section config">
                <div className="config__navbar-section">
                    <div className="config__back" onClick={() => { setDisplayConfiguration(false) }}>
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <h4 className="config__title">Configuración</h4>
                </div>
                <div className="config__options-section">
                    <ul className="config__list list">
                        <li className="list__item" onClick={() => {setDisplayConfiguration(false); setDisplayEditProfile(true)}}>
                            <i className="fas fa-pen"></i>
                            <h5 className="list__option-name">
                                Editar perfil
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Configuration