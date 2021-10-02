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
        console.log("input?", input[1], 'active', document.activeElement.classList[0])
        if (document.activeElement.classList[0] === 'main__input') {
            event.preventDefault();
            verifyAndSendInputValue(document.activeElement.value)
            document.activeElement.value = ''
            document.activeElement.defaultValue = ''
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
    console.log("aaaaaaaaa")
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