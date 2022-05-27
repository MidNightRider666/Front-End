import React from "react";
import Card from "../Card/Card";
import Grid from "../UI/Grid/Grid";

function CardList(props) {
  return (
    <Grid>
      {props.item.map((sObj) => (
        <Card
          cardType={props.cardType}
          key={props.cardType === 'bills' ? sObj.id : sObj.Id}
          title={props.cardType === 'bills' ? sObj.Status : sObj.Title}
          category={props.cardType === 'bills' ? sObj.Expenses : sObj.Category}
          description={props.cardType === 'registers' ? sObj.Description: sObj.register}
          {...sObj}
        />
      ))}
    </Grid>
  );
}
export default CardList;
