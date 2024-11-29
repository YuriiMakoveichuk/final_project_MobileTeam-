import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

import css from "./WelcomeSection.module.css";
import clsx from "clsx";

function WelcomeSection() {
  return (
    <div className={css.background}>
      <Logo />
      <div className={css.contentBox}>
        <p className={css.subtitle}>Record daily water intake and track</p>
        <h1 className={css.title}>Water consumption tracker</h1>
        <div className={css.buttonGroup}>
          <div className={clsx(css.tryTrackerButtonWrapper, css.button)}>
            <Link to="/signup">Try tracker</Link>
          </div>
          <div className={clsx(css.signInButtonWrapper, css.button)}>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomeSection;
