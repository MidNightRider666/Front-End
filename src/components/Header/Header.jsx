import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContx";
import Button from "../UI/Button/Button";
import Container from "../UI/Container";
import css from "./Header.module.scss";

function Header() {
  const { isUserLoggedIn, logout } = useContext(AuthContext);

  function logoutHandler(e) {
    logout();
    localStorage.removeItem("token");
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
            <NavLink className={css.navLink} to={"registrations"}>
              Registers
            </NavLink>
          )}
        </nav>
      </Container>
      {isUserLoggedIn && (
        <div className={css.button}>
          <Button logout onClick={logoutHandler}>
            Logout
      </Button>
      </div>
        )}
    </header>
  );
}

export default Header;
