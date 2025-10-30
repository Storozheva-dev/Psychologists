import css from "./HeroTab.module.css";
import { CheckMarkIcon } from "../../icons";

const HeroTab = () => {
  return (
    <div className={css.heroTab}>
      <CheckMarkIcon className={css.heroIcon} />
      <div className={css.heroInfo}>
        <h3 className={css.heroTitle}>Experienced psychologists</h3>
        <p className={css.heroText}>15,000</p>
      </div>
    </div>
  );
};
