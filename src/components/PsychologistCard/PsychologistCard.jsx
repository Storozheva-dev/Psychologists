import css from "./PsychologistCard.module.css";
import { StarIcon, HeartIcon } from "../../icons";
import { useState } from "react";

const PsychologistCard = () => {
  const [hide, setHide] = useState(false);
  return (
    <div className={css.card}>
      <img className={css.image} src="" alt="Psychologist" />
      <div className={css.starPrice}>
        <StarIcon />
        <span>Raiting: {}</span>
        <span>Price / 1 hour: {}</span>
        <HeartIcon />
      </div>
      <div className={css.info}>
        <p className={css.description}></p>
        <h2 className={css.name}></h2>
        <ul>
          <li className={css.detail}></li>
        </ul>
        <p className={css.about}></p>
        <button className={css.readMore} onClick={() => setHide(!hide)}>
          {hide ? "Read more" : "Read less"}
        </button>

        {!hide && (
          <>
            <ul>
              <li>
                <div className={css.userAvatar}></div>
                <div className={css.userName}></div>
                <div className={css.userStars}></div>
                <div className={css.userReview}></div>
              </li>
            </ul>
            <button className={css.makeAppointment}>Make an appointment</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PsychologistCard;
