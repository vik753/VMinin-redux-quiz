import React from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "./../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz./FinishedQuiz";

class Quiz extends React.Component {
  state = {
    isFinished: true,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success}\' or 'error'
    quiz: [
      {
        question: "What color's the sky?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Black", id: 1 },
          { text: "Blue", id: 2 },
          { text: "Red", id: 3 },
          { text: "Green", id: 4 },
        ],
      },
      {
        question: "How many colors in the rainbow?",
        rightAnswerId: 1,
        answerState: null,
        id: 2,
        answers: [
          { text: "Seven", id: 1 },
          { text: "Five", id: 2 },
          { text: "Four", id: 3 },
          { text: "Twenty", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const { key, value } = this.state.answerState;
      console.log(value);
      if (Object.values(this.state.answerState)[0] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: "success" },
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: "error" },
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions, please:</h1>
          {this.state.isFinished ? (
            <FinishedQuiz />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[[this.state.activeQuestion]].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
