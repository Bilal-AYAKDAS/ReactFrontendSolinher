// store/questionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// Bütün Soruları Çeken Axios isteği
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await apiClient.get("/questions/all-questions/");
    return response.data;
  }
);

// Filtrelenmiş soruları çeken axios isteği
export const fetchFilteredQuestions = createAsyncThunk(
  "questions/fetchFilteredQuestions",
  async (params) => {
    console.log(params)
    const response = await apiClient.get(`/questions/search/?${params}`);
    return response.data;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Filtrelenmiş sorular için işlemler
      .addCase(fetchFilteredQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(fetchFilteredQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default questionsSlice.reducer;
