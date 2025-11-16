import css from "./PsychologistCard.module.css";
import { StarIcon, HeartIcon } from "../../icons";
import { useState } from "react";
import { getFavorites } from "../../redux/psychologist/selectors";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/psychologist/slice";
import { selectUser } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

const PsychologistCard = ({ item }) => {
  const [hide, setHide] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);
  const user = useSelector(selectUser);

  const isFavorite = favorites.includes(item.id);

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

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error("Log in to add psychologists to favorites", { icon: "🔒" });
      return;
    }
    dispatch(toggleFavorite(item.id));
  };

  const handleAppointmentClick = () => {
    if (!user) {
      toast.error("Log in to make an appointment", { icon: "🔒" });
      return;
    }
    setIsAppointmentOpen(true);
  };

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
        <button
          aria-label="Add to favorites"
          type="button"
          onClick={handleFavoriteClick}
          className={isFavorite ? `${css.heart} ${css.active}` : css.heart}
        >
          <HeartIcon filled={isFavorite} />
        </button>
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
            <button
              className={css.makeAppointment}
              type="button"
              onClick={handleAppointmentClick}
            >
              Make an appointment
            </button>
          </>
        )}
      </div>

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        psychologist={item}
      />
    </div>
  );
};

export default PsychologistCard;
