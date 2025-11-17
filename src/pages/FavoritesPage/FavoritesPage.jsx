import css from "./FavoritesPage.module.css";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList.jsx";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown.jsx";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchPsychologists } from "../../redux/psychologist/operation";
import {
  getPsychologists,
  getPsychologistsLoadingStatus,
  getPsychologistsError,
  getFavoritePsychologists,
  getPsychologistsFilter,
} from "../../redux/psychologist/selectors.js";

import FILTER_OPTIONS from "../../constants/filterOptions.js";
import { setPsychologistsFilter } from "../../redux/psychologist/slice";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const error = useSelector(getPsychologistsError);
  const isLoading = useSelector(getPsychologistsLoadingStatus);
  const psychologists = useSelector(getPsychologists);
  const favoritesPsychologists = useSelector(getFavoritePsychologists);
  const selected = useSelector(getPsychologistsFilter);

  useEffect(() => {
    dispatch(setPsychologistsFilter("all"));
    if (!psychologists || psychologists.length === 0) {
      dispatch(fetchPsychologists());
    }
  }, [dispatch, psychologists]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <Container>
        <main aria-labelledby="favorites-page-title">
          <h1 id="favorites-page-title">Favorite psychologists</h1>
          <p role="alert">{error}</p>
        </main>
      </Container>
    );
  }

  return (
    <Container>
      <main aria-labelledby="favorites-page-title">
        <h1 id="favorites-page-title">Favorite psychologists</h1>

        {favoritesPsychologists.length === 0 ? (
          <p role="status" aria-live="polite">
            No favorites yet
          </p>
        ) : (
          <>
            <FilterDropdown
              options={FILTER_OPTIONS}
              selected={selected}
              onSelect={(value) => dispatch(setPsychologistsFilter(value))}
            />
            <PsychologistsList customList={favoritesPsychologists} />
          </>
        )}
      </main>
    </Container>
  );
};

export default FavoritesPage;
