import { AuthState, AuthTypes, AuthAction } from "../types/auth";

const initialState: AuthState = {
  isAuth: false,
  token: null,
  user: null,
  isLoading: false,
};

export default function productsReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthTypes.USER_LOGIN:
      return {
        ...state,
        isAuth: true,
        token: action.payload.accessToken,
        user: action.payload.user,
      };
    case AuthTypes.USER_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
