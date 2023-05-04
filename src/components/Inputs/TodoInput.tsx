import { FC, PropsWithChildren, useState } from "react";

import "./Input.scss";
import { InputMessage } from "../../types/app";

type Props = {
  placeholder: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onKeyDown: () => void;
};

const TodoInput: FC<PropsWithChildren<Props>> = ({
  children,
  placeholder,
  inputValue,
  setInputValue,
  onKeyDown,
}) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleError(message: string) {
    setShowError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const str = event.target.value;
    const regex = /^[^`~!?@#$%^&*()_+=[\]{};':"\\|<>/]*$/;

    if (!regex.test(str)) {
      handleError(InputMessage.specialSymbolsMsg);
    } else if (!str.trim() && str) {
      handleError(InputMessage.spacesMsg);
      setInputValue("");
    } else {
      setInputValue(str);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (inputValue) {
        onKeyDown();
      }
    }
  }

  return (
    <span className="input">
      <form className="input__wrapper">
        <input
          className="input__body"
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {children}
      </form>

      {showError ? <div className="input__error">{errorMessage}</div> : null}
    </span>
  );
};

export default TodoInput;
