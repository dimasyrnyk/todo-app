import { FC, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./NavBar.scss";
import { AppDispatch, RootState } from "@store/index";
import { userSignOut } from "@store/auth/actions";
import { ThemeContext } from "@context/ThemeContext";
import ThemeSwitcher from "@components/ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

const NavBar: FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClick = () => {
    if (user) {
      dispatch(userSignOut());
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
