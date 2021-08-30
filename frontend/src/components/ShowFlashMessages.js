import React, { useContext, useEffect, useState } from "react";
import FlashContext from "../contexts/FlashContext";

const ShowFlashMessages = props => {
  const [visible, setVisible] = useState(true);
  // const [FlashMessage, setFlashMessage] = useState();
  const { flashMessage, setFlashMessage } = useContext(FlashContext)
  //aca podrida usar el useref para no renderizarlo la primera vez trucazo
  // useEffect(() => {
  //   async function axiosData() { // la funcion esta no seq ue iondda, me la pedia react para no generar warnings amarillos
  //    const response = await axios.get('/localFlashMessages/')
  //    if(response.data) {
  //     setFlashMessage(response.data)
  //     }
  //   }
  //   axiosData()
  // },[])

  useEffect(() => {
    flashMessage && console.log("soymama", flashMessage, "sommmmm", flashMessage.error)
  }, [flashMessage])

  // useEffect(() => {
  //   setTimeout(async () => {
  //     setVisible(false);
  //     await axios.put('/localFlashMessages/removeflashmessage')
  //   }, props.delay);
  // }, [props.delay]);

  return flashMessage ? (
    visible && 
      <section className="flash-message">
        <div className="flash-message__content">
          <h2 className="flash-message__message">Se ha producido un error:&nbsp; {flashMessage.error.message ? flashMessage.error.message : flashMessage.error}</h2>
          <i className="fas fa-times" onClick={() => setVisible(false)}></i>
        </div>
      </section>
    ): "";
};

export default ShowFlashMessages;
