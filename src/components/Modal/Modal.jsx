// Modal.jsx
import { useEffect } from "react";
import css from "./Modal.module.css";
import { CloseIcon } from "../../icons";

export default function Modal({ isOpen, onClose, children, labelId }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon className={css.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  );
}
