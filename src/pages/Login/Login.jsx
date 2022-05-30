import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import AuthContext from "../../store/AuthContx";
import css from "./Login.module.scss";



function Login() { 
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isError, setisError] = useState(false);
  const [noAccount, setNoAccount] = useState("");

  async function submitHandler(e) {
    setisError(false);
    e.preventDefault();
    const newLoginUser = {
      Email: userEmail,
      Password: userPassword,
    };
    const sendResult = await postFecth("auth/login", newLoginUser);
    if(sendResult.error === 'Login failed. Invalid Email and Password combination') {
      const ErrorfromBe = sendResult.error
      setNoAccount(ErrorfromBe);
    }
    if(sendResult.success === true) {
      history.push("/");
      authCtx.login();
    }
    else {
      setisError(true);
      const ErrorfromBe = sendResult.error
      const DisplayError = ErrorfromBe.map((error) => {return <p key={error.field}>{error.message}</p>})
      setNoAccount(DisplayError);
  } 
  }


  return (
    <Container>
      <form action={css.all} id={css.main} onSubmit={submitHandler} className={css.form}>
      <h2 className={css.h2}>Login</h2>
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <div className={css.inputparent}>
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          className={css.input}
          // className={`${css.input} ${errorObj.userEmail ? css.errBg : ""}`}
          type="email"
          placeholder="email"
          id="Email"
        />
        </div>
        <div className={css.inputparent}>
        <input
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          className={css.input}
          type="password"
          placeholder="password"
          id="password"
        />
        </div>
        <Button RegLog>Login</Button>
        <h3 className={css.error}>{noAccount}</h3>
      </form>
    </Container>
  );
}

export default Login;
