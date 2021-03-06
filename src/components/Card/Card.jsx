import React from "react";
import { Link } from "react-router-dom";
import { archiveFecth } from "../../helper/archiveFetch";
import Button from "../UI/Button/Button";
import css from "./Card.module.scss";

function Card(props) {
  const getCardtype = props.cardType;

  function getCardTypes(getCardtype) {
    if (getCardtype === "registers") {
      return (
        <Link to={`/bills/${props.Id}`}>
          <Button Bills>View bills</Button>
        </Link>
      );
    }
    if (getCardtype === "bills") {
      async function handleDelele() {
        const deleteResult = await archiveFecth("bills/remove/" + props.id);
        if (deleteResult.data.affectedRows === 1) {
          props.onDelete();
        }
      }
      return (
        <Button onClick={handleDelele} Delete>
          Delete
        </Button>
      );
    }
    if (getCardtype === "Archived") {
      async function handleArchive() {
        const removeArchive = await archiveFecth(
          "accounts/removearchive/" + props.Id
        );
        if (removeArchive.data.affectedRows === 1) {
          props.onArchive();
        }
      }
      return (
        <Button onClick={handleArchive} RemoveArchive>
          Remove Archive
        </Button>
      );
    }
  }

  return (
    <div className={css.card}>
      <h3 className={css.header}>{props.title}</h3>
      <div className={css.body}>
        <p>{props.category}</p>
        <p>{props.description}</p>
        <div>{getCardTypes(getCardtype)}</div>
      </div>
    </div>
  );
}

export default Card;
