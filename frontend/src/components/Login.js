import logo from '../images/logo.png'

const Login = () => {

    return(
        <section className="login"> 
            <figure className="login__welcome welcome">
                <img className="welcome__image" src={logo} alt="logo" />
                <figcaption className="welcome__text">
                    <h1 className="welcome__title">Entrar a Chira</h1>
                    <p className="welcome__paragraph">Ingresa tu nombre y número de celular</p>
                </figcaption>
            </figure>
            <form className="login__form form">
                <section className="form_section">
                    <div className="form__name-section">
                        <label className="form__label">Nombre</label>
                        <input className="form__input" type="text" name="name" required/>
                    </div>
                    <div className="form__phone-section">
                        <label className="form__label">Número de celular</label>
                        <input className="form__input" type="tel" name="phonenumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                    </div>
                </section>
                <button type="submit" className="form__button">
                    <p className="form__text-button">Iniciar sesión</p>
                </button>
            </form>
        </section>
    )
}

export default Login