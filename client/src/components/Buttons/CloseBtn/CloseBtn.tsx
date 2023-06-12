import { FC, useContext } from "react";

import "./CloseBtn.scss";
import { ThemeContext } from "@context/ThemeContext";
import CrossIcon from "@components/Icons/CrossIcon";

type Props = {
  onClick: () => void;
};

const CloseBtn: FC<Props> = ({ onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={"close-btn close-" + theme}
      onClick={onClick}
    >
      <CrossIcon />
    </button>
  );
};

export default CloseBtn;
