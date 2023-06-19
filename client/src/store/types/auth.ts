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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
