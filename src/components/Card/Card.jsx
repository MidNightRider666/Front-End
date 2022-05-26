import React from "react";
import css from "./Card.module.scss";

function Card(props) {
  return (
    <div className={css.card}>
      <h3 className={css.header}>{props.Title}</h3>
      <div className={css.body}>
      <p>{props.Category}</p>
        <p>{props.Description}</p>
      </div>
    </div>
  );
}

export default Card;
