import css from "./HomePage.module.css";
import React from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Container from "../../components/Container/Container.jsx";
import { ArrowButton } from "../../icons/index.jsx";
import ImgWrap from "../../components/ImgWrap/ImgWrap.jsx";

const HomePage = () => {
  return (
    <>
      <Container>
        <div className={css.wrap}>
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
            <button className={css.btn}>
              Get started
              <ArrowButton />
            </button>
          </div>

          <ImgWrap />
        </div>
      </Container>
    </>
  );
};

export default HomePage;
