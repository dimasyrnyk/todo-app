import { IUser } from "@constants/auth";

export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  picture: string;
}

export interface ILoginUserDto {
  email: string;
  password: string;
}

export interface AuthState {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
  isLoading: boolean;
}

export enum AuthActionTypes {
  USER_START_LOADING = "auth/START_LOADING",
  USER_END_LOADING = "auth/END_LOADING",
  USER_LOGIN = "auth/LOGIN",
  USER_LOGOUT = "auth/LOGOUT",
  USER_REFRESH_TOKEN = "auth/REFRESH_TOKEN",
}

interface StartLoadingAction {
  type: AuthActionTypes.USER_START_LOADING;
}

interface EndLoadingAction {
  type: AuthActionTypes.USER_END_LOADING;
}

interface LoginUserAction {
  type: AuthActionTypes.USER_LOGIN;
  payload: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  };
}

interface LogoutUserAction {
  type: AuthActionTypes.USER_LOGOUT;
}

interface RefreshTokenAction {
  type: AuthActionTypes.USER_REFRESH_TOKEN;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

export type AuthAction =
  | StartLoadingAction
  | EndLoadingAction
  | LoginUserAction
  | LogoutUserAction
  | RefreshTokenAction;
