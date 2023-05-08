import React, { FC, useContext } from "react";

import "./ThemeSwitcher.scss";
import { ThemeContext } from "../../context/ThemeContext";
import { Themes } from "../../types/app";

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDarkmode = theme === Themes.Dark;

  function toggleTheme(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const anotherTheme = isChecked ? Themes.Dark : Themes.Light;

    if (setTheme) {
      setTheme(anotherTheme);
    }
  }

  return (
    <div className="switcher__container">
      <span className="switcher__title">
        Dark mode {isDarkmode ? "On" : "Off"}
      </span>
      <label className="switcher">
        <input
          type="checkbox"
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
