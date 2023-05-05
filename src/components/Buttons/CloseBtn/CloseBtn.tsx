import { FC } from "react";
import { ImCross } from "react-icons/im";

import "./CloseBtn.scss";

type Props = {
  onClick: () => void;
};

const CloseBtn: FC<Props> = ({ onClick }) => {
  return (
    <button
      className="close-btn"
      onClick={onClick}
    >
      <ImCross />
    </button>
  );
};

export default CloseBtn;
