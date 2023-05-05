import { FC, PropsWithChildren } from "react";

import "./AppBtn.scss";

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
  return (
    <button
      className={className + " app-btn"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {title}
    </button>
  );
};

export default AppBtn;
