import { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddBills from './pages/Add/AddBills';
import Addregisters from './pages/Add/Addregisters';
import Archived from './pages/Archived/Archived';
import Bills from './pages/Bills/Bills';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import AuthContext from './store/AuthContx';

function App() {
  // const history= useHistory()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
      if(localStorage.getItem('token') !== null || undefined ) login()
    },[])

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

  // if(localStorage.getItem('token') === null || undefined) {
  //   alert('You are not allowed to be here')
  //   history.push('/')
  // }

  console.log('isUserLoggedIn===', isUserLoggedIn);
  return (
    <AuthContext.Provider value={ctxValue}>
    <div className="App">
    <Header />
    <Switch>
        <Route path={"/"} exact>
            <Main />
    </Route>
    <Route path={"/registrations"} >
            <Home />
    </Route>
          <Route path={"/bills/:registerid"} >
            <Bills />
          </Route>
          <Route path={"/AddBills/:registerid"} >
            <AddBills />
          </Route>
          <Route path={"/AddRegisters"} >
            <Addregisters />
          </Route>
          <Route path={"/Archived"}>
            <Archived />
          </Route>
          <Route path={"/Login"}>
            <Login />
          </Route>
          <Route path={"/Register"}>
            <Register />
          </Route>
          <Route path={"*"}>
            <NotFound />
          </Route>
          </Switch>
          <Footer />
    </div>
    </AuthContext.Provider>
  );
}

export default App;
