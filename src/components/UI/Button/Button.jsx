import React from "react";
import css from "./Button.module.scss";

function Button(props) {
  const extraBtn = props.logout
    ? css.logout
    : props.AddFocus
    ? css.AddFocus
    : props.Bills
    ? css.Bills
    : props.RemoveArchive
    ? css.RemoveArchive
    : props.RegLog
    ? css.RegLog
    : props.Archived
    ? css.Archived
    : props.Add
    ? css.Add
    : props.Delete
    ? css.Delete
    : props.Adds
    ? css.Adds
    :"";
  return (
    <button
      disabled={props.dissable}
      onClick={props.onClick}
      className={`${css.btn} ${extraBtn}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
