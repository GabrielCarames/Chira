import { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebase from '../firebase'
import axios from 'axios'

export function useLoginHelper() {
    const [ active, setActive ] = useState()
    const [ loading, setLoading ] = useState()
    const [ form, setForm ] = useState()

    let history = useHistory()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
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
        console.log(phoneNumber, appVerifier)
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setTimeout(() => {
                setActive(true)
                setLoading(false)
            }, 2000);
        }).catch(error => console.log("Error: ", error));
    }

    const onSignInSubmit = (e, phoneNumberInput) => {
        const phoneNumber = phoneNumberInput[0]
        const dialCode = "+" + phoneNumberInput[1]
        e.preventDefault()
        setLoading(true)
        configureCaptcha()
        const completePhoneNumber = dialCode + phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        firebaseSignIn(completePhoneNumber, appVerifier)
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

      return {
          active,
          loading, 
          handleChange,
          onSignInSubmit,
          onSubmitOTP
      }
}

export default useLoginHelper