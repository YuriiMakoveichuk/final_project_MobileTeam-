import css from "./UserBarPopover.module.css";

const UserBarPopover = () => {
  return (
    <div className={css.wrapperUserBarPopover}>
      <button className={css.btnUserBarPopover} type="button">
        <svg className={css.iconSetting} width="16" height="16">
          {/* <use href=""></use> */}
        </svg>
        Setting
      </button>

      <button
        className={css.btnUserBarPopover}
        type="button"
        // onClick={handleClickLogOut}
      >
        <svg className={css.iconLogOut} width="16" height="16">
          {/* <use href=""></use> */}
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserBarPopover;
