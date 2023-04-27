import { useState } from "react";
import "./Input.css";

export default function TodoInput({ inputValue, setInputValue, onKeyDown }) {
  const [showError, setShowError] = useState(false);

  function handleChange(event) {
    const regex = /^[^`~!?@#$%^&*()_+=[\]{};':"\\|,.<>/?]*$/;

    if (regex.test(event.target.value)) {
      setInputValue(event.target.value);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13 && inputValue !== "") {
      event.preventDefault();
      onKeyDown();
    }
  }

  return (
    <span className="input__container">
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

      {showError ? (
        <div className="input__error">Special symbols are not allowed!</div>
      ) : null}
    </span>
  );
}
