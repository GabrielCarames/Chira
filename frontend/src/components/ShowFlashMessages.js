import React, { useContext, useEffect, useState } from "react";
import FlashContext from "../contexts/FlashContext";

const ShowFlashMessages = () => {
  const [visible, setVisible] = useState(true);
  const { flashMessage } = useContext(FlashContext)

  useEffect(() => {
    flashMessage && console.log("Error mensaje: ", flashMessage.error)
  }, [flashMessage])

  useEffect(() => {
    !visible && window.location.reload()
  }, [visible])

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
