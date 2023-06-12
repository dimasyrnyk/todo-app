import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AuthForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { userSignIn } from "@store/auth/actions";
import AppLoader from "@components/AppLoader/AppLoader";
import AuthInput from "@components/Inputs/AuthInput";
import AuthInputPassword from "@components/Inputs/AuthInputPassword";

const SignInForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      userSignIn({
        email: userData.email.toLowerCase(),
        password: userData.password,
      })
    );
  };

  if (isLoading) return <AppLoader />;

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="auth-form">
        <AuthInput
          inputName="email"
          inputValue={userData.email}
          inputPlaceholder={"Email"}
          onChange={handleUserInput}
        />
        <AuthInputPassword
          inputName="password"
          inputValue={userData.password}
          inputPlaceholder={"Password"}
          onChange={handleUserInput}
        />
        <p>
          <button
            className="auth-form__button button"
            type="submit"
          >
            Sign in
          </button>
        </p>
      </fieldset>
    </form>
  );
};

export default SignInForm;
