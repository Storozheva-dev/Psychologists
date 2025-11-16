import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";

const Navigation = ({ className = "" }) => {
  const user = useSelector(selectUser);
  return (
    <>
      <ul className={`${css.navList} ${className}`}>
        <li className={css.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
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
          >
            Psychologists
          </NavLink>
        </li>
        <li className={css.navItem}>
          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Favorites
            </NavLink>
          )}
        </li>
      </ul>
    </>
  );
};
export default Navigation;
