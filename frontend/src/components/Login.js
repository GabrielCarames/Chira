
import { useState } from 'react'
import { useLoginHelper } from '../hooks/useLoginHelper'
import PhoneInput from 'react-phone-input-2'
import Loader from "react-loader-spinner";
import logo from '../images/logo.png'
import 'react-phone-input-2/lib/style.css'

const Login = () => {
    const [ phoneNumberInput, setPhoneNumberInput ] = useState()
    const { active, handleChange, loading, verifier, handlePhoneInput } = useLoginHelper(setPhoneNumberInput);
    
    return(
        <section className="login"> 
            <figure className="login__welcome welcome">
                <img className="welcome__image" src={logo} alt="logo" />
                <figcaption className="welcome__text">
                    <h1 className="welcome__title">Entrar a Chira</h1>
                    <p className="welcome__paragraph">Ingresa tu nombre y número de celular</p>
                    <div className="recaptcha-container"></div>
                </figcaption>
            </figure>
            <form className="login__form form" onSubmit={(e) => {verifier(e, phoneNumberInput)}}>
                <section className="form_section">
                    <div className="form__name-section">
                        <label className="form__label" htmlFor="username">Nombre</label>
                        <input className="form__input" id="username" type="text" name="username" onChange={handleChange}  minLength="0" maxLength="18" pattern="[A-Za-z0-9]+" required/>
                    </div>
                    <div className="form__phone-section">
                        <label className="form__label" htmlFor="mobile">Número de celular</label>
                        <PhoneInput containerClass="form__phone-input" id="mobile" name="mobile" copyNumbersOnly="false" onChange={(value, data) => handlePhoneInput(value, data)} inputClass="form__input" buttonClass="form__dropdown-button" dropdownClass="form__dropdown" searchClass="form__dropdown-search" searchPlaceholder="Buscar número" searchNotFound="No se encontró un prefijo" country={'ar'} preferredCountries={['es','us','mx']} enableSearch="true" disableSearchIcon="false" />
                    </div>
                    <div className={active ? "form__otp-section active" : "form__otp-section"}>
                        <label className="form__label" htmlFor="otp">Código de verificación</label>
                        <input className="form__input" id="otp" type="tel" name="otp" onChange={handleChange}/>
                    </div>
                </section>
                <button type="submit" className={active ? "form__button active" : loading ? "form__button loading" : "form__button"}>
                    {loading ? <Loader type="Oval" color="#00BFFF" height={40} width={65} /> : <p className="form__text-button">Enviar código de verificación</p>}
                </button>
                <button type="submit" className={active ? loading ? "form__otp-button active loading" :"form__otp-button active" : "form__otp-button"}>
                    <p className="form__text-button">
                        {loading ? <Loader type="Oval" color="#00BFFF" height={40} width={65} /> : "Entrar"}
                    </p>
                </button>
                <div id="sign-in-button"></div>
            </form>
        </section>
    )
}

export default Login