import { createContext, useContext, useReducer } from 'react'
import chatReducer, { initialStore } from './chatReducer';

const ChatContext = createContext();

const ChatProvider = ({ children }) =>
    <ChatContext.Provider value={useReducer(chatReducer, initialStore)}>
        {children}
    </ChatContext.Provider>

const useChatStore = () => useContext(ChatContext)[0]
const useChatDispatch = () => useContext(ChatContext)[1]

export { ChatContext, useChatStore, useChatDispatch }
export default ChatProvider;