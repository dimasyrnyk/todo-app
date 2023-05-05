import { FC, PropsWithChildren } from "react";
import "./TodoBtn.scss";

type Props = {
  onClick: () => void;
  showButton?: boolean;
};

const TodoBtn: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  showButton = true,
}) => {
  if (showButton) {
    return (
      <button
        className="todo-btn"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return null;
};

export default TodoBtn;
