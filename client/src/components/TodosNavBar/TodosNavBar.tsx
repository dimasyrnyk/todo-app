import { FC, useContext } from "react";

import "./TodosNavBar.scss";
import { ActiveTab } from "@store/types/todos";
import { ThemeContext } from "@context/ThemeContext";
import { NavBarTabs } from "@constants/app";
import TodosNavBarTab from "./TodosNavBarTab";

type Props = {
  activeTab: string;
  showRemoveButton: boolean;
  handleClick: (tabName: ActiveTab) => void;
  handleRemove: () => void;
};

const TodosNavBar: FC<Props> = ({
  activeTab,
  showRemoveButton,
  handleClick,
  handleRemove,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"todos-nav-bar__wrapper " + theme}>
      {showRemoveButton && (
        <button
          className="todos-nav-bar__btn-remove border background text"
          onClick={handleRemove}
        >
          Remove completed todos
        </button>
      )}

      <nav className="todos-nav-bar">
        {Object.values(NavBarTabs).map((tabName) => (
          <TodosNavBarTab
            key={tabName}
            tabName={tabName}
            activeTab={activeTab}
            handleClick={handleClick}
          />
        ))}
      </nav>
    </div>
  );
};

export default TodosNavBar;
