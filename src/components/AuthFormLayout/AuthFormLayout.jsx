import { Link } from "react-router-dom";

import AdvantagesSection from "../AdvantagesSection/AdvantagesSection";
import Logo from "../Logo/Logo";

import css from "./AuthFormLayout.module.css";

export const AuthFormLayout = ({
  title,
  children,
  footerText,
  footerLink,
  footerLinkText,
  paddingMd = "16px",
  paddingLg = "32px",
  paddingXl = "40px",
}) => (
  <div className={css["auth-layout-wrap"]}>
    <div
      className={css["auth-layout"]}
      style={{
        "--padding-md": paddingMd,
        "--padding-lg": paddingLg,
        "--padding-xl": paddingXl,
      }}
    >
      <Logo className={css["auth-logo"]} />
      <h1 className={css["auth-title"]}>{title}</h1>
      <div className={css["auth-content"]}>{children}</div>
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
