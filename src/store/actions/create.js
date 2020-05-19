import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
  console.log('item', item)
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATOR,
  };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post(`/quiz.json`, getState().create.quiz);
    dispatch(resetQuizCreation());
  };
}
