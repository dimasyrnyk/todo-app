import { showAlert } from "@store/app/actions";
import { AppDispatch } from "..";
import { AuthActionTypes, AuthAction, ILoginUserDto } from "../types/auth";

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
        showAlert({ text: json.message || "Something went wrong, try again" })
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
