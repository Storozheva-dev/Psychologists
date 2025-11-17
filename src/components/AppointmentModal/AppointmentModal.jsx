import { useEffect, useRef } from "react";
import css from "./AppointmentModal.module.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

export default function AppointmentModal({ isOpen, onClose, psychologist }) {
  const dialogRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // запоминаем, где был фокус до открытия
    lastActiveElementRef.current = document.activeElement;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);

    // ставим фокус внутрь модалки
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      const focusable = dialogNode.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) {
        focusable.focus();
      } else {
        dialogNode.focus();
      }
    }

    return () => {
      document.body.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKeyDown);

      // возвращаем фокус туда, откуда пришли
      if (lastActiveElementRef.current && lastActiveElementRef.current.focus) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !psychologist) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      aria-modal="true"
      // связь с заголовком и текстом
      aria-labelledby="appointment-modal-title"
      aria-describedby="appointment-modal-subtitle"
    >
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        tabIndex={-1} // чтобы можно было дать фокус контейнеру
        ref={dialogRef}
      >
        <button
          className={css.closeBtn}
          onClick={onClose}
          type="button"
          aria-label="Close appointment dialog"
        >
          ×
        </button>

        <h2 className={css.title} id="appointment-modal-title">
          Make an appointment with a psychologists
        </h2>

        <p className={css.subtitle} id="appointment-modal-subtitle">
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        <div className={css.psychologist}>
          {psychologist.avatar_url && (
            <img
              src={psychologist.avatar_url}
              className={css.avatar}
              alt={psychologist.name}
            />
          )}
          {!psychologist.avatar_url && (
            <div className={css.avatarFallback} aria-hidden="true">
              {psychologist.name?.[0]?.toUpperCase() || "P"}
            </div>
          )}
          <div className={css.psychInfo}>
            <span className={css.label}>Your psychologist</span>
            <span className={css.name}>{psychologist.name}</span>
          </div>
        </div>

        <AppointmentForm psychologist={psychologist} onSuccess={onClose} />
      </div>
    </div>
  );
}
