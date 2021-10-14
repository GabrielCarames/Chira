const chatsTypes = {
    updateChats: 'chats - update',
}

const initialStore = {
    chats: null
}

const chatsReducer = (state, action) => {
    switch(action.type) {
        case chatsTypes.updateChats:
            return {
                ...state,
                chats: action.updatedChats
            }
        default:
            return state;
    }
}

export { initialStore, chatsTypes }
export default chatsReducer