import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
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
