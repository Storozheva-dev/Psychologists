import css from "./PsychologistsPage.module.css";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import Container from "../../components/Container/Container";
import { fetchPsychologists } from "../../redux/psychologist/operation";
import { useDispatch, useSelector } from "react-redux";
import {
  getPsychologistsError,
  getPsychologistsLoadingStatus,
  getFilteredPsychologists,
  getPsychologistsFilter,
} from "../../redux/psychologist/selectors";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import FILTER_OPTIONS from "../../constants/filterOptions";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import { setPsychologistsFilter } from "../../redux/psychologist/slice";

const PsychologistsPage = () => {
  const dispatch = useDispatch();

  const error = useSelector(getPsychologistsError);
  const isLoading = useSelector(getPsychologistsLoadingStatus);
  const psychologists = useSelector(getFilteredPsychologists);
  const selected = useSelector(getPsychologistsFilter);

  useEffect(() => {
    dispatch(setPsychologistsFilter("all"));
    dispatch(fetchPsychologists());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <Container className={css.wrapper}>
      <FilterDropdown
        options={FILTER_OPTIONS}
        selected={selected}
        onSelect={(value) => dispatch(setPsychologistsFilter(value))}
      />

      <PsychologistsList items={psychologists} />
    </Container>
  );
};

export default PsychologistsPage;
