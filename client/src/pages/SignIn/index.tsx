import { FC } from "react";
import { Link } from "react-router-dom";

import "./SignIn.scss";
import SignInForm from "@components/AuthForms/SignInForm";

const SignIn: FC = () => {
  return (
    <div className="signin__container">
      <h2>Sign in to your account</h2>
      <SignInForm />
      <p className="signin__nav">
        <span>Don't have an account?</span>
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
