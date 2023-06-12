import React, { FC } from "react";

import "./Inputs.scss";
import AuthInputError from "./AuthInputError";
import EmailIcon from "@components/Icons/EmailIcon";
import UserIcon from "@components/Icons/UserIcon";

type Props = {
  inputName: string;
  inputValue: string;
  inputPlaceholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showError?: boolean;
  errorText?: string;
};

const AuthInput: FC<Props> = ({
  inputName,
  inputValue,
  inputPlaceholder,
  onChange,
  showError,
  errorText,
}) => {
  const inputIcon = inputName === "name" ? <UserIcon /> : <EmailIcon />;

  return (
    <div className="auth-input__wrapper">
      <span className="auth-input__icon">{inputIcon}</span>
      <span className="auth-input">
        <input
          className="auth-input__body"
          type="text"
          value={inputValue}
          onChange={onChange}
          name={inputName}
          placeholder={inputPlaceholder}
        />
      </span>
      <AuthInputError
        errorText={errorText}
        showError={showError}
      />
    </div>
  );
};

export default AuthInput;
