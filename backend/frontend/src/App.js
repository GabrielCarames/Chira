import Login from './components/Login'
import Main from './components/Main';
import { useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowFlashMessages from './components/ShowFlashMessages';
import FlashContext from './contexts/FlashContext';
import AddContactsMenu from './contexts/AddContactsMenu';
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
