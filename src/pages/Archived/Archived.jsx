import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CardList from '../../components/CardList/CardList';
import Button from '../../components/UI/Button/Button';
import Container from '../../components/UI/Container';
import Loading from '../../components/UI/Loading';
import { getFetch } from '../../helper/getFect';
import css from '../Archived/Archived.module.scss'

function Archived() {

  const [skillArr, setSkillArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSkills();
  }, []);


  async function getSkills() {
    setIsLoading(true)
    const skillFromDB = await getFetch("accounts/archived/8");
    setSkillArr(skillFromDB.data);
    setIsLoading(false)
    console.log('skillFromDB===', skillFromDB.data);
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
    <CardList onArchive={getSkills} cardType='Archived' item={skillArr} />
    <div className={css.flex}>
    </div>
  </Container>
);
}

export default Archived