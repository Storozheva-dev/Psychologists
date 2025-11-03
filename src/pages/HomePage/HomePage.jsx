import css from "./HomePage.module.css";
import React from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Container from "../../components/Container/Container.jsx";
import { ArrowButton } from "../../icons/index.jsx";
import ImgWrap from "../../components/ImgWrap/ImgWrap.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Container>
        <div className={css.wrap}>
          <div className={css.glowCircle}></div>
          <div className={css.infoWrap}>
            <h1 className={css.title}>
              The road to the <span className={css.titleSpan}>depths</span> of
              the human soul
            </h1>
            <p className={css.text}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <Link className={css.btn} to="/psychologists">
              Get started
              <ArrowButton />
            </Link>
          </div>

          <ImgWrap />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
