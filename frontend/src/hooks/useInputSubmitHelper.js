import { useEffect } from 'react'
import socket from '../components/Socket'

export function useInputSubmitHelper(inputMessage, setChosenEmoji, user, setUsertyping, contact) {

  const messageInput = message => socket.emit("sendMessage", user, message)

  const verifyAndSendInputValue = input => input !== '' && messageInput(input)
    
  useEffect(() => {
    inputMessage && socket.emit('typingPrivateChat', contact, user)
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (document.activeElement.classList[0] === 'main__input') {
            event.preventDefault();
            verifyAndSendInputValue(document.activeElement.value)
            document.activeElement.value = ''
            document.activeElement.defaultValue = ''
            setChosenEmoji(undefined)
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
        document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMessage]);

  const inputOnSubmit = (e, setChosenEmoji) => {
    e.preventDefault()
    const inputValue = e.target[1].value
    verifyAndSendInputValue(inputValue)
    e.target[1].value = ''
    e.target[1].defaultValue = ''
    setChosenEmoji(undefined)
  }

  const timeOutFunction = () => setUsertyping(false)

  useEffect(() => {
    let timeout;
    socket.on('typingPrivateChat', (user) => {
      if(user._id === contact._id) setUsertyping(user.username)
      clearTimeout(timeout)
      timeout = setTimeout(timeOutFunction, 2000)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    inputOnSubmit
  }
}

export default useInputSubmitHelper