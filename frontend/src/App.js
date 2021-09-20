
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from 'react'
import ShowFlashMessages from './components/ShowFlashMessages';
import Login from './components/Login'
import Main from './components/Main';
import Chat from './components/Chat';
import AddContactsMenu from './contexts/AddContactsMenu';
import FlashContext from './contexts/FlashContext';
import TestContext from './contexts/TestContext';

const App = () => {
  const [ flashMessage, setFlashMessage ] = useState(false)
  const [ addContactsMenu, setAddContactsMenu ] = useState(false)
  const [ setUserLoggedMain ] = useState(true)
  const [ chat, setChat ] = useState()

  const checkLogIn = () => {
    const userLogged = localStorage.getItem('userLogged')
    if(userLogged) return <Main setUserLoggedMain={setUserLoggedMain}/>
    else return <Login />
  }

  return (
    <main>
      <TestContext.Provider value={{chat, setChat}}>
        <FlashContext.Provider value={{flashMessage, setFlashMessage}}>
            <AddContactsMenu.Provider value={{addContactsMenu, setAddContactsMenu}}>
              <ShowFlashMessages delay={3000}/>
              <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={checkLogIn} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/chat" component={Chat} />
                    <Route path="*" component={checkLogIn} />
                </Switch>
              </BrowserRouter>
            </AddContactsMenu.Provider>
        </FlashContext.Provider>
      </TestContext.Provider>
    </main>
  );
}

export default App;
