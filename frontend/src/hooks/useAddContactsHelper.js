import { useContext } from 'react'
import axios from 'axios'
import _ from 'lodash';
import FlashContext from '../contexts/FlashContext'
import socket from '../components/Socket'

export function useAddContactsHelper() {
  const { setFlashMessage } = useContext(FlashContext)
  const userLogged = JSON.parse(localStorage.getItem('userLogged'))

  const onSearchSubmit = _.memoize(async term => {
    try {
        const res = await axios.post('http://localhost:3001/users/contactsearch', {term})
        const contactsFiltered = res.data.filter((user) => user._id !== userLogged._id)
        return contactsFiltered
    } catch (error) {
        if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
        else setFlashMessage({type: 'failure', error: error})
    }
  });

  const addContact = async (contact) => {
      try {
          await axios.post('http://localhost:3001/users/addcontact', {contact})
          socket.emit('update', userLogged, contact)
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

export default useAddContactsHelper