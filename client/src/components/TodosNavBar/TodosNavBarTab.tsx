import { FC } from "react";

import "./TodosNavBar.scss";
import { ActiveTab } from "@store/types/todos";

type Props = {
  activeTab: string;
  tabName: ActiveTab;
  handleClick: (tabName: ActiveTab) => void;
};

const NavBarTab: FC<Props> = ({ activeTab, tabName, handleClick }) => {
  const classes =
    "todos-nav-bar__tab" + (activeTab === tabName ? " active" : "");

  function handleTabClick() {
    handleClick(tabName);
  }

  return (
    <span
      className={classes}
      onClick={handleTabClick}
    >
      {tabName}
    </span>
  );
};

export default NavBarTab;
