import { FC, PropsWithChildren, useContext } from "react";

import "./PrimaryBtn.scss";
import { ThemeContext } from "@context/ThemeContext";

type Props = {
  onClick: () => void;
  title?: string;
  className?: string;
  disabled?: boolean;
};

const AppBtn: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  title,
  className,
  disabled,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={className + " app-btn app-" + theme}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {title}
    </button>
  );
};

export default AppBtn;
