import React from "react";
import css from "./Button.module.scss";

function Button(props) {

  return (
    <button onClick={props.onClick} className={css.btn}>
      {props.children}
    </button>
  );
}

export default Button;
