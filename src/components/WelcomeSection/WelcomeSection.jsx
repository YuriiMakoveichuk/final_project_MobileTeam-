import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import css from "./WelcomeSection.module.css";

function WelcomeSection() {
  return (
    <div className={css.background}>
      <Logo />

      <div className={css.contentBox}>
        <div>
          <p className={css.subtitle}>Record daily water intake and track</p>
        </div>
        <div>
          <h1 className={css.title}>Water consumption tracker</h1>
        </div>
        <div className={css.buttonGroup}>
          <div className={css.tryTrackerButtonWrapper}>
            <button className={css.tryTrackerButton}>
              <Link to="/signup">
                <p className={css.buttonText}>Try tracker</p>
              </Link>
            </button>
          </div>

          <div className={css.signInButtonWrapper}>
            <button className={css.signInButton}>
              <Link to="/signin">
                <p className={css.buttonText}>Sign In</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomeSection;
