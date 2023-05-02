import { FC } from "react";

import "./NavBar.scss";

type Props = {
  activeTab: string;
  tabName: string;
  handleClick: (tabName: string) => void;
};

const NavBarTab: FC<Props> = ({ activeTab, tabName, handleClick }) => {
  function handleTabClick() {
    handleClick(tabName);
  }

  return (
    <span
      className={"nav-bar__tab" + (activeTab === tabName ? " active" : "")}
      onClick={handleTabClick}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </span>
  );
};

export default NavBarTab;
