import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/index.css';
import { Provider } from 'react-redux'
// import { chatStore } from './reducers/chatReducer'
// import { chatsStore } from './reducers/chatsReducer'
import chatsReducer from './reducers/chatsReducer'
import chatReducer from './reducers/chatReducer'
import { createStore } from 'redux'
import { combineReducers } from 'redux'

require('dotenv').config()

const chiraApp = combineReducers({
  chatsReducer,
  chatReducer
})

let store = createStore(chiraApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
