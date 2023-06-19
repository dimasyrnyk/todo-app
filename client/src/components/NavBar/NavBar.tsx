import { FC, useContext } from "react";

import "./NavBar.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { authSignOut } from "@store/auth/AuthSlice";
import { ThemeContext } from "@context/ThemeContext";
import ThemeSwitcher from "@components/ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

const NavBar: FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    if (user) {
      dispatch(authSignOut());
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="nav-bar__container">
      <ThemeSwitcher />
      <button
        className={"nav-bar__signin-btn signin-btn-" + theme}
        onClick={handleClick}
      >
        {user ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default NavBar;
