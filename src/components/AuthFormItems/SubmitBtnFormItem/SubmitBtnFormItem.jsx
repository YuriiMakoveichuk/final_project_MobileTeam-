import css from "./SubmitBtnFormItem.module.css";

export const SubmitBtnFormItem = ({ title }) => (
  <button className={css["auth-button"]} type="submit">
    {title}
  </button>
);
