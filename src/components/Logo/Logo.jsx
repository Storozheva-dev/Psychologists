import css from "./Logo.module.css";

const Logo = ({ className = "" }) => {
  return (
    <p className={`${css.logo} ${className}`}>
      psychologists.<span className={css.partLogo}>services</span>
    </p>
  );
};
export default Logo;
