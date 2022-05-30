import css from "./Grid.module.scss";

function Grid({ children }) {
  return <div className={css.grid}>{children}</div>;
}

export default Grid;
