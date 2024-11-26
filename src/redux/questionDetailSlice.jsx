// store/questionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// Soruları API'den çekmek için async thunk
export const fetchQuestionDetail = createAsyncThunk(
  "question/detail",
  async (id) => {
    const response = await apiClient.get(`/questions/question/${id}`);
    return response.data;
  }
);


const questionDetailSlice = createSlice({
  name: "questionDetail",
  initialState: {
    questionDetail: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionDetail = action.payload;
      })
      .addCase(fetchQuestionDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default questionDetailSlice.reducer;
