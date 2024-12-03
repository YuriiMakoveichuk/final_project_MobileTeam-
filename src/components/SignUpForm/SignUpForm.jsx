import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../AuthValidation/AuthValidation";
import { EmailInputFormItem } from "../AuthFormItems/EmailInputFormItem/EmailInputFormItem";
import { PasswordInputFormItem } from "../AuthFormItems/PasswordInputFormItem/PasswordInputFormItem";
import { SubmitBtnFormItem } from "../AuthFormItems/SubmitBtnFormItem/SubmitBtnFormItem";
import { useDispatch } from "react-redux";
import { registration } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repeatPassword, ...submissionData } = values; // eslint-disable-line no-unused-vars
    const response = await dispatch(registration(submissionData));
    if (!response.error) {
      toast.success("Registration successful!");
      reset();
    } else if (
      response.payload === "User already exists. Redirecting to login..."
    ) { 
      navigate("/signin");
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
      <PasswordInputFormItem
        label="Repeat Password"
        name="repeatPassword"
        id="repeatPassword"
        register={register}
        errors={errors}
        required={true}
        placeholder="Repeat password"
      />
      <SubmitBtnFormItem title={"Sign Up"} />
    </form>
  );
};
