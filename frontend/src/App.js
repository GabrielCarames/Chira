import Login from './components/Login'
import Main from './components/Main';
import { useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowFlashMessages from './components/ShowFlashMessages';
import FlashContext from './contexts/FlashContext';

const App = () => {
  const [ flashMessage, setFlashMessage ] = useState(false)

  const checkLogIn = () => {
    const userLogged = localStorage.getItem('userLogged')
    if(userLogged) return <Main />
    else return <Login />
  }

  return (
    
    <main>
      <FlashContext.Provider value={{flashMessage, setFlashMessage}}>
        <ShowFlashMessages delay={3000}/>
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={checkLogIn} />
              <Route exact path="/login" component={Login} />
              <Route path="*" component={checkLogIn} />
          </Switch>
        </BrowserRouter>
      </FlashContext.Provider>
      </main>
  );
}

export default App;
