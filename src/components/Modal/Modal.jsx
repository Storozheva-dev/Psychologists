import { useEffect } from "react";
import css from "./Modal.module.css";
import { CloseIcon } from "../../icons";

export default function Modal({ isOpen, onClose, children, labelId }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
