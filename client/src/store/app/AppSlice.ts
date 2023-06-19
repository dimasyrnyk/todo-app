import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, IAlert } from "@store/types/app";

const initialState: AppState = {
  isLoading: false,
  alert: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appShowAlert(state, action: PayloadAction<IAlert>) {
      state.alert = action.payload;
    },
    appHideAlert() {
      return initialState;
    },
  },
});

export const { appShowAlert, appHideAlert } = appSlice.actions;

export default appSlice.reducer;
