import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CardList from "../../components/CardList/CardList";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container";
import Loading from "../../components/UI/Loading";
import { getFetch } from "../../helper/getFect";
import css from "./Home.module.scss";

function Home() {
  const history = useHistory();
  const [skillArr, setSkillArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expiredToken, setExpiredToken] = useState([]);

  useEffect(() => {
    getSkills();
  }, []);

  async function getSkills() {
    setIsLoading(true);
    const skillFromDB = await getFetch("accounts/8");
    setSkillArr(skillFromDB.data);
    setExpiredToken(skillFromDB);
    setIsLoading(false);
  }

  if (expiredToken.error === "invalid token") {
    alert("Your login time has expired");
    localStorage.removeItem("token");
    history.push("/");
  }

  if (localStorage.getItem("token") === null) {
    alert("you are not allowed to be here");
    history.push("/");
  }

  if (skillArr.length <= 0 && !isLoading) {
    return (
      <Container>
        <div className={css.flex}>
        <h1>Registers are empty, please add some</h1>
        <Link to={"/AddRegisters"}>
          <Button Add>Add registers</Button>
        </Link>
        </div>
        <div className={css.flex}>
          <Link to={"/Archived"}>
            <Button Archived> View Archived</Button>
          </Link>
        </div>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <div className={css.loading}>
        <Loading />
      </div>
    );
    
  } else {
    return (
      <Container>
        <div className={css.flex}>
          <h1>Registers List</h1>
          <Link to={"/AddRegisters"}>
            <Button Adds>Add Registers</Button>
          </Link>
        </div>
        <CardList cardType="registers" item={skillArr} />
        <div className={css.flex}>
          <Link to={"/Archived"}>
            <Button Archived> View Archived</Button>
          </Link>
        </div>
      </Container>
    );
  }
}

export default Home;
