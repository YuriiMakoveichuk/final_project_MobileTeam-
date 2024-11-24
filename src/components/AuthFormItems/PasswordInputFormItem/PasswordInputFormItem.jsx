import css from "./PasswordInputFormItem.module.css";

export const PasswordInputFormItem = ({
  label,
  register,
  required,
  placeholder,
  name,
  errors,
}) => (
  <fieldset className={css["password-item"]}>
    <label htmlFor={name} className={css["password-label"]}>
      {label}
    </label>
    <input
      className={css["password-input"]}
      type="password"
      id={name}
      name={name}
      placeholder={placeholder}
      {...register(name, { required })}
    />
    {errors[name] && (
      <p className={css["password-error"]}>{errors[name].message}</p>
    )}
  </fieldset>
);
