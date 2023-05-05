import { FC } from "react";

import "./NavBar.scss";

type Props = {
  activeTab: string;
  tabName: string;
  handleClick: (tabName: string) => void;
};

const NavBarTab: FC<Props> = ({ activeTab, tabName, handleClick }) => {
  const classes = "nav-bar__tab" + (activeTab === tabName ? " active" : "");

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