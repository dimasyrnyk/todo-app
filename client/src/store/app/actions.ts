import { AppActionTypes, IAlert } from "@store/types/app";
import { AppDispatch } from "..";

let timerId: NodeJS.Timeout | null = null;

export const showLoader = () => ({
  type: AppActionTypes.APP_START_LOADING,
});

export const hideLoader = () => ({
  type: AppActionTypes.APP_END_LOADING,
});

export const showAlertWithTimeout = (data: IAlert) => {
  return (dispatch: AppDispatch) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    dispatch({
      type: AppActionTypes.APP_SHOW_ALERT,
      payload: data,
    });

    timerId = setTimeout(() => {
      dispatch(hideAlert());
      timerId = null;
    }, 3000);
  };
};

export const hideAlert = () => ({
  type: AppActionTypes.APP_HIDE_ALERT,
});
