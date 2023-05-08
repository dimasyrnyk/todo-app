import { FC, PropsWithChildren, useContext } from "react";

import "./TodoBtn.scss";
import { ThemeContext } from "../../../context/ThemeContext";

type Props = {
  onClick: () => void;
  showButton?: boolean;
};

const TodoBtn: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  showButton = true,
}) => {
  const { theme } = useContext(ThemeContext);

  if (showButton) {
    return (
      <button
        className={"todo-btn todo-" + theme}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return null;
};

export default TodoBtn;
