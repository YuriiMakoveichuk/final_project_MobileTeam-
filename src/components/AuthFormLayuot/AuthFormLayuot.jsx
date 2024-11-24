import { Link } from "react-router-dom";
import css from "./AuthFormLayout.module.css";

export const AuthFormLayout = ({
  title,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) => (
  <div className={css["auth-layout"]}>
    <h1 className={css["auth-title"]}>{title}</h1>
    {/* <div className="auth-content"> */}
        {children}
    {/* </div> */}
    <p className={css["auth-footer"]}>
      {footerText}
      <Link to={footerLink} className={css["auth-link"]}>
        {footerLinkText}
      </Link>
    </p>
  </div>
);
