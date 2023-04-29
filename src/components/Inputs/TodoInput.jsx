import { useState } from "react";
import "./Input.scss";

const messages = {
  specialSymbolsMsg: `~!?@#$%^&*()_+=[\\]{};':"\\\\|,.<>\\/" are not allowed!`,
  spacesMsg: "You can't start with space!",
};

export default function TodoInput({ inputValue, setInputValue, onKeyDown }) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleError(message) {
    setShowError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  }

  function handleChange(event) {
    const str = event.target.value;
    const regex = /^[^`~!?@#$%^&*()_+=[\]{};':"\\|,.<>/]*$/;

    if (!regex.test(str)) {
      handleError(messages.specialSymbolsMsg);
    } else if (!str.trim() && str) {
      handleError(messages.spacesMsg);
      setInputValue("");
    } else {
      setInputValue(event.target.value);
    }
  }

  function handleKeyDown(event) {
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
          placeholder="Enter your todo..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </form>

      {showError ? <div className="input__error">{errorMessage}</div> : null}
    </span>
  );
}
