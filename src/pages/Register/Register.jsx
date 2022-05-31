import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import css from "./Register.module.scss";

function Register() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isError, setisError] = useState(false);
  const [handleErrors, setHandleErrors] = useState("");

  async function submitHandler(e) {
    setisError(false);
    e.preventDefault();
    const newUserRegister = {
      Email: userEmail,
      Password: userPassword,
      confirmPassword: confirmationPassword,
    };
    const sendResult = await postFecth("auth/register", newUserRegister);
    console.log('sendResult===', sendResult);
    if (sendResult.success === true) {
      history.push("/login");
    }
    if (sendResult.success === false) {
      const ErrorfromBe = sendResult.error;
      const DisplayError = ErrorfromBe.map((error) => {
        return <p>{error.message}</p>;
      });
      setHandleErrors(DisplayError);
    }
  }

  return (
    <Container>
      <form
        action={css.all}
        id={css.main}
        onSubmit={submitHandler}
        className={css.form}
      >
        <h2 className={css.h2}>Register</h2>
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <div className={css.inputparent}>
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            className={css.input}
            type="email"
            placeholder="email"
            id="email"
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
        <div className={css.inputparent}>
          <input
            onChange={(e) => setConfirmationPassword(e.target.value)}
            value={confirmationPassword}
            className={css.input}
            type="password"
            placeholder="Confirm Password"
            id="Confirm password"
          />
        </div>
        <Button RegLog>Register</Button>
        <h2>Already have an account? <Link className={css.NavLink} to={'/login'}>Login</Link> here!</h2>
        <h3 className={css.error}>{handleErrors}</h3>
      </form>
    </Container>
  );
}

export default Register;
