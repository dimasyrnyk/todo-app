import { AuthState, AuthActionTypes, AuthAction } from "../types/auth";

const initialState: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
};

export default function productsReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.USER_START_LOADING:
      return { ...state, isLoading: true };
    case AuthActionTypes.USER_END_LOADING:
      return { ...state, isLoading: false };
    case AuthActionTypes.USER_LOGIN:
      return {
        ...state,
        isAuth: true,
        ...action.payload,
      };
    case AuthActionTypes.USER_LOGOUT:
      return { ...initialState };
    case AuthActionTypes.USER_REFRESH_TOKEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
