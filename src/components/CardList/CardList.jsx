import React from "react";
import Card from "../Card/Card";
import Grid from "../UI/Grid/Grid";

function CardList(props) {
  return (
    <Grid>
      {props.item.map((sObj) => (
        <Card
          key={sObj.Id}
          title={sObj.Title}
          category={sObj.Category}
          description={sObj.Description}
          {...sObj}
        />
      ))}
    </Grid>
  );
}
export default CardList;
