import React from "react";
import css from "./Button.module.scss";

function Button(props) {
  const extraBtn = props.logout ? css.logout : props.AddFocus ? css.AddFocus : props.Bills ? css.Bills : props.RemoveArchive ? css.RemoveArchive: '';
  return (
    <button disabled={props.dissable} onClick={props.onClick} className={`${css.btn} ${extraBtn}`}>
      {props.children}
    </button>
  );
}

export default Button;
