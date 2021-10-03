import { useState } from "react"

export function useCreateGroupHelper () {
    const [ groupContacts, setGroupContacts ] = useState([])

    const addContactsToGroupList = (contact) => {
        setGroupContacts([...groupContacts, contact]) 
    }

    return {
        addContactsToGroupList,
        groupContacts
    }
}

export default useCreateGroupHelper