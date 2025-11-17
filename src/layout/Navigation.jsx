import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

const Navigation = ({ className = "" }) => {
  const user = useSelector(selectUser);

  return (
    <nav aria-label="Main navigation">
      <ul className={`${css.navList} ${className}`}>
        <li className={css.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            Home
          </NavLink>
        </li>

        <li className={css.navItem}>
          <NavLink
            to="/psychologists"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            Psychologists
          </NavLink>
        </li>

        {user && (
          <li className={css.navItem}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
