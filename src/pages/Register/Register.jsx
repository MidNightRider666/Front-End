import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import css from "./Register.module.scss";

const initErrors = {
  Password: "",
  confirmPasword: "",
  Email: "",
};

function Register() {
  const history = useHistory()
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isError, setisError] = useState(false);
  const [errorObj, seterrorObj] = useState(initErrors);
  const [handleErrors, setHandleErrors] = useState("");

  useEffect(() => {
    const isErrorsEmpty = Object.values(errorObj).every((el) => el === "");
    if (!isErrorsEmpty) {
      setisError(true);
    }
  }, [userEmail, userPassword, confirmationPassword, errorObj]);

  async function submitHandler(e) {
    setisError(false);
    seterrorObj(initErrors);
    e.preventDefault();

    if (userEmail.trim() === "") {
      seterrorObj((prevState) => ({
        ...prevState,
        userEmail: "Email can't be blank",
      }));
    }
    if (userPassword.trim() === "") {
      seterrorObj((prevState) => ({
        ...prevState,
        userPassword: "Password can't be blank",
      }));
    }
    if (confirmationPassword.trim() === "") {
        seterrorObj((prevState) => ({
          ...prevState,
          confirmationPassword: "Confirmation Password can't be blank",
        }));
      }
    const newUserRegister = {
      Email: userEmail,
      Password: userPassword,
      confirmPassword: confirmationPassword,
    };
    const sendResult = await postFecth("auth/register", newUserRegister);
    console.log('sendResult===', sendResult);
    if (sendResult.changes === 1) {
      history.push('/login')
    }
    if (sendResult.success === false) {
      const ErrorfromBe = sendResult.error
      const ErrorfromBe1 = sendResult.error
      const DisplayError = ErrorfromBe.map((error) => {return <p>{error.message}</p>})
      console.log('DisplayError===', DisplayError);
      console.log('ErrorfromBe===', ErrorfromBe);
      setHandleErrors(DisplayError || ErrorfromBe1);
    }
  }

  return (
    <Container>
      <h2>Register</h2>
      <form onSubmit={submitHandler} className={css.form}>
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <input
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          className={`${css.input} ${errorObj.userEmail ? css.errBg : ""}`}
          type="email"
          placeholder="email"
        />
        {errorObj.userEmail && <p>{errorObj.userEmail}</p>}
        <input
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          className={`${css.input} ${errorObj.userPassword ? css.errBg : ""}`}
          type="password"
          placeholder="password"
        />
        {errorObj.userPassword && <p>{errorObj.userPassword}</p>}
        <input
          onChange={(e) => setConfirmationPassword(e.target.value)}
          value={confirmationPassword}
          className={`${css.input} ${errorObj.confirmationPassword ? css.errBg : ""}`}
          type="password"
          placeholder="Confirm Password"
        />
        {errorObj.confirmationPassword && <p>{errorObj.confirmationPassword}</p>}
        <h3>{handleErrors}</h3>
        <Button>Register</Button>
      </form>
    </Container>
  );
}

export default Register;
