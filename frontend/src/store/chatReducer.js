const chatTypes = {
    updateChat: 'chat - update',
}

const initialStore = {
    chat: null
}

const chatReducer = (state, action) => {
    switch(action.type) {
        case chatTypes.updateChat:
            return {
                ...state,
                chat: action.updatedChat
            }
        case chatTypes.actualChat:
            return state
        default:
            return state;
    }
}

export { initialStore, chatTypes }
export default chatReducer
