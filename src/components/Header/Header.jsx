import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../store/AuthContx";
import Button from "../UI/Button/Button";
import Container from "../UI/Container";
import css from "./Header.module.scss";

function Header() {
  const history = useHistory()
  const { isUserLoggedIn, logout } = useContext(AuthContext);

  function logoutHandler(e) {
    logout();
    localStorage.removeItem("token");
    history.push('/')
  }
  return (
    <header>
        <div className={css.title}>
          <h1>Technical registration point </h1>
        </div>
      <Container className={css.header}>
        <nav>
          {!isUserLoggedIn && (
            <NavLink className={css.navLink} to={"/Register"}>
              Register
            </NavLink>
          )}
          {!isUserLoggedIn && (
            <NavLink className={css.navLink} to={"Login"}>
              Login
            </NavLink>
          )}
          {isUserLoggedIn && (
            <NavLink className={css.navLink} to={"/"}>
              Home
            </NavLink>
          )}
            {isUserLoggedIn && (
            <NavLink className={css.navLink} to={"/registrations"}>
              Registers
            </NavLink>
          )}
        </nav>
      </Container>
      {isUserLoggedIn && (
        <div className={css.button}>
          <h1 className={css.headContent}>Please choose excecution</h1>
          <Button logout onClick={logoutHandler}>
            Logout
      </Button>
      </div>
        )}
    </header>
  );
}

export default Header;
