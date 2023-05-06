import { FC, useContext } from "react";
import { ImCross } from "react-icons/im";

import "./CloseBtn.scss";
import { ThemeContext } from "../../../context/ThemeContext";

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
      <ImCross />
    </button>
  );
};

export default CloseBtn;
