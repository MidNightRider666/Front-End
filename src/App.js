import { useState } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Bills from './pages/Bills/Bills';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AuthContext from './store/AuthContx';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  function login() {
    setIsUserLoggedIn(true);
  }
  function logout() {
    setIsUserLoggedIn(false);
  }

  const ctxValue = {
    isUserLoggedIn,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={ctxValue}>
    <div className="App">
    <Header />
    <Switch>
        <Route path={"/"} exact>
            <Home />
          </Route>
          <Route path={"/bills/:registerid"} >
            <Bills />
          </Route>
          <Route path={"/Login"}>
            <Login />
          </Route>
          <Route path={"/Register"}>
            <Register />
          </Route>
          </Switch>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
