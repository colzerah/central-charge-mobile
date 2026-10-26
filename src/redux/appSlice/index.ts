import { MarketsInterface } from "@/src/app/(app)/(tabs)/home";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "~/dtos/appSliceDTO";

const initialState: AppState = {
  home: {
    listPins: [],
    values: {
      pinSelected: null,
    },
  },
  notifications: {
    listNotifications: [],
  },
};

const app = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    addPinSelected: (
      state,
      action: PayloadAction<MarketsInterface | undefined>,
    ) => {
      state.home.values.pinSelected = action.payload ? action.payload : null;
    },
  },
});

export const { addPinSelected } = app.actions;

export default app.reducer;
