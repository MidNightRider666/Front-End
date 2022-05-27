import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardList from "../../components/CardList/CardList";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import { getFetch } from "../../helper/getFect";
import css from "./Home.module.scss";

function Home() {
  const [skillArr, setSkillArr] = useState([]);

  useEffect(() => {
    getSkills();
  }, []);


  async function getSkills() {
    const skillFromDB = await getFetch("accounts/8");
    setSkillArr(skillFromDB.data);
    console.log('skillFromDB===', skillFromDB.data);
  }

    return (
      <Container>
        <div className={css.flex}>
          <h1>Skills List</h1>
          <Link to={"/Add"}>
            <Button Add>Add skills</Button>
          </Link>
        </div>
        <CardList cardType='registers' item={skillArr} />
        <div className={css.flex}>
        <Link to={"/Archived"}>
        <Button> View Archived</Button>
      </Link>
        </div>
      </Container>
    );
  }

export default Home;
