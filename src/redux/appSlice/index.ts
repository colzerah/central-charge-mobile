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
  onboardingDone: null,
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
    addOnboardingDone: (state, action: PayloadAction<boolean>) => {
      state.onboardingDone = action.payload;
    },
  },
});

export const { addPinSelected, addOnboardingDone } = app.actions;

export default app.reducer;
