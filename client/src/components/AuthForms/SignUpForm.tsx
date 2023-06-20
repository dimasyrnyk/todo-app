import { FC } from "react";
import { Form, useFormik, FormikProvider } from "formik";

import "./AuthForm.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { authSignUp } from "@store/auth/ActionCreators";
import { validationSignUp } from "@utils/authValidationSchema";
import { ICreateUser, USER_PICTURE } from "@constants/auth";
import AppLoader from "@components/AppLoader/AppLoader";
import AuthInput from "@components/Inputs/AuthInput";
import AuthInputPassword from "@components/Inputs/AuthInputPassword";

const initialValues: ICreateUser = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

const SignUpForm: FC = () => {
  const onSubmit = () => {
    dispatch(
      authSignUp({
        name: values.name,
        email: values.email.toLowerCase(),
        password: values.password,
        picture: USER_PICTURE,
      })
    );
  };

  const formik = useFormik<ICreateUser>({
    initialValues: initialValues,
    validationSchema: validationSignUp,
    onSubmit: onSubmit,
    validateOnChange: true,
  });
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { values } = formik;
  const isFormValid = formik.dirty && formik.isValid;

  if (isLoading) return <AppLoader />;

  return (
    <FormikProvider value={formik}>
      <Form className="auth-form">
        <AuthInput
          inputName="name"
          placeholder="Name"
        />
        <AuthInput
          inputName="email"
          type="email"
          placeholder="Email"
        />
        <AuthInputPassword
          inputName="password"
          placeholder="Password"
        />
        <AuthInputPassword
          inputName="confirm"
          placeholder="Confirm password"
        />
        <button
          className="auth-form__button button"
          type="submit"
          disabled={!isFormValid}
        >
          Sign up
        </button>
      </Form>
    </FormikProvider>
  );
};

export default SignUpForm;
