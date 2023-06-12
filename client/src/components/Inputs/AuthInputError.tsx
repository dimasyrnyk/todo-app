import { FC } from "react";
import "./Inputs.scss";

type Props = {
  errorText?: string;
  showError?: boolean;
};

const AuthInputError: FC<Props> = ({ errorText, showError = false }) => {
  if (showError) {
    return (
      <div>
        <p className="auth-input__error">{errorText}</p>
      </div>
    );
  }

  return null;
};

export default AuthInputError;
