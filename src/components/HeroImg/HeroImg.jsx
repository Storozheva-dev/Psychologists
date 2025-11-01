import css from "./HeroImg.module.css";

const HeroImg = ({ children, className = "" }) => {
  return <div className={`${css.heroImg} ${className}`}> {children}</div>;
};
export default HeroImg;
