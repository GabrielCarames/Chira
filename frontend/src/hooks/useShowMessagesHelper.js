import { useContext } from 'react'
import axios from 'axios'
import _ from 'lodash';
import FlashContext from '../contexts/FlashContext'
import socket from '../components/Socket'

export function useShowMessagesHelper() {
  const { setFlashMessage } = useContext(FlashContext)
  const userLogged = JSON.parse(localStorage.getItem('userLogged'))

  const onSearchSubmit = _.memoize(async message => {
    try {
        const res = await axios.post('http://localhost:3001/chat/searchmessages', {message})
        console.log("res", res.data)
        return res.data
    } catch (error) {
        if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
        else setFlashMessage({type: 'failure', error: error})
    }
  });

  const addContact = async contact => {
    try {
        const res = await axios.post('http://localhost:3001/users/addcontact', {contact})
        socket.emit('update', userLogged, contact)
        // localStorage.setItem('userLogged', JSON.stringify(res.data))
    } catch (error) {
        if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
        else setFlashMessage({type: 'failure', error: error})
    }
  }
  
  return {
    onSearchSubmit,
    addContact
  }
}

export default useShowMessagesHelper