import css from "./PeopleBlock.module.css";
import { PeopleIcon } from "../../icons";

const PeopleBlock = ({ className = "" }) => {
  return (
    <div className={`${css.peopleBlock} ${className}`}>
      <PeopleIcon />
    </div>
  );
};

export default PeopleBlock;
