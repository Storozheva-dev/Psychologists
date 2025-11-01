import css from "./ImgWrap.module.css";
import HeroTab from "../HeroTab/HeroTab.jsx";
import HeroImg from "../HeroImg/HeroImg.jsx";
import PeopleBlock from "../PeopleBlock/PeopleBlock.jsx";
import QuestionBlock from "../QuestionBlock/QuestionBlock.jsx";

const ImgWrap = () => {
  return (
    <div className={css.imgWrap}>
      <HeroImg className={css.photo} />
      <HeroTab className={`${css.badge} ${css.badgeLeft} ${css.fadePulse} ${css.tab}`} />
      <PeopleBlock
        className={`${css.badge} ${css.badgeLeft} ${css.fadePulse}`}
      />
      <QuestionBlock
        className={`${css.badge} ${css.badgeRight} ${css.fadePulse}`}
      />
    </div>
  );
};
export default ImgWrap;
