import { showAlert } from "@store/app/actions";
import { AppDispatch } from "..";
import { AuthTypes, AuthAction, ILoginUserDto } from "../types/auth";

export const userSignIn = (user: ILoginUserDto) => {
  return async (dispatch: AppDispatch) => {
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
        showAlert({
          text: json.message || "Something went wrong, try again",
          error: true,
        })
      );
    } else {
      dispatch({ type: AuthTypes.USER_LOGIN, payload: json });
    }
  };
};

export const userSignOut = (): AuthAction => ({
  type: AuthTypes.USER_LOGOUT,
});
