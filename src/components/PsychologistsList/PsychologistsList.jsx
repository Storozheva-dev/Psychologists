import css from "./PsychologistsList.module.css";
import PsychologistCard from "../PsychologistCard/PsychologistCard";

const PsychologistsList = () => {
  return (
    <div className={css.psychList}>
      <PsychologistCard />
    </div>
  );
};

export default PsychologistsList;
