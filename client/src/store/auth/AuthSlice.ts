import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@store/types/auth";
import { authSignIn, authRefreshTokens, authSignUp } from "./ActionCreators";

const initialState: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignOut() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.fulfilled, (_, action) => ({
        isAuth: true,
        isLoading: false,
        ...action.payload,
      }))
      .addCase(authSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authSignUp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(authSignIn.fulfilled, (_, action) => ({
        isAuth: true,
        isLoading: false,
        ...action.payload,
      }))
      .addCase(authSignIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authSignIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(authRefreshTokens.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(authRefreshTokens.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authRefreshTokens.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { authSignOut } = authSlice.actions;

export default authSlice.reducer;
