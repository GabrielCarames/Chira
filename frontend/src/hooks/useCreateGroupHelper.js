
export function useCreateGroupHelper () {
    let groupContacts = []

    const addContactsToGroupList = (contact) => {
        groupContacts.push(contact)
    }

    return {
        addContactsToGroupList
    }
}

export default useCreateGroupHelper