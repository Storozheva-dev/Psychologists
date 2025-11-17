import css from "./HomePage.module.css";
import Container from "../../components/Container/Container.jsx";
import { ArrowButton } from "../../icons/index.jsx";
import ImgWrap from "../../components/ImgWrap/ImgWrap.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container>
      <main className={css.wrap} aria-labelledby="home-page-title">
        <div className={css.glowCircle} aria-hidden="true"></div>

        <div className={css.infoWrap}>
          <h1 className={css.title} id="home-page-title">
            The road to the <span className={css.titleSpan}>depths</span> of the
            human soul
          </h1>

          <p className={css.text}>
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>

          <Link
            className={css.btn}
            to="/psychologists"
            aria-label="Get started and view the list of psychologists"
          >
            Get started
            <ArrowButton aria-hidden="true" />
          </Link>
        </div>

        <ImgWrap />
      </main>
    </Container>
  );
};

export default HomePage;
