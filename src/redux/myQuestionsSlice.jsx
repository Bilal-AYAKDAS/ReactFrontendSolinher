// store/questionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// Soruları API'den çekmek için async thunk
export const fetchQuestionsByUser = createAsyncThunk(
  "questions/fetchQuestionsByUser",
  async () => {
    const response = await apiClient.get("/questions/own-questions/");
    return response.data;
  }
);


const myQuestionsSlice = createSlice({
  name: "myQuestion",
  initialState: {
    myQuestions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myQuestions = action.payload;
      })
      .addCase(fetchQuestionsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default myQuestionsSlice.reducer;
