import { createContext } from "react";

const AuthContext = createContext({
  isUserLoggedIn: false,
  login() {},
  logout() {},
});
AuthContext.displayName = "AuthContext";

export default AuthContext;
