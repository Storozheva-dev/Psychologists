import css from "./QuestionBlock.module.css";
import { QuestionMark } from "../../icons";

const QuestionBlock = () => {
  return (
    <div className={css.questionBlock}>
      <QuestionMark />
    </div>
  );
};
export default QuestionBlock;
