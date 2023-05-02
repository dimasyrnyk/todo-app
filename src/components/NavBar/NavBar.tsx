import { FC } from "react";

import "./NavBar.scss";
import NavBarTab from "./NawBarTab";

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
          Remove completed todo
        </button>
      )}

      <nav className="nav-bar">
        <NavBarTab
          activeTab={activeTab}
          tabName="all"
          handleClick={handleClick}
        />
        <NavBarTab
          activeTab={activeTab}
          tabName="active"
          handleClick={handleClick}
        />
        <NavBarTab
          activeTab={activeTab}
          tabName="completed"
          handleClick={handleClick}
        />
      </nav>
    </div>
  );
};

export default NavBar;
