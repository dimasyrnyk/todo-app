import { FC } from "react";

import "./NavBar.scss";
import NavBarTab from "./NawBarTab";
import { NavBarTabs } from "../../types/app";

type Props = {
  activeTab: string;
  showRemoveButton: boolean;
  handleClick: (tabName: string) => void;
  handleRemove: () => void;
};

const NavBar: FC<Props> = ({
  activeTab,
  showRemoveButton,
  handleClick,
  handleRemove,
}) => {
  return (
    <div className="nav-bar__wrapper">
      {showRemoveButton && (
        <button
          className="nav-bar__btn-remove"
          onClick={handleRemove}
        >
          Remove completed todos
        </button>
      )}

      <nav className="nav-bar">
        <NavBarTab
          activeTab={activeTab}
          tabName={NavBarTabs.All}
          handleClick={handleClick}
        />
        <NavBarTab
          activeTab={activeTab}
          tabName={NavBarTabs.Active}
          handleClick={handleClick}
        />
        <NavBarTab
          activeTab={activeTab}
          tabName={NavBarTabs.Completed}
          handleClick={handleClick}
        />
      </nav>
    </div>
  );
};

export default NavBar;
