import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import firebase from '../firebase'
import axios from 'axios'
import FlashContext from '../contexts/FlashContext'

export function useEditUserNameHelper() {
    const [ active, setActive ] = useState()
    const [ loading, setLoading ] = useState()
    const [ form, setForm ] = useState()
    const { setFlashMessage } = useContext(FlashContext)
    let history = useHistory()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const editUserName = async (e, originalUserName) => {
        e.preventDefault()
        const newUserName = form.username
        console.log("aca", newUserName)
        try {
            await axios.post('http://localhost:3001/users/editusername', {originalUserName, newUserName}).then(res => {

                console.log("lohi ciste capo")
            })
        } catch (error) {
            if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
            else setFlashMessage({type: 'failure', error: error})
        }
    }


      return {
          handleChange,
          editUserName
      }
}

export default useEditUserNameHelper