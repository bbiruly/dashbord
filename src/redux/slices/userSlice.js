import { createSlice } from "@reduxjs/toolkit";

// Initial state for user
const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      if (action.payload.name) {
        state.name = action.payload.name;
      }
      if (action.payload.email) {
        state.email = action.payload.email;
      }
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
