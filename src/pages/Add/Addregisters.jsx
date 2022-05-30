import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import css from "./AddBills.module.scss";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const initErrors = {

 register_id: '' , 
 Title: '', 
 Category: '',
 Description: ''
};

function Add() {
  const history = useHistory();
  const [registersTitle, setRegistersTitle] = useState("");
  const [registersCategory, setRegistersCategory] = useState(null);
  const [registersDescription, setRegistersDescription] = useState("");
  const [isError, setisError] = useState(false);
  const [errorObj, seterrorObj] = useState(initErrors);
  const [expiredToken, setExpiredToken] = useState([]);

  useEffect(() => {
    const isErrorsEmpty = Object.values(errorObj).every((el) => el === "");
    if (!isErrorsEmpty) {
      setisError(true);
    }
  }, [registersTitle, registersDescription, errorObj]);

  async function submitHandler(e) {
    setisError(false);
    seterrorObj(initErrors);
    e.preventDefault();
    if (registersTitle.trim() === "") {
      seterrorObj((prevState) => ({
        ...prevState,
        registersTitle: "Title can't be blank",
      }));
    }
    if (registersDescription.trim() === "") {
        seterrorObj((prevState) => ({
          ...prevState,
          registersDescription: "Description can't be blank",
        }));
      }
    const newSkills = {
        Title: registersTitle,
        Category: registersCategory,
        Description: registersDescription,
    };
    const sendResult = await postFecth("accounts/post", newSkills);
    console.log('sendResult===', sendResult);
    setExpiredToken(sendResult)
    if (sendResult.error) {
      setisError(true);
    } else {
      history.push('/')
    }
  }

  if(expiredToken.error === 'invalid token') {
    alert('Your login time has expired')
    localStorage.removeItem('token')
    history.push('/')
  }
  const actions = [
      {label: 'Home Appliances', value: 'Home Appliances'},
      {label: 'Electronics', value: "Electronics"},
      {label: "Computer Hardware", value: 'Computer Hardware'},
      {label: 'Mobile Phones', value: 'Mobile Phones'},
  ]


  return (
    <Container>
      <h2>Add Registers</h2>
      <form onSubmit={submitHandler} className={css.form}>
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <input
          onChange={(e) => setRegistersTitle(e.target.value)}
          value={registersTitle}
          className={`${css.input} ${errorObj.registersTitle ? css.errBg : ""}`}
          type="text"
          placeholder="Title"
        />
        {errorObj.registersTitle && <p>{errorObj.registersTitle}</p>}
        <Select
            defaultValue={registersCategory}
            onChange={(e) => setRegistersCategory(e.value)}
            options={actions}
            />
        {errorObj.registersCategory && <p>{errorObj.registersCategory}</p>}
        <textarea
          onChange={(e) => setRegistersDescription(e.target.value)}
          value={registersDescription}
          className={`${css.input} ${
            errorObj.billExpenses ? css.errBg : ""
          }`}
          type="text"
          placeholder="Description"
        />
        {errorObj.registersDescription && <p>{errorObj.registersDescription}</p>}
        <Button Add>Add</Button>
      </form>
    </Container>
  );
}

export default Add;
