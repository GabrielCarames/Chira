import { useState, useEffect, useCallback, memo } from 'react'
import ReactScrolleableFeed from 'react-scrollable-feed'
import send from '../images/send.png'
import socket from './Socket'
import moment from 'moment'

const Cosa = memo((({cosaDos, setCosaDos, message, messageAlreadySeen, connectedContact, contactSeeingChat, i}) => {

    const [ cosa, setCosa ] = useState(false)

    useEffect(() => {
        cosaDos && console.log('cosa2', cosaDos)
         if(messageAlreadySeen) {
            // console.log('te tengo cgatito', messageAlreadySeen)
            setCosa(messageAlreadySeen[messageAlreadySeen.length -1].seen)
         }
    }, [messageAlreadySeen, cosaDos])

    useEffect(() => {
         console.log('messageAlreadySeen', messageAlreadySeen)
        
    }, [messageAlreadySeen])
console.log("i", i)
    const mostrarVerga = () => {
        if(contactSeeingChat) {
            if(cosaDos) {
                if(cosaDos[i].seen) {
                    return "fas fa-check-double" 
                } else return "fas fa-check" 
            } else
            if(messageAlreadySeen) {
                if(messageAlreadySeen[messageAlreadySeen.length -1].seen) {
                    return "fas fa-check-double" 
                } else return "fas fa-check" 
            }else
             if(message.seen) {
                return "fas fa-check-double"
            } else return "fas fa-check"
        } else if(cosaDos) {
            if(cosaDos[i].seen) {
                return "fas fa-check-double"
            } else return "fas fa-check"
        }else if(message.seen) {
            return "fas fa-check-double"
        } else return "fas fa-check"
        
        
        
    }

    return ( //che dale ya casi lo tenes vos podes, falta pasar la ultiam prueba
        <i className={mostrarVerga() }></i> 
    )
    
}))
{/* <i className={contactSeeingChat ? "fas fa-check-double" : cosa ? "fas fa-check-double" : cosaDos ? cosaDos.seen ? "fas fa-check-double" : "fas fa-check" : message.seen ? "fas fa-check-double": "fas fa-check"}></i>  */}

export default Cosa