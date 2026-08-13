import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "~/dtos/authSliceDTO";
import { User } from "~/dtos/userDTO";

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: {} as User,
};

const auth = createSlice({
  name: "authState",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout, addUser, addToken } = auth.actions;

export default auth.reducer;
