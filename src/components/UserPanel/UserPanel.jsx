import { useState } from "react";
import UserBar from "../UserBar/UserBar.jsx";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";

import css from "./UserPanel.module.css";

const UserPanel = () => {
  const userName = "Nadia";

  const [isOpenUserBarPopover, setIsOpenUserBarPopover] = useState(false);
  const [showIconArrowUp, setShowIconArrowUp] = useState(false);
  const [showIconArrowDown, setShowIconArrowDown] = useState(true);

  const handleClickUserBar = () => {
    setIsOpenUserBarPopover((prevState) => !prevState);
    setShowIconArrowUp((prevState) => !prevState);
    setShowIconArrowDown((prevState) => !prevState);
  };

  const closeUserBarPopover = () => {
    setIsOpenUserBarPopover(false);
    setShowIconArrowUp(false);
    setShowIconArrowDown(true);
  };

  return (
    <div className={css.wrapperUserPanel}>
      <p className={css.titleUserPanel}>
        Hello<span className={css.nameAcceptWeight}>, {userName}!</span>
      </p>
      <div className={css.wrapperUserBar}>
        <UserBar
          clickUserBar={handleClickUserBar}
          iconArrowUp={showIconArrowUp}
          iconArrowDown={showIconArrowDown}
          userName={userName}
        />
        {isOpenUserBarPopover && (
          <UserBarPopover closeUserBarPopover={closeUserBarPopover} />
        )}
      </div>
    </div>
  );
};

export default UserPanel;
