import { useEffect, useContext } from 'react'
import axios from 'axios'
import _ from 'lodash';
import FlashContext from '../contexts/FlashContext'

export function useShowMessagesHelper(messageSearch, setShowMessages, setShowSearchMessages, setGoToMessage, setLoader) {
  const { setFlashMessage } = useContext(FlashContext)

  const onSearchSubmit = _.memoize(async message => {
    try {
        const res = await axios.post('/chat/searchmessages', {message})
        return res.data
    } catch (error) {
        if(error.response) setFlashMessage({type: 'failure', error: error.response.data})
        else setFlashMessage({type: 'failure', error: error})
    }
  });

  useEffect(() => {
    if(messageSearch === '') setLoader(false)
    if(messageSearch) {
        setLoader(true)
        const timer = setTimeout(async () => {
            if(messageSearch !== undefined){
                const results = await onSearchSubmit(messageSearch)
                setLoader(false)
                if(results.length >= 1) setShowMessages(results)
                else setShowMessages('')
            }
        }, 1000);
        return () => clearTimeout(timer);
    }
}, [messageSearch])// eslint-disable-line react-hooks/exhaustive-deps

const scrollToMessage = (messageId) => {
    setShowSearchMessages(false)
    setTimeout(() => {
        let messageItem = document.getElementById(messageId)
        setGoToMessage(messageId)
        messageItem.scrollIntoView({behavior: "smooth"})
    }, 400);
}

  return {
    scrollToMessage
  }
}

export default useShowMessagesHelper