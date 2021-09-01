import Login from './components/Login'
import Main from './components/Main';
import { useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowFlashMessages from './components/ShowFlashMessages';
import FlashContext from './contexts/FlashContext';
import AddFriendsMenu from './contexts/AddFriendsMenu';

const App = () => {
  const [ flashMessage, setFlashMessage ] = useState(false)
  const [ addFriendsMenu, setAddFriendsMenu ] = useState(false)
  const [ userLoggedMain, setUserLoggedMain ] = useState(true)

  const checkLogIn = () => {
    const userLogged = localStorage.getItem('userLogged')
    if(userLogged) return <Main props={{"userLoggedMain": userLoggedMain, setUserLoggedMain}}/>
    else return <Login />
  }

  return (
    <main>
      <FlashContext.Provider value={{flashMessage, setFlashMessage}}>
        <AddFriendsMenu.Provider value={{addFriendsMenu, setAddFriendsMenu}}>
          <ShowFlashMessages delay={3000}/>
          <BrowserRouter>
            <Switch>
                <Route exact path="/" component={checkLogIn} />
                <Route exact path="/login" component={Login} />
                <Route path="*" component={checkLogIn} />
            </Switch>
          </BrowserRouter>
        </AddFriendsMenu.Provider>
      </FlashContext.Provider>
      </main>
  );
}

export default App;
