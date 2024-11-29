import { useEffect } from "react";

import sprite from "../../img/sprite.svg";
import css from "./UserBarPopover.module.css";

const UserBarPopover = ({ closeUserBarPopover, openModal, userBarRef }) => {
  const handleClickSetting = () => {
    closeUserBarPopover();
    openModal("userSettings");
  };

  const handleClickLogOut = () => {
    closeUserBarPopover();
    openModal("logOut");
  };
  useEffect(() => {
    const handleClickDown = (event) => {
      if (event.code === "Escape") {
        closeUserBarPopover();
      }
    };

    const handleClickBackDrop = (event) => {
      if (userBarRef.current && !userBarRef.current.contains(event.target)) {
        closeUserBarPopover();
      }
    };

    window.addEventListener("keydown", handleClickDown);

    window.addEventListener("mousedown", handleClickBackDrop);

    return () => {
      window.removeEventListener("keydown", handleClickDown);
      window.removeEventListener("mousedown", handleClickBackDrop);
    };
  }, [closeUserBarPopover, userBarRef]);

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
