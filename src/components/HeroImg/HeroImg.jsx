import css from "./HeroImg.module.css";

const HeroImg = ({ children }) => {
  return <div className={css.heroImg}> {children}</div>;
};
