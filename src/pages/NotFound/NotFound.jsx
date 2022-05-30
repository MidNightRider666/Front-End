import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Container from '../../components/UI/Container'
import css from '../NotFound/NotFound.module.scss'


function NotFound() {
  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    const secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(secTimer);
  }, []);

  return (
    <Container>
      <main>
        <aside>
          <div className={css.block}>{dt}</div>
          <div className={css.block} id="help">
            <h2>
              If you expierence any trouble, please contact this email:
              youremail@gmail.com
            </h2>
          </div>
        </aside>
        <div className={css.block}>
          <h2>The link that you are trying to accecs does not exist</h2>
          <div className={css.content}>
            Please return to the{" "}
            <NavLink className={css.NavLink} to={"/"}>
              main
            </NavLink>{" "}
            page
          </div>
        </div>
      </main>
    </Container>
  );
}

export default NotFound