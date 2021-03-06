
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from 'react'
import DisplayChatContext from './contexts/DisplayChatContext';
import FlashContext from './contexts/FlashContext';
import TestContext from './contexts/TestContext';
import ShowFlashMessages from './components/ShowFlashMessages';
import Login from './components/Login'
import Main from './components/Main';
import Chat from './components/Chat';

const App = () => {
  const [ flashMessage, setFlashMessage ] = useState(false)
  const [ userLoggedMain, setUserLoggedMain ] = useState(true)
  const [ chat, setChat ] = useState()
  const [ displayChat, setDisplayChat ] = useState(false)

  const checkLogIn = () => {
    const userLogged = localStorage.getItem('userLogged')
    if(userLogged) return <Main setUserLoggedMain={setUserLoggedMain}/>
    else return <Login />
  }

  return (
    <main>
      <DisplayChatContext.Provider value={{displayChat, setDisplayChat}}>
        <TestContext.Provider value={{chat, setChat}}>
          <FlashContext.Provider value={{flashMessage, setFlashMessage}}>
              <ShowFlashMessages delay={3000}/>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={checkLogIn} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/chat" component={Chat} />
                  <Route path="*" component={checkLogIn} />
                </Switch>
              </BrowserRouter>
          </FlashContext.Provider>
        </TestContext.Provider>
      </DisplayChatContext.Provider>
    </main>
  );
}

export default App;
