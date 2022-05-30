import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CardList from "../../components/CardList/CardList";
import Container from "../../components/UI/Container";
import Loading from "../../components/UI/Loading";
import { getFetch } from "../../helper/getFect";
import css from "../Archived/Archived.module.scss";

function Archived() {
  const history = useHistory();
  const [skillArr, setSkillArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expiredToken, setExpiredToken] = useState([]);

  useEffect(() => {
    getSkills();
  }, []);

  async function getSkills() {
    setIsLoading(true);
    const skillFromDB = await getFetch("accounts/archived/8");
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
        <h1>Currently there are no archives</h1>
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

  return (
    <Container>
      <div className={css.flex}>
        <h1>Archived List</h1>
      </div>
      <CardList onArchive={getSkills} cardType="Archived" item={skillArr} />
      <div className={css.flex}></div>
    </Container>
  );
}

export default Archived;
