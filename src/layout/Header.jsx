import css from "./Header.module.css";
import Navigation from "./Navigation.jsx";
import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo.jsx";
import Modal from "../components/Modal/Modal.jsx";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import { useState } from "react";

const Header = () => {
  const [mode, setMode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (selectedMode) => {
    setMode(selectedMode);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMode(null);
  };

  return (
    <div className={css.header}>
      <Link to="/" className={css.logoLink}>
        <Logo className={css.logo} />
      </Link>

      <Navigation className={css.nav} />

      <div className={css.authButtons}>
        <button
          type="button"
          className={css.logBtn}
          onClick={() => openModal("login")}
        >
          Log in
        </button>
        <button
          type="button"
          className={css.regBtn}
          onClick={() => openModal("register")}
        >
          Registration
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} labelId="auth-modal-title">
        {mode && <AuthForm mode={mode} onSuccess={closeModal} />}
      </Modal>
    </div>
  );
};

export default Header;
