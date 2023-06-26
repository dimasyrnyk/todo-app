import { FC } from "react";
import { Link } from "react-router-dom";

import "./SignIn.scss";
import SignInForm from "@components/AuthForms/SignInForm";
import { AppRoutes } from "@constants/app";

const SignIn: FC = () => {
  return (
    <div className="signin__container">
      <h2>Sign in to your account</h2>
      <SignInForm />
      <p className="signin__nav">
        <span>Don't have an account?</span>
        <Link to={AppRoutes.SIGN_UP}>Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
