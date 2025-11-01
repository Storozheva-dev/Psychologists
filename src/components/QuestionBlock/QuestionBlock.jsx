import css from "./QuestionBlock.module.css";
import { QuestionMark } from "../../icons";

const QuestionBlock = ({ className = "" }) => {
  return (
    <div className={`${css.questionBlock} ${className}`}>
      <QuestionMark />
    </div>
  );
};
export default QuestionBlock;
