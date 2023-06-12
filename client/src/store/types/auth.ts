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
  token: string | null;
  user: IUser | null;
  isLoading: boolean;
}

export enum AuthTypes {
  USER_LOGIN = "auth/LOGIN",
  USER_LOGOUT = "auth/LOGOUT",
}

interface LoginUserAction {
  type: AuthTypes.USER_LOGIN;
  payload: {
    accessToken: string;
    user: IUser;
  };
}

interface LogoutUserAction {
  type: AuthTypes.USER_LOGOUT;
}

export type AuthAction = LoginUserAction | LogoutUserAction;
