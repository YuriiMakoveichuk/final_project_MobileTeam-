import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loginSchema } from "../AuthValidation/AuthValidation";
import { EmailInputFormItem } from "../AuthFormItems/EmailInputFormItem/EmailInputFormItem";
import { PasswordInputFormItem } from "../AuthFormItems/PasswordInputFormItem/PasswordInputFormItem";
import { SubmitBtnFormItem } from "../AuthFormItems/SubmitBtnFormItem/SubmitBtnFormItem";
import { apiLogin } from "../../redux/auth/operations.js";
// import { selectAuthError } from "../../redux/auth/selectors.js";

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  // const error = useSelector(selectAuthError);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(`Error: ${error}`);
  //   }
  // }, [error]);

  const onSubmit = async (values) => {
    try {
      await dispatch(apiLogin(values)).unwrap();
      toast.success("Login successful!");
      reset();
    } catch (err) {
      if (err === "User not found") {
        toast.error(
          "No such user found. Please check your credentials or sign up."
        );
      } else if (err === "Invalid credentials") {
        toast.error("Invalid password. Please try again.");
      } else {
        toast.error(`Login failed: ${err}`);
      }
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <EmailInputFormItem
        label="Email"
        name="email"
        id="email"
        register={register}
        errors={errors}
        required={true}
        placeholder="Enter your email"
      />
      <PasswordInputFormItem
        label="Password"
        name="password"
        id="password"
        register={register}
        errors={errors}
        required={true}
        placeholder="Enter your password"
      />
      <SubmitBtnFormItem title={"Sign In"} />
    </form>
  );
};
