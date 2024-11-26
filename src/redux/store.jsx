import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import questionsReducer from "./questionsSlice";
import myQuestionsReducer from "./myQuestionsSlice";
import questionDetailReducer from "./questionDetailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    questions: questionsReducer,
    myQuestions:myQuestionsReducer,
    questionDetail:questionDetailReducer,
  },
});

export default store;
