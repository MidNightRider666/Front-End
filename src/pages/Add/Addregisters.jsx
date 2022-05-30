import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { postFecth } from "../../helper/postFecth";
import css from "./AddBills.module.scss";
import { useHistory } from "react-router-dom";
import Select from "react-select";

function Add() {
  const history = useHistory();
  const [registersTitle, setRegistersTitle] = useState("");
  const [registersCategory, setRegistersCategory] = useState(null);
  const [registersDescription, setRegistersDescription] = useState("");
  const [isError, setisError] = useState(false);
  const [expiredToken, setExpiredToken] = useState([]);
  const [errorFromBE, setErrorFromBE] = useState("");

  async function submitHandler(e) {
    setisError(false);
    e.preventDefault();
    const newSkills = {
      Title: registersTitle,
      Category: registersCategory,
      Description: registersDescription,
    };
    const sendResult = await postFecth("accounts/post", newSkills);
    setExpiredToken(sendResult);
    if (sendResult.error) {
      setisError(true);
      const ErrorFromBe = sendResult.error;
      const DisplayError = ErrorFromBe.map((error) => {
        return <p key={error.field}>{error.message}</p>;
      });
      setErrorFromBE(DisplayError);
    } else {
      history.push("/registrations");
    }
  }

  if (expiredToken.error === "invalid token") {
    alert("Your login time has expired");
    localStorage.removeItem("token");
    history.push("/");
  }

  if (localStorage.getItem("token") === null) {
    alert("you are not allowed to be here");
    history.push("/registrations");
  }
  const actions = [
    { label: "Home Appliances", value: "Home Appliances" },
    { label: "Electronics", value: "Electronics" },
    { label: "Computer Hardware", value: "Computer Hardware" },
    { label: "Mobile Phones", value: "Mobile Phones" },
  ];

  return (
    <Container>
      <form
        action={css.all}
        id={css.main}
        onSubmit={submitHandler}
        className={css.form}
      >
        <h2>Add Registers</h2>
        {isError && <h3 className={css.err}>Check The Form</h3>}
        <div className={css.inputparent}>
          <input
            onChange={(e) => setRegistersTitle(e.target.value)}
            value={registersTitle}
            className={css.input}
            type="text"
            placeholder="Title"
          />
        </div>
        <div className={css.inputparent}>
          <Select
            defaultValue={{label: "Home Appliances", value: "Home Appliances" }}
            className={css.input}
            onChange={(e) => setRegistersCategory(e.value)}
            options={actions}
          />
        </div>
        <div className={css.inputparent}>
          <textarea
            onChange={(e) => setRegistersDescription(e.target.value)}
            value={registersDescription}
            className={css.input}
            type="text"
            placeholder="Description"
          />
        </div>
        <Button Add>Add</Button>
        <h3 className={css.error}>{errorFromBE}</h3>
      </form>
    </Container>
  );
}

export default Add;
