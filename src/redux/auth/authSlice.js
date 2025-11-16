import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthReady: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthReady = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthReady = true;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
