import { FC, PropsWithChildren } from "react";
import "./TodoBtn.scss";

type Props = {
  onClick: () => void;
};

const TodoBtn: FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <button
      className="todo-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TodoBtn;
