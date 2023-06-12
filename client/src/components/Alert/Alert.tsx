import { FC } from "react";

import "./Alert.scss";
import { IAlert } from "@store/types/app";
import { AlertColor } from "@constants/app";

const Alert: FC<IAlert> = ({ text, error = false }) => {
  const classes = error ? AlertColor.RED : AlertColor.GREEN;

  return <div className={"alert__text_" + classes}>{text}</div>;
};

export default Alert;
