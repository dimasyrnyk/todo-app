import { FC } from "react";
import { ErrorMessage, Field } from "formik";

import "./Inputs.scss";
import EmailIcon from "@components/Icons/EmailIcon";
import UserIcon from "@components/Icons/UserIcon";

type Props = {
  inputName: string;
  placeholder: string;
  type?: string;
};

const AuthInput: FC<Props> = ({ inputName, placeholder, type = "text" }) => {
  const inputIcon = inputName === "name" ? <UserIcon /> : <EmailIcon />;

  return (
    <div className="auth-input__wrapper">
      <label
        className="auth-input__icon"
        htmlFor={inputName}
      >
        {inputIcon}
      </label>
      <div className="auth-input">
        <Field
          className="auth-input__body"
          type={type}
          id={inputName}
          name={inputName}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      <ErrorMessage
        className="auth-input__error"
        name={inputName}
        component="div"
      />
    </div>
  );
};

export default AuthInput;
