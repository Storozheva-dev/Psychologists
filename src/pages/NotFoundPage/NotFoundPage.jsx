// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.illustration} aria-hidden="true">
        <svg
          className={css.svg}
          viewBox="0 0 200 160"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="20"
            y="20"
            rx="16"
            ry="16"
            width="160"
            height="70"
            className={css.bubble}
          />
          <text x="100" y="68" textAnchor="middle" className={css.bubbleText}>
            404
          </text>

          <rect
            x="40"
            y="105"
            width="120"
            height="26"
            rx="6"
            className={css.couch}
          />
          <rect
            x="50"
            y="90"
            width="35"
            height="18"
            rx="5"
            className={css.couchBack}
          />
          <rect
            x="115"
            y="90"
            width="35"
            height="18"
            rx="5"
            className={css.couchBack}
          />
          <rect
            x="50"
            y="132"
            width="12"
            height="10"
            rx="3"
            className={css.couchLeg}
          />
          <rect
            x="138"
            y="132"
            width="12"
            height="10"
            rx="3"
            className={css.couchLeg}
          />

          <circle cx="100" cy="102" r="10" className={css.face} />
          <circle cx="96" cy="100" r="1.5" className={css.eye} />
          <circle cx="104" cy="100" r="1.5" className={css.eye} />
          <path d="M94 105 Q100 108 106 105" className={css.mouth} />
        </svg>
      </div>

      <h1 className={css.title}>
        Oops, this page is taking a mental health break
      </h1>

      <p className={css.subtitle}>
        Looks like the page you're searching for needed a session of its own.
        Let’s get you back to something that actually exists.
      </p>

      <div className={css.actions}>
        <Link to="/" className={css.primaryBtn}>
          ⬅ Back to home
        </Link>
        <Link to="/psychologists" className={css.secondaryBtn}>
          Browse psychologists
        </Link>
      </div>

      <p className={css.smallText}>
        If you’re absolutely sure this page should be here, feel free to tell
        your developer. Or your therapist. Or both.
      </p>
    </div>
  );
};

export default NotFoundPage;
