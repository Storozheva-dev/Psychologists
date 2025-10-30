import css from "./PeopleBlock.module.css";
import { PeopleIcon } from "../../icons";

const PeopleBlock = () => {
  return (
    <div className={css.peopleBlock}>
      <PeopleIcon />
    </div>
  );
};

export default PeopleBlock;
