import { FC } from "react";
import { Link } from "react-router-dom";

import "../SignIn/SignIn.scss";
import SignUpForm from "@components/AuthForms/SignUpForm";
import { AppRoutes } from "@constants/app";

const SignUp: FC = () => {
  return (
    <div className="signin__container">
      <h2>Create your account</h2>
      <SignUpForm />
      <p className="signin__nav">
        <span>Already have an account?</span>
        <Link to={AppRoutes.SIGN_IN}>Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
