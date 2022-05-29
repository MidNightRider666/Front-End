import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardList from "../../components/CardList/CardList";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import Loading from "../../components/UI/Loading";
import { getFetch } from "../../helper/getFect";
import css from "./Home.module.scss";

function Home() {
  const [skillArr, setSkillArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expiredToken, setExpiredToken] = useState([]);

  useEffect(() => {
    getSkills();
  }, []);


  async function getSkills() {
    setIsLoading(true)
    const skillFromDB = await getFetch("accounts/8");
    console.log('skillFromDB===', skillFromDB);
    setSkillArr(skillFromDB.data);
    setExpiredToken(skillFromDB)
    setIsLoading(false)
  }
  console.log('expiredToken===', expiredToken.error);

  if(expiredToken.error === 'invalid token') {
    return (
    <Container>
    <div className={css.flex}>
    <h1 className={css.noToken}>
      Your login time has expired, please log in again
    </h1>
  </div>
  </Container>
    )
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

  if (skillArr.length <= 0 && !isLoading) {
    return (
      <Container>
        <h1>Registers are empty, please add some</h1>
        <Link to={"/AddRegisters"}>
          <Button Add>Add registers</Button>
        </Link>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <div className={css.loading}>
        <Loading />
      </div>
    );
  }
    else {
    return (
      <Container>
        <div className={css.flex}>
          <h1>Registers List</h1>
          <Link to={"/AddRegisters"}>
            <Button Add>Add Registers</Button>
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
