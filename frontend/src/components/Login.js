import { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebase from '../firebase'
import axios from 'axios'
import Loader from "react-loader-spinner";
import logo from '../images/logo.png'

const Login = () => {
    const [ form, setForm ] = useState();
    const [ active, setActive ] = useState()
    const [ loading, setLoading ] = useState()
    let history = useHistory()

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

    const firebaseSignIn = (phoneNumber, appVerifier) => {
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setTimeout(() => {
                setActive(true)
                setLoading(false)
            }, 2000);
        }).catch(error => console.log("Error: ", error));
    }

    const onSignInSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        configureCaptcha()
        const phoneNumber = "+54" + form.mobile;
        const appVerifier = window.recaptchaVerifier;
        firebaseSignIn(phoneNumber, appVerifier)
    }

    const registerUser = async (user) => {
        try {
            await axios.post('http://localhost:3001/users/register', user).then(res => {
                setLoading(false);
                localStorage.setItem('userLogged', res.data);
                history.push("/");
            })
        } catch (error) {console.log("Error: ", error)}
    }

    const updateUserData = (user, newUsername) => {
        user.updateProfile({displayName: newUsername}).then(() => {
            registerUser(user)
        }).catch(error => console.log("Error: ", error));
    }

    const onSubmitOTP = (e) => {
        e.preventDefault()
        setLoading(true)
        const code = form.otp
        const newUsername = form.username
        window.confirmationResult.confirm(code).then( (result) => {
            const user = result.user
            updateUserData(user, newUsername)
        }).catch(error => console.log("Error: ", error));
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