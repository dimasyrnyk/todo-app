import { showAlertWithTimeout } from "@store/app/actions";
import { AppDispatch } from "..";
import { AuthActionTypes, AuthAction, ILoginUserDto } from "../types/auth";
import { AlertMessage } from "@constants/app";

export const showLoader = () => ({
  type: AuthActionTypes.USER_START_LOADING,
});

export const hideLoader = () => ({
  type: AuthActionTypes.USER_END_LOADING,
});

export const userSignIn = (user: ILoginUserDto) => {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoader());
    const response = await fetch("/api/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: json.message || AlertMessage.TRY_AGAIN,
        })
      );
      dispatch(hideLoader());
    } else {
      dispatch({ type: AuthActionTypes.USER_LOGIN, payload: json });
      dispatch(hideLoader());
    }
  };
};

export const userSignOut = (): AuthAction => ({
  type: AuthActionTypes.USER_LOGOUT,
});

export function refreshTokens(refreshToken: string) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`/api/user/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const json = await response.json();

    if (!response.ok) {
      dispatch(
        showAlertWithTimeout({
          text: json.message || AlertMessage.SESSIOIN_IS_OVER,
        })
      );
    } else {
      dispatch({
        type: AuthActionTypes.USER_REFRESH_TOKEN,
        payload: json,
      });

      return json;
    }
  };
}
