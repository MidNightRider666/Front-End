import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import css from "./AddBills.module.scss";
import { useHistory } from "react-router-dom";

const initErrors = {

 register_id: '' , 
 Status: '', 
 Expenses: ''
};

function Add() {
  const history = useHistory();
  const { registerid } = useParams();
  const [billsStatus, setbillsStatus] = useState("");
  const [billExpenses, setBillExpenses] = useState("");
  const [isError, setisError] = useState(false);
  const [errorObj, seterrorObj] = useState(initErrors);

  useEffect(() => {
    const isErrorsEmpty = Object.values(errorObj).every((el) => el === "");
    if (!isErrorsEmpty) {
      setisError(true);
    }
  }, [billsStatus, billExpenses, registerid, errorObj]);

  async function submitHandler(e) {
    setisError(false);
    seterrorObj(initErrors);
    e.preventDefault();
    if (billsStatus.trim() === "") {
      seterrorObj((prevState) => ({
        ...prevState,
        billsStatus: "Title can't be blank",
      }));
    }
    if (billExpenses.trim() === "") {
      seterrorObj((prevState) => ({
        ...prevState,
        billExpenses: "Description can't be blank",
      }));
    }
    const newSkills = {
        register_id: registerid,
        Status: billsStatus,
        Expenses: billExpenses,
    };
    const sendResult = await postFecth("bills/post", newSkills);
    console.log('sendResult===', sendResult);
    if (sendResult.error) {
      setisError(true);
    } else {
      history.push(`/bills/${registerid}`);
    }
  }

  return (
    <Container>
      <h2>Add Bills</h2>
      <form onSubmit={submitHandler} className={css.form}>
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <input
          onChange={(e) => setbillsStatus(e.target.value)}
          value={billsStatus}
          className={`${css.input} ${errorObj.billsStatus ? css.errBg : ""}`}
          type="text"
          placeholder="Title"
        />
        {errorObj.billsStatus && <p>{errorObj.billsStatus}</p>}
        <input
          onChange={(e) => setBillExpenses(e.target.value)}
          value={billExpenses}
          className={`${css.input} ${
            errorObj.billExpenses ? css.errBg : ""
          }`}
          type="number"
          placeholder="Expenses"
        />
        {errorObj.billExpenses && <p>{errorObj.billExpenses}</p>}
        <Button Add>Add</Button>
      </form>
    </Container>
  );
}

export default Add;
