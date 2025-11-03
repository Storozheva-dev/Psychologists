import css from "./PsychologistsPage.module.css";
import React from "react";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";

const PsychologistsPage = () => {
  return (
    <div className={css.psychList}>
      <PsychologistsList />
    </div>
  );
};

export default PsychologistsPage;
