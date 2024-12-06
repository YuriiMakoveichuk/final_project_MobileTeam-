import clsx from "clsx";

import css from "./EmailInputFormItem.module.css";

export const EmailInputFormItem = ({ name, register, errors, required }) => {
  const inputClass = clsx(css["email-input"], {
    [css["email-input-error"]]: errors?.[name],
  });

  return (
    <fieldset className={css["email-item"]}>
      <label htmlFor="email" className={css["email-label"]}>
        Email
      </label>
      <input
        className={inputClass}
        type="email"
        id={name}
        name={name}
        placeholder="Enter your email"
        {...register(name, { required })}
      />
      {errors.email && (
        <p className={css["email-error"]}>{errors[name]?.message}</p>
      )}
    </fieldset>
  );
};
