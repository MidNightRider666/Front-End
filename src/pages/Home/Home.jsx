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
    setIsLoading(true)
    const skillFromDB = await getFetch("accounts/8");
    console.log('skillFromDB===', skillFromDB);
    setSkillArr(skillFromDB.data);
    setExpiredToken(skillFromDB)
    setIsLoading(false)
  }
  console.log('expiredToken===', expiredToken.error);

  if(expiredToken.error === 'invalid token') {
    alert('Your login time has expired')
    localStorage.removeItem('token')
    history.push('/')
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
