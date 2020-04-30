import axios from "axios";

export default axios.create({
  baseURL: `https://react-quiz-c7d29.firebaseio.com/`
})
