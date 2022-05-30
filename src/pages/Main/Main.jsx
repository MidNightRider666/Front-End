import React, { useEffect, useState } from "react";
import Container from "../../components/UI/Container";
import css from "../Main/Main.module.scss";

function Main() {
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
          <h2>This website designed to store Technical registrations</h2>
          <div className={css.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
            nesciunt quod natus incidunt, nobis voluptate fugit quam nisi
            distinctio ratione deleniti ut temporibus ex illo harum accusantium
            aspernatur beatae. Sit ad vel voluptate consequatur, ab unde error
            id, laboriosam temporibus, voluptatum animi ipsa? Ipsum voluptate
            corporis fuga consequuntur ipsam laborum?
          </div>
        </div>
      </main>
      <div className={css.block}>
        <h2>This website designed to store Technical registrations</h2>
        <div className={css.content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
          nesciunt quod natus incidunt, nobis voluptate fugit quam nisi
          distinctio ratione deleniti ut temporibus ex illo harum accusantium
          aspernatur beatae. Sit ad vel voluptate consequatur, ab unde error id,
          laboriosam temporibus, voluptatum animi ipsa? Ipsum voluptate corporis
          fuga consequuntur ipsam laborum?
        </div>
      </div>
    </Container>
  );
}

export default Main;
