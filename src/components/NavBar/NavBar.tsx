import { FC, useContext } from "react";

import "./NavBar.scss";
import NavBarTab from "./NawBarTab";
import { ThemeContext } from "@context/ThemeContext";
import { NavBarTabs } from "@constants/app";

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
  const { theme } = useContext(ThemeContext);

  return (
    <div className={"nav-bar__wrapper " + theme}>
      {showRemoveButton && (
        <button
          className="nav-bar__btn-remove border background text"
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
