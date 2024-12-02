import * as Yup from "yup";

const emailValidation = Yup.string()
  .email("Invalid email format")
  .test(
    "valid-domain",
    "Email must have a valid domain (e.g. .com, .org)",
    (value) => {
      if (!value) return true;
      return /^[^@]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|info|io)$/.test(value);
    })
  .required("Email is required");

const passwordValidation = Yup.string()
  .min(3, "Password must be at least 3 characters")
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
