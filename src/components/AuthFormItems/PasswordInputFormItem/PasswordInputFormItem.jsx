import { useState } from "react";
import css from "./PasswordInputFormItem.module.css";
import sprite from "../../../img/sprite.svg";
import clsx from "clsx";

export const PasswordInputFormItem = ({
  label,
  register,
  required,
  placeholder,
  name,
  errors,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const inputClass = clsx(css["password-input"], {
    [css["password-input-error"]]: errors?.[name],
  });

  return (
    <fieldset className={css["password-item"]}>
      <label htmlFor={name} className={css["password-label"]}>
        {label}
      </label>
      <div className={css["password-input-container"]}>
        <input
          className={inputClass}
          type={isPasswordVisible ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          {...register(name, { required })}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={css["password-toggle-btn"]}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? (
            <svg width={24} height={24}>
              <use href={`${sprite}#icon-eye`}></use>
            </svg>
          ) : (
            <svg width={20} height={20}>
              <use href={`${sprite}#icon-eye-off`}></use>
            </svg>
          )}
        </button>
      </div>
      {errors[name] && (
        <p className={css["password-error"]}>{errors[name].message}</p>
      )}
    </fieldset>
  );
};
