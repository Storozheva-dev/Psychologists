import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operation";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    current: null,
    filter: "a-z",
  },
  reducers: {
    setPsychologistsFilter(state, action) {
      state.filter = action.payload;
    },
  },
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

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;

      if (state.items.includes(id)) {
        state.items = state.items.filter((item) => item !== id);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const { setPsychologistsFilter } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
