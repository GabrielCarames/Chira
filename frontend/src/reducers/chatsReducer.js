import { createStore } from 'redux'

let chats = null

const chatsReducer = (state = chats, {type, payload}) => {
    switch (type) {
        case '@initialChats':
            return state = payload
        case '@updateChats':
            return [ ...payload ]
            
        default:
            return state
    }
}

export default chatsReducer
// export const chatsStore = createStore(chatsReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
