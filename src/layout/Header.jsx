import css from "./Header.module.css";
import Navigation from "./Navigation.jsx";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo/Logo.jsx";
import Modal from "../components/Modal/Modal.jsx";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../firebase/authService";
import { selectUser } from "../redux/auth/selectors.js";
import { setUser } from "../redux/auth/authSlice.js";
import { auth } from "../firebase/config";
import { PersonIcon } from "../icons/index.jsx";

const Header = () => {
  const [mode, setMode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const openModal = (selectedMode) => {
    setMode(selectedMode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setMode(null);
    setIsOpen(false);
  };

  const handleAuthSuccess = () => {
    const current = auth.currentUser;
    if (current) {
      dispatch(setUser(current));
    }

    closeModal();
    navigate("/psychologists");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className={css.header}>
      <Link to="/" className={css.logoLink} aria-label="Go to home page">
        <Logo className={css.logo} />
      </Link>

      <Navigation className={css.nav} />

      {!user && (
        <div
          className={css.authButtons}
          aria-label="Authentication"
          role="group"
        >
          <button
            type="button"
            className={css.logBtn}
            onClick={() => openModal("login")}
            aria-haspopup="dialog"
            aria-expanded={isOpen && mode === "login"}
          >
            Log in
          </button>

          <button
            type="button"
            className={css.regBtn}
            onClick={() => openModal("register")}
            aria-haspopup="dialog"
            aria-expanded={isOpen && mode === "register"}
          >
            Registration
          </button>
        </div>
      )}

      {user && (
        <div className={css.userBlock}>
          <div
            className={css.userInfo}
            aria-label={`Logged in as ${user.displayName || user.email}`}
          >
            <PersonIcon className={css.userIcon} aria-hidden="true" />
            <span className={css.userName}>
              {user.displayName || user.email}
            </span>
          </div>

          <button
            type="button"
            className={css.logOutBtn}
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} labelId="auth-modal-title">
        {mode && <AuthForm mode={mode} onSuccess={handleAuthSuccess} />}
      </Modal>
    </header>
  );
};

export default Header;
