import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import firebase from '../firebase'
import axios from 'axios'
import FlashContext from '../contexts/FlashContext'

export function useLoginHelper(setPhoneNumberInput) {
    const [ loading, setLoading ] = useState()
    const [ active, setActive ] = useState()
    const [ form, setForm ] = useState()
    const { setFlashMessage } = useContext(FlashContext)
    let history = useHistory()

    const userTrucho = {
        "contacts": [],
        "avatar": "https://w7.pngwing.com/pngs/971/686/png-transparent-computer-icons-social-media-blog-avatar-material-service-logo-material.png",
        "_id": "6161f87685215b27bcd3f474",
        "username": "petete",
        "phoneNumber": "+541139153268",
        "__v": 0
    }

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
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setTimeout(() => {
                setActive(true)
                setLoading(false)
            }, 2000);
        }).catch(error => {
            if(error.response) setFlashMessage({type: 'failure', error: error.response.data});
            else setFlashMessage({type: 'failure', error: error})
        })
    }

    const verifier = (e, phoneNumberInput) => {
        if(!phoneNumberInput){
            const error = new Error('Ingrese un número de celular')
            setFlashMessage({type: 'failure', error: error})
        } else {
            if(active) {
                onSubmitOTP(e, phoneNumberInput)
            } else onSignInSubmit(e, phoneNumberInput)
        }
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
        
        // localStorage.setItem('userLogged', JSON.stringify(userTrucho));
        // console.log("usertruccho", userTrucho)
        // history.push("/");
        try {
            await axios.post('/users/register', user).then(res => {
                setLoading(false);
                
                console.log("res.data", res.data)
                localStorage.setItem('userLogged', JSON.stringify(res.data));
                history.push("/");
            })
        } catch (error) {
            if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
            else setFlashMessage({type: 'failure', error: error})
        }
    }

    const updateUserData = (user, newUsername) => {
        user.updateProfile({displayName: newUsername}).then(() => {
            registerUser(user)
        }).catch(error => {
            if(error.response) setFlashMessage({type: 'failure', error: error.response.data});
            else setFlashMessage({type: 'failure', error: error})
        })
    }

    const onSubmitOTP = (e) => {
        e.preventDefault()
        setLoading(true)
        const code = form.otp
        const newUsername = form.username
        window.confirmationResult.confirm(code).then( (result) => {
            const user = result.user
            updateUserData(user, newUsername)
        }).catch(error => {
            if(error.response) setFlashMessage({type: 'failure', error: error.response.data});
            else setFlashMessage({type: 'failure', error: error})
        })
      }

      const handlePhoneInput = (value, data) => {
        const phoneNumber = value.slice(data.dialCode.length)
        const dialCode = data.dialCode
        setPhoneNumberInput([phoneNumber, dialCode])
    }

      return {
          active,
          loading, 
          handleChange,
          verifier,
          handlePhoneInput
      }
}

export default useLoginHelper