import { useEffect } from "react";

import sprite from "../../img/sprite.svg";
import css from "./UserBarPopover.module.css";

const UserBarPopover = ({
  closeUserBarPopover,
  openUserSettingsModal,
  openLogOutModal,
}) => {
  const handleClickSetting = () => {
    closeUserBarPopover();
    openUserSettingsModal();
  };

  const handleClickLogOut = () => {
    closeUserBarPopover();
    openLogOutModal();
  };
  useEffect(() => {
    const handleClickDown = (event) => {
      if (event.code === "Escape") {
        closeUserBarPopover();
      }
    };

    const handleClickBackDrop = (event) => {
      const classList = [css.wrapperUserBarPopover, css.btnUserBarPopover];
      const isClassInClassList = classList.includes(event.target.className);

      if (!isClassInClassList) {
        closeUserBarPopover();
      }
    };

    window.addEventListener("keydown", handleClickDown);

    window.addEventListener("mousedown", handleClickBackDrop);

    return () => {
      window.removeEventListener("keydown", handleClickDown);
      window.removeEventListener("mousedown", handleClickBackDrop);
    };
  }, [closeUserBarPopover]);

  return (
    <div className={css.wrapperUserBarPopover}>
      <button
        className={css.btnUserBarPopover}
        type="button"
        onClick={handleClickSetting}
      >
        <svg className={css.iconSetting} width="16" height="16">
          <use href={`${sprite}#icon-settings`}></use>
        </svg>
        Setting
      </button>

      <button
        className={css.btnUserBarPopover}
        type="button"
        onClick={handleClickLogOut}
      >
        <svg className={css.iconLogOut} width="16" height="16">
          <use href={`${sprite}#icon-log-out`}></use>
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserBarPopover;
