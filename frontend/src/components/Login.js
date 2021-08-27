import logo from '../images/logo.png'
import firebase from '../firebase'
import { useState } from 'react'
// import firebase from './firebase'

const Login = () => {
    const [form, setForm] = useState();
    const [ active, setActive ] = useState()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            console.log("Recaptcha successfully")
          },
          defaultCountry: "IN"
        });
      }

    const onSignInSubmit = (e) => {
        e.preventDefault()
        configureCaptcha()
        const phoneNumber = "+54" + form.mobile;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("codigoenviadoylisto")
             setActive(true)
            }).catch((error) => {
                console.log(error)
            });
    }

    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = form.otp
        window.confirmationResult.confirm(code).then((result) => {
          const user = result.user;
          console.log(JSON.stringify(user))
          alert("User is verified")
        }).catch((error) => {
          console.log(error)
        });
      }

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
                        <label className="form__label" htmlFor="name">Nombre</label>
                        <input className="form__input" id="name" type="text" name="name" />
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
                    <p className="form__text-button">Enviar código de verificación</p>
                </button>
                <button type="submit" className={active ? "form__otp-button active" : "form__otp-button"}>
                    <p className="form__text-button">Registrarse</p>
                </button>
            </form>

        <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
            <input type="number" name="mobile" onChange={handleChange}/>
            <button type="submit">submiteame</button>
        </form>

        <form onSubmit={onSubmitOTP}>
            <input type="number" name="otp"  onChange={handleChange}/>
            <button type="submit">submiteameotp</button>
        </form>
        </section>
    )
}

export default Login