import css from "./PsychologistsPage.module.css";
import PsychologistsList from "../../components/PsychologistsList/PsychologistsList";
import Container from "../../components/Container/Container";
import { fetchPsychologists } from "../../redux/psychologist/operation";
import { useDispatch, useSelector } from "react-redux";
import {
  getPsychologists,
  getPsychologistsError,
  getPsychologistsLoadingStatus,
} from "../../redux/psychologist/selectors";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

const PsychologistsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(getPsychologistsError);
  const isLoading = useSelector(getPsychologistsLoadingStatus);

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <PsychologistsList />
    </Container>
  );
};

export default PsychologistsPage;
