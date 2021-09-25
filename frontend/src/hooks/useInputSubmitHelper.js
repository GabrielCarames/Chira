import { useEffect } from 'react'
import socket from '../components/Socket'

export function useInputSubmitHelper(inputMessage, setChosenEmoji, user, setUsertyping) {
  const messageInput = message => socket.emit("sendMessage", user, message)
  const verifyAndSendInputValue = input => input !== '' && messageInput(input)
    
  useEffect(() => {
    if(inputMessage) socket.emit('typing', user.username)
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        const input = document.getElementsByClassName('main__input');
        if (input[0] === document.activeElement) {
            console.log("input?", input[0])
            event.preventDefault();
            verifyAndSendInputValue(input[0].value)
            input[0].value = ''
            input[0].defaultValue = ''
            setChosenEmoji(null)
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
    const inputValue = e.target[0].value
    verifyAndSendInputValue(inputValue)
    e.target[0].value = ''
    e.target[0].defaultValue = ''
    setChosenEmoji(null)
  }

  const timeOutFunction = () => setUsertyping(false)

  useEffect(() => {
    let timeout;
    socket.on('typing', (username) => {
        setUsertyping(username)
        clearTimeout(timeout);
        timeout = setTimeout(timeOutFunction, 2000); //Basicamente el clear es retardar a la ejecucion del setTimeOut
    })
  }, [])

  return {
    inputOnSubmit
  }
}

export default useInputSubmitHelper