import { createSlice, current } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operation";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: { items: [], isLoading: false, error: null, current: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const psychologistsReducer = psychologistsSlice.reducer;
