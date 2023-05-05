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
        {Object.values(NavBarTabs).map((tabName) => (
          <NavBarTab
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

export default NavBar;
