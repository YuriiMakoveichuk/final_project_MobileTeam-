import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../AuthValidation/AuthValidation";
import { EmailInputFormItem } from "../AuthFormItems/EmailInputFormItem/EmailInputFormItem";
import { PasswordInputFormItem } from "../AuthFormItems/PasswordInputFormItem/PasswordInputFormItem";
import { SubmitBtnFormItem } from "../AuthFormItems/SubmitBtnFormItem/SubmitBtnFormItem";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="Repeat your password"
      />
      <SubmitBtnFormItem title={"Sign Up"} />
    </form>
  );
};
