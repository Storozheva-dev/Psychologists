import css from "./Logo.module.css";

const Logo = () => {
  return (
    <p className={css.logo}>
      psychologists.<span className={css.partLogo}>services</span>
    </p>
  );
};
