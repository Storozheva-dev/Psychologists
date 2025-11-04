import css from "./PsychologistsList.module.css";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPsychologists } from "../../redux/psychologist/operation";
import {
  getPsychologists,
  getPsychologistsLoadingStatus,
  getPsychologistsError,
} from "../../redux/psychologist/selectors";
import Loader from "../Loader/Loader";

const PsychologistsList = () => {
  const [visible, setVisible] = useState(3);

  const psychologists = useSelector(getPsychologists);

  const show = psychologists.slice(0, visible);

  return (
    <div className={css.wrap}>
      <ul className={css.psychList}>
        {show.map((psych) => (
          <PsychologistCard key={psych.id} item={psych} />
        ))}
      </ul>
      {visible < psychologists.length && (
        <button
          type="button"
          className={css.loadMore}
          onClick={() => setVisible((prev) => prev + 3)}
        >
          Load more
        </button>
      )}
      {visible === psychologists.length && (
        <button type="button" disabled className={css.loadMore}>
          No more
        </button>
      )}
    </div>
  );
};

export default PsychologistsList;
