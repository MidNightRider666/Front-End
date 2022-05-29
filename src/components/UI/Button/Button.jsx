import React from "react";

function Button(props) {

  return (
    <button disabled={props.dissable} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
