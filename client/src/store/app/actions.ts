import { AppActionTypes, IAlert } from "@store/types/app";
import { AppDispatch } from "..";

export const showLoader = () => ({
  type: AppActionTypes.APP_START_LOADING,
});

export const hideLoader = () => ({
  type: AppActionTypes.APP_END_LOADING,
});

export const showAlert = (data: IAlert) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: AppActionTypes.APP_SHOW_ALERT,
      payload: data,
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
};

export const hideAlert = () => ({
  type: AppActionTypes.APP_HIDE_ALERT,
});
