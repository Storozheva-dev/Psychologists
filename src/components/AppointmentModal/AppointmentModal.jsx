import { useEffect } from "react";
import css from "./AppointmentModal.module.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

export default function AppointmentModal({ isOpen, onClose, psychologist }) {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !psychologist) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2 className={css.title}>Make an appointment with a psychologists</h2>

        <p className={css.subtitle}>
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
            <div className={css.avatarFallback}>
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
