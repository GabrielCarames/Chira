import { createContext, useContext, useReducer } from 'react'
import chatsReducer, { initialStore } from './chatsReducer';

const ChatsContext = createContext();

const ChatsProvider = ({ children }) =>
    <ChatsContext.Provider value={useReducer(chatsReducer, initialStore)}>
        {children}
    </ChatsContext.Provider>

const useChatsStore = () => useContext(ChatsContext)[0]
const useChatsDispatch = () => useContext(ChatsContext)[1]

export { ChatsContext, useChatsStore, useChatsDispatch }
export default ChatsProvider;