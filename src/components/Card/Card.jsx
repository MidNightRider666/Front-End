import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import css from "./Card.module.scss";

function Card(props) {

  const getCardtype = props.cardType
  console.log('getCardtype===', getCardtype);

  function getCardTypes(getCardtype){
    if(getCardtype === 'registers') {
      return <Link to={`/bills/${props.Id}`}>
      <Button>View bills</Button>
      </Link>
    }
    if (getCardtype === 'bills') {
      return;
    }
  }

  return (
    <div className={css.card}>
      <h3 className={css.header}>{props.title}</h3>
      <div className={css.body}>
      <p>{props.category}</p>
        <p>{props.description}</p> 
        <div>
        {getCardTypes(getCardtype)}
        </div>
      </div>
    </div>
  );
}

export default Card;
