import { AppState } from "@/dtos/appSliceDTO";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppState = {
  home: {
    listPins: [],
  },
  notifications: {
    listNotifications: [],
  },
};

const app = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {},
});

export const {} = app.actions;

export default app.reducer;
