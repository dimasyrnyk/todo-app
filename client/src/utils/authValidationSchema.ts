import * as Yup from "yup";

const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const nameRegExp = /[^`~!?@#$%^&*()_+=[\]{};':"\\|<>\/]+$/;

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

export const validationSignUp = Yup.object({
  name: Yup.string()
    .matches(nameRegExp, "No special symbbols")
    .required("Name is required")
    .min(4, "Must be from 4 to 20 characters")
    .max(20, "Too long"),
  email: Yup.string()
    .email("Email is not valid")
    .matches(emailRegExp, "Email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(10, "Must be from 10 to 20 characters")
    .max(20, "Too long"),
  confirm: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
