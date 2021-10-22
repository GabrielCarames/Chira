import { createStore } from 'redux'

const chat = null

const chatReducer = (state = chat, {type, payload}) => {
    switch (type) {
        case '@initialChat':
            return state = payload
        case '@updateChat':
            return {...payload }
            
        default:
            return state
    }
}

export default chatReducer

// export const chatStore = createStore(chatReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
