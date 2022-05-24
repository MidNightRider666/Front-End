import { useState } from 'react';
import './App.css';
import AuthContext from './components/store/AuthContx';

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
      Apps
    </div>
    </AuthContext.Provider>
  );
}

export default App;
