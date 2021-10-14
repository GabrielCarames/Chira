import { createContext, useContext, useReducer } from 'react'
import previousImageReducer, { initialStore } from './previousImageReducer';

const PreviousImageContext = createContext();

const PreviousImageProvider = ({ children }) =>
    <PreviousImageContext.Provider value={useReducer(previousImageReducer, initialStore)}>
        {children}
    </PreviousImageContext.Provider>

const usePreviousImageStore = () => useContext(PreviousImageContext)[0]
const usePreviousImageDispatch = () => useContext(PreviousImageContext)[1]

export { PreviousImageContext, usePreviousImageStore, usePreviousImageDispatch }
export default PreviousImageProvider;