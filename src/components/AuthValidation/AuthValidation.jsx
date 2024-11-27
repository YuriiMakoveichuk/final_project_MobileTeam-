import * as Yup from "yup";

const emailValidation = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

const passwordValidation = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

export const loginSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const registrationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});
