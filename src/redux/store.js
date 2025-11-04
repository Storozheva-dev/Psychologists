import { configureStore } from "@reduxjs/toolkit";
import { psychologistsReducer } from "../redux/psychologist/slice";

export const store = configureStore({
  reducer: {
    psychologists: psychologistsReducer,
  },
});

export default store;
