import css from "./UserBarPopover.module.css";
import sprite from "../../img/sprite.svg";
import { useEffect } from "react";

const UserBarPopover = ({ closeUserBarPopover }) => {
  useEffect(() => {
    const handleClickDown = (event) => {
      if (event.code === "Escape") {
        closeUserBarPopover();
      }
    };

    const handleClickBackDrop = (event) => {
      if (event.target.className !== css.wrapperUserBarPopover) {
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
      <button className={css.btnUserBarPopover} type="button">
        <svg className={css.iconSetting} width="16" height="16">
          <use href={`${sprite}#icon-settings`}></use>
        </svg>
        Setting
      </button>

      <button className={css.btnUserBarPopover} type="button">
        <svg className={css.iconLogOut} width="16" height="16">
          <use href={`${sprite}#icon-log-out`}></use>
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserBarPopover;
