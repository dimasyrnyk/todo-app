import { FC, useEffect } from "react";

import "./Alert.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { AlertColor } from "@constants/app";
import { appHideAlert } from "@store/app/AppSlice";

const Alert: FC = () => {
  const dispatch = useAppDispatch();
  const { alert } = useAppSelector((state) => state.app);
  const classes = alert?.isError ? AlertColor.RED : AlertColor.GREEN;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (alert) {
      timeoutId = setTimeout(() => {
        dispatch(appHideAlert());
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [alert, dispatch]);

  if (!alert) {
    return null;
  }

  return <div className={"alert__text_" + classes}>{alert.text}</div>;
};

export default Alert;
