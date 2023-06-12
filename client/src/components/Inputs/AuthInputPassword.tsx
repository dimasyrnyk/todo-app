import { FC, useState } from "react";

import "./Inputs.scss";
import AuthInputError from "./AuthInputError";
import HidePasswordIcon from "@components/Icons/HidePasswordIcon";
import ShowPasswordIcon from "@components/Icons/ShowPasswordIcon";
import LockIcon from "@components/Icons/LockIcon";

type Props = {
  inputName: string;
  inputValue: string;
  inputPlaceholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showError?: boolean;
  errorText?: string;
};

const AuthInputPassword: FC<Props> = ({
  inputName,
  inputValue,
  inputPlaceholder,
  onChange,
  showError,
  errorText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const hadleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-input__wrapper">
      <span className="auth-input__icon">
        <LockIcon />
      </span>
      <span className="auth-input">
        <input
          className="auth-input__body"
          type={showPassword ? "text" : "password"}
          value={inputValue}
          onChange={onChange}
          name={inputName}
          placeholder={inputPlaceholder}
        />
        {showPassword ? (
          <HidePasswordIcon onClick={hadleShowPassword} />
        ) : (
          <ShowPasswordIcon onClick={hadleShowPassword} />
        )}
      </span>
      <AuthInputError
        errorText={errorText}
        showError={showError}
      />
    </div>
  );
};

export default AuthInputPassword;
