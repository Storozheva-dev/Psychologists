import css from "./PsychologistsList.module.css";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredPsychologists } from "../../redux/psychologist/selectors";

const PsychologistsList = ({ customList }) => {
  const [visible, setVisible] = useState(3);

  const psychologistsFromStore = useSelector(getFilteredPsychologists);

  const psychologists = (customList ?? psychologistsFromStore) || [];
  const show = psychologists.slice(0, visible);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 3);
  };

  return (
    <div className={css.wrap}>
      <ul
        className={css.psychList}
        aria-live="polite"
        aria-label="List of psychologists"
      >
        {show.map((psych) => (
          <PsychologistCard key={psych.id} item={psych} />
        ))}
      </ul>

      {visible < psychologists.length && (
        <button
          type="button"
          className={css.loadMore}
          onClick={handleLoadMore}
          aria-label={`Load more psychologists, currently showing ${show.length} of ${psychologists.length}`}
        >
          Load more
        </button>
      )}

      {visible >= psychologists.length && psychologists.length > 0 && (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className={css.loadMore}
          aria-label="All psychologists are already loaded"
        >
          No more
        </button>
      )}
    </div>
  );
};

export default PsychologistsList;
