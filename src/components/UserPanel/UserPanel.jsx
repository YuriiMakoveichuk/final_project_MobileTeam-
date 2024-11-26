import UserBar from "../UserBar/UserBar.jsx";

import css from "./UserPanel.module.css";

const UserPanel = () => {
  const userName = "Nadia";

  return (
    <div className={css.wrapperUserPanel}>
      <p className={css.titleUserPanel}>
        Hello<span className={css.nameAcceptWeight}>, {userName}!</span>
      </p>
      <UserBar userName={userName} />
    </div>
  );
};

export default UserPanel;
