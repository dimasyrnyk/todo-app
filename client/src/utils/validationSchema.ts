import * as Yup from "yup";

const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validationSignIn = Yup.object({
  email: Yup.string()
    .email("Email is not valid")
    .matches(emailRegExp, "Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(10, "Must be from 10 to 20 characters")
    .max(20, "Too long"),
});
