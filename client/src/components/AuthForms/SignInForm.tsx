import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useFormik, FormikProvider } from "formik";

import "./AuthForm.scss";
import { AppDispatch, RootState } from "@store/index";
import { authSignIn } from "@store/auth/ActionCreators";
import { ILoginUserDto } from "@store/types/auth";
import { validationSignIn } from "@utils/validationSchema";
import AppLoader from "@components/AppLoader/AppLoader";
import AuthInput from "@components/Inputs/AuthInput";
import AuthInputPassword from "@components/Inputs/AuthInputPassword";
import { useAppDispatch } from "src/hooks/redux";

const initialValues: ILoginUserDto = {
  email: "",
  password: "",
};

const SignInForm: FC = () => {
  const onSubmit = () => {
    dispatch(
      authSignIn({
        email: values.email.toLowerCase(),
        password: values.password,
      })
    );
  };

  const formik = useFormik<ILoginUserDto>({
    initialValues: initialValues,
    validationSchema: validationSignIn,
    onSubmit: onSubmit,
    validateOnChange: true,
  });
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const { values } = formik;
  const isFormValid = formik.dirty && formik.isValid;

  if (isLoading) return <AppLoader />;

  return (
    <FormikProvider value={formik}>
      <Form className="auth-form">
        <AuthInput
          inputName="email"
          type="email"
          placeholder="Email"
        />
        <AuthInputPassword
          inputName="password"
          placeholder="Password"
        />
        <button
          className="auth-form__button button"
          type="submit"
          disabled={!isFormValid}
        >
          Sign in
        </button>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
