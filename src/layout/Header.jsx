import css from "./Header.module.css";
import Navigation from "./Navigation.jsx";
import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo.jsx";

const Header = () => {
  return (
    <div className={css.header}>
      <Link to="/" className={css.logoLink}>
        <Logo className={css.logo} />
      </Link>
      <Navigation className={css.nav} />
      <div className={css.authButtons}>
        <button className={css.logBtn}>Log in</button>
        <button className={css.regBtn}>Registration</button>
      </div>
    </div>
  );
};
export default Header;
