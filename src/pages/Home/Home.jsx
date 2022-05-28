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

  if (localStorage.getItem("token") === null) {
    return (
      <Container>
        <div className={css.flex}>
          <h1 className={css.noToken}>
            Skills are only for registered users. If you have an account please
            log in
          </h1>
        </div>
        <h1>
          <img
            className={css.TokenLogo}
            src="https://www.logolynx.com/images/logolynx/35/351d1bcd0ac14fd8f1e9ebe2d181ad66.jpeg"
            alt="Error img"
          />
        </h1>
      </Container>
    );
  }
    else {
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
}

export default Home;
