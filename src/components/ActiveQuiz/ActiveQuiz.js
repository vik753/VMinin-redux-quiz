import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => {
  // console.log(props)
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}
        </span>
        <small>
          {props.answerNumber} from {props.quizLength}
        </small>
      </p>
      <ul>
        <AnswersList
          answers={props.answers}
          onAnswerClick={props.onAnswerClick}
          state={props.state}
        />
      </ul>
    </div>
  );
};

export default ActiveQuiz;
