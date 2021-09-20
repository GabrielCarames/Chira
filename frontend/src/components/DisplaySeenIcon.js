import { memo } from 'react'

const DisplaySeenIcon = memo((({message}) => {
    return ( 
        <i className={message.seen ? "fas fa-check-double" : "fas fa-check"}></i> 
    )
}))

export default DisplaySeenIcon