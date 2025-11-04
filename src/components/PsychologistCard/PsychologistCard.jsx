import css from "./PsychologistCard.module.css";
import { StarIcon, HeartIcon } from "../../icons";
import { useState } from "react";

const PsychologistCard = ({ item }) => {
  const [hide, setHide] = useState(false);

  if (!item) return null;
  const {
    name,
    avatar_url,
    about,
    specialization,
    experience,
    price_per_hour,
    rating,
    license,
    initial_consultation,
    reviews,
  } = item;

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img className={css.image} src={avatar_url} alt="Psychologist" />
      </div>
      <div className={css.starPrice}>
        <StarIcon />
        <span className={css.rating}>Rating: {rating}</span>
        <span className={css.price}>
          Price / 1 hour:{" "}
          <span className={css.priceSpan}>{price_per_hour}$</span>
        </span>
        <HeartIcon />
      </div>
      <div className={css.info}>
        <p className={css.description}>Psychologist</p>
        <h2 className={css.name}>{name}</h2>
        <ul className={css.detailsList}>
          <li className={css.detail}>
            Experience: <span className={css.detailSpan}>{experience}</span>
          </li>
          <li className={css.detail}>
            License: <span className={css.detailSpan}>{license}</span>
          </li>
          <li className={css.detail}>
            Specialization:{" "}
            <span className={css.detailSpan}>{specialization}</span>
          </li>
          <li className={css.detail}>
            Initial consultation:{" "}
            <span className={css.detailSpan}>{initial_consultation}</span>
          </li>
        </ul>
        <p className={css.about}>{about}</p>
        <button className={css.readMore} onClick={() => setHide(!hide)}>
          {hide ? "Read less" : "Read more"}
        </button>

        {hide && (
          <>
            <ul className={css.reviews}>
              {reviews.map((review, index) => (
                <li key={index}>
                  <div className={css.userLine}>
                    <div className={css.userAvatar}>
                      {review.reviewer?.[0]?.toUpperCase()}
                    </div>
                    <div className={css.userStar}>
                      <p className={css.userName}>{review.reviewer}</p>
                      <p className={css.userStarsCount}>
                        <StarIcon />
                        {review.rating}
                      </p>
                    </div>
                  </div>
                  <p className={css.userReview}>{review.comment}</p>
                </li>
              ))}
              {reviews.length === 0 && (
                <p className={css.noReviews}>No reviews yet</p>
              )}
            </ul>
            <button className={css.makeAppointment}>Make an appointment</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PsychologistCard;
