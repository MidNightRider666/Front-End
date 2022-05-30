import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import css from "./AddBills.module.scss";
import { useHistory } from "react-router-dom";

function Add() {
  const history = useHistory();
  const { registerid } = useParams();
  const [billsStatus, setbillsStatus] = useState("");
  const [billExpenses, setBillExpenses] = useState("");
  const [isError, setisError] = useState(false);
  const [errorFromBE, setErrorFromBE] = useState("");
  const [expiredToken, setExpiredToken] = useState([]);

  async function submitHandler(e) {
    setisError(false);
    e.preventDefault();
    const newSkills = {
      register_id: registerid,
      Status: billsStatus,
      Expenses: billExpenses,
    };
    const sendResult = await postFecth("bills/post", newSkills);
    setExpiredToken(sendResult);
    if (sendResult.error) {
      setisError(true);
      const ErrorFromBe = sendResult.error;
      const DisplayError = ErrorFromBe.map((error) => {
        return <p key={error.field}>{error.message}</p>;
      });
      setErrorFromBE(DisplayError);
    } else {
      history.push(`/bills/${registerid}`);
    }
  }

  if (expiredToken.error === "invalid token") {
    alert("Your login time has expired");
    localStorage.removeItem("token");
    history.push("/");
  }

  if (localStorage.getItem("token") === null) {
    alert("you are not allowed to be here");
    history.push("/");
  }

  return (
    <Container>
      <h2>Add Bills</h2>
      <form
        action={css.all}
        id={css.main}
        onSubmit={submitHandler}
        className={css.form}
      >
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <div className={css.inputparent}>
          <input
            onChange={(e) => setbillsStatus(e.target.value)}
            value={billsStatus}
            className={css.input}
            type="text"
            placeholder="Title"
          />
        </div>
        <div className={css.inputparent}>
          <input
            onChange={(e) => setBillExpenses(e.target.value)}
            value={billExpenses}
            className={css.input}
            type="number"
            placeholder="Expenses"
          />
        </div>
        <Button Add>Add</Button>
        <h3 className={css.error}>{errorFromBE}</h3>
      </form>
    </Container>
  );
}

export default Add;
