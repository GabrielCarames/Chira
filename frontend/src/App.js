import Login from './components/Login'
import Main from './components/Main';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  
  const checkLogIn = () => {
    const userLogged = localStorage.getItem('userLogged')
    if(userLogged) return <Main />
    else return <Login />
  }

  return (
      <main>
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={checkLogIn} />
              <Route exact path="/login" component={Login} />
              <Route path="*" component={checkLogIn} />
          </Switch>
        </BrowserRouter>
      </main>
  );
}

export default App;
