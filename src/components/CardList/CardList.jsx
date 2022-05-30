import React from "react";
import Card from "../Card/Card";
import Grid from "../UI/Grid/Grid";

function CardList(props) {
  return (
    <Grid>
      {props.item.map((sObj) => (
        <Card
          onDelete={props.onDelete}
          cardType={props.cardType}
          onArchive={props.onArchive}
          key={props.cardType === "bills" ? sObj.id : sObj.Id}
          title={props.cardType === "bills" ? sObj.Status : sObj.Title}
          category={
            props.cardType === "bills" ? `$${sObj.Expenses}` : sObj.Category
          }
          description={
            props.cardType === "registers" || "Archived" ? sObj.Description : ""
          }
          {...sObj}
        />
      ))}
    </Grid>
  );
}
export default CardList;
