import css from "./EmailInputFormItem.module.css";

export const EmailInputFormItem = ({ register, errors, required }) => (
  <fieldset className={css["email-item"]}>
    <label htmlFor="email" className={css["email-label"]}>
      Email
    </label>
    <input
      className={css["email-input"]}
      type="email"
      id="email"
      name="email"
      placeholder="Enter your email"
      {...register("email", { required })}
    />
    {errors.email && (
      <p className={css["email-error"]}>{errors.email.message}</p>
    )}
  </fieldset>
);
