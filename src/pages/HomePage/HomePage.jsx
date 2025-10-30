import css from "./HomePage.module.css";
import React from "react";
import Loader from "../../components/Loader/Loader.jsx";

const HomePage = () => {
  return (
    <>
      <h1>
        The road to the <span>depths</span> of the human soul
      </h1>
      <p>
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
      </p>
      <button>Get started</button>
    </>
  );
};

export default HomePage;
