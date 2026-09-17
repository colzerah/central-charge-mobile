import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "~/dtos/authSliceDTO";
import { User } from "~/dtos/userDTO";

const initialState: AuthState = {
  isAuthenticated: null,
  isAuthLoading: false,
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
    addloading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },

    addIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    addlogout: () => ({ ...initialState, isAuthenticated: false }),
  },
});

export const { addlogout, addUser, addToken, addloading, addIsAuthenticated } =
  auth.actions;

export default auth.reducer;
