import { MarketsInterface } from "@/src/app/(app)/(tabs)/home";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "~/dtos/appSliceDTO";
import { AppLanguage } from "~/dtos/languageDTO";
import { getDeviceLanguage } from "~/i18n";

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
  // Começa no idioma do celular; o salvo no aparelho é aplicado no bootstrap
  language: getDeviceLanguage(),
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
    addLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload;
    },
  },
});

export const { addPinSelected, addOnboardingDone, addLanguage } = app.actions;

export default app.reducer;
