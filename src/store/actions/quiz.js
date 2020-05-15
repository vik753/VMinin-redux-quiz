import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION, QUIZ_RETRY,
  QUIZ_SET_STATE,
} from "./actionTypes";

export default function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quiz.json`);
      const quizes = [];
      // console.log(response);
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test #${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (err) {
      dispatch(fetchQuizesError(err));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(`/quiz/${quizId}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (err) {
      dispatch(fetchQuizesError(err));
    }
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      // eslint-disable-next-line no-unused-vars
      const { key, value } = state.answerState;
      if (Object.values(state.answerState)[0] === "success") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      dispatch(quizSetState({ [answerId]: "success" }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
    }
  };
}

export function retryQuiz() {
  return{
    type: QUIZ_RETRY
  }
}