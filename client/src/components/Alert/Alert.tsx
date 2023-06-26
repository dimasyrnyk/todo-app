import { FC, useEffect } from "react";

import "./Alert.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { AlertColor } from "@constants/app";
import { appHideAlert } from "@store/app/AppSlice";
import CloseBtn from "@components/Buttons/CloseBtn/CloseBtn";

const Alert: FC = () => {
  const dispatch = useAppDispatch();
  const { alert } = useAppSelector((state) => state.app);
  const classes = alert?.isError ? AlertColor.RED : AlertColor.GREEN;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (alert) {
      timeoutId = setTimeout(() => {
        hadleCloseAlert();
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [alert, dispatch]);

  const hadleCloseAlert = () => {
    dispatch(appHideAlert());
  };

  if (!alert) {
    return null;
  }

  return (
    <div className={"alert alert__" + classes}>
      <div className="alert__body">
        <p className="alert__message">{alert.text}</p>
        <button
          className={"alert__btn alert__btn_" + classes}
          onClick={hadleCloseAlert}
        >
          skip
        </button>
      </div>
    </div>
  );
};

export default Alert;
