import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import css from "./Card.module.scss";

function Card(props) {
  return (
    <div className={css.card}>
      <h3 className={css.header}>{props.title}</h3>
      <div className={css.body}>
      <p>{props.category}</p>
        <p>{props.description}</p>
        {!props.cardType && (
        <Link to={`/bills/${props.Id}`}>
        <Button>View bills</Button>
        </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
