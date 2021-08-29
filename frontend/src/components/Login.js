
import Loader from "react-loader-spinner";
import logo from '../images/logo.png'
import { useLoginHelper } from '../hooks/useLoginHelper'

const Login = () => {
    const { form, active, loading, handleChange, onSignInSubmit, onSubmitOTP } = useLoginHelper()

    return(
        <section className="login"> 
            <figure className="login__welcome welcome">
                <img className="welcome__image" src={logo} alt="logo" />
                <figcaption className="welcome__text">
                    <h1 className="welcome__title">Entrar a Chira</h1>
                    <p className="welcome__paragraph">Ingresa tu nombre y número de celular</p>
                    <div className="recaptcha-container">

                    </div>
                </figcaption>
            </figure>
            <form className="login__form form" onSubmit={active ? onSubmitOTP : onSignInSubmit }>
                <section className="form_section">
                    <div className="form__name-section">
                        <label className="form__label" htmlFor="username">Nombre</label>
                        <input className="form__input" id="username" type="text" name="username" onChange={handleChange}/>
                    </div>
                    <div className="form__phone-section">
                        <label className="form__label" htmlFor="mobile">Número de celular</label>
                        <input className="form__input" id="mobile" type="tel" name="mobile" onChange={handleChange}/>
                    </div>
                    <div className={active ? "form__otp-section active" : "form__otp-section"}>
                        <label className="form__label" htmlFor="otp">Código de verificación</label>
                        <input className="form__input" id="otp" type="tel" name="otp" onChange={handleChange}/>
                    </div>
                </section>
                <button type="submit" className={active ? "form__button active" : "form__button"}>
                    <p className="form__text-button">
                        {loading ? <Loader type="Oval" color="#00BFFF" height={31} width={65} /> : "Enviar código de verificación"}
                     </p>
                </button>
                <button type="submit" className={active ? "form__otp-button active" : "form__otp-button"}>
                    <p className="form__text-button">
                         {loading ? <Loader type="Oval" color="#00BFFF" height={31} width={65} /> : "Registrarse"}
                        </p>
                </button>
                <div id="sign-in-button"></div>
            </form>
        </section>
    )
}

export default Login