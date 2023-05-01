import "./TodoBtn.scss";

const TodoBtn = ({ children, onClick }) => {
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
