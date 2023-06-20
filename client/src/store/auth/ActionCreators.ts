import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { appShowAlert } from "@store/app/AppSlice";
import { ICreateUserDto, ILoginUserDto } from "@store/types/auth";
import { AlertMessage } from "@constants/app";

export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async (user: ICreateUserDto, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/signup", user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async (user: ILoginUserDto, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/signin", user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.TRY_AGAIN;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const authRefreshTokens = createAsyncThunk(
  "auth/refresh",
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await axios.post("/api/user/refresh", {
        token: refreshToken,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response
        ? error.response.data.message
        : AlertMessage.SESSIOIN_IS_OVER;

      thunkAPI.dispatch(appShowAlert({ text: errorMessage, isError: true }));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
