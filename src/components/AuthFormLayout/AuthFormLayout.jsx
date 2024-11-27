import { Link } from "react-router-dom";
import css from "./AuthFormLayout.module.css";
import AdvantagesSection from "../AdvantagesSection/AdvantagesSection";
import Logo from "../Logo/Logo";

export const AuthFormLayout = ({
  title,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) => (
  <div className={css["auth-layout-wrap"]}>
    <div className={css["auth-layout"]}>
      <Logo className={css["auth-logo"]} />
      <h1 className={css["auth-title"]}>{title}</h1>
      <div className="auth-content">{children}</div>
      <p className={css["auth-footer"]}>
        {footerText}
        <Link to={footerLink} className={css["auth-link"]}>
          {footerLinkText}
        </Link>
      </p>
    </div>
    <div className={css["auth-layout-picture"]}>
      <AdvantagesSection />
    </div>
  </div>
);
