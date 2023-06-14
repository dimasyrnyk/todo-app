import { FC, useState } from "react";
import { ErrorMessage, Field } from "formik";

import "./Inputs.scss";
import LockIcon from "@components/Icons/LockIcon";
import HidePasswordIcon from "@components/Icons/HidePasswordIcon";
import ShowPasswordIcon from "@components/Icons/ShowPasswordIcon";

type Props = {
  inputName: string;
  placeholder: string;
};

const AuthInputPassword: FC<Props> = ({ inputName, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const hadleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-input__wrapper">
      <label
        className="auth-input__icon"
        htmlFor={inputName}
      >
        <LockIcon />
      </label>
      <div className="auth-input">
        <Field
          className="auth-input__body"
          type={showPassword ? "text" : "password"}
          id={inputName}
          name={inputName}
          placeholder={placeholder}
          autoComplete="off"
        />
        {showPassword ? (
          <HidePasswordIcon onClick={hadleShowPassword} />
        ) : (
          <ShowPasswordIcon onClick={hadleShowPassword} />
        )}
      </div>
      <ErrorMessage
        className="auth-input__error"
        name={inputName}
        component="div"
      />
    </div>
  );
};

export default AuthInputPassword;
