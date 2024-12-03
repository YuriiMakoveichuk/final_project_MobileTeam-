import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import sprite from "../../img/sprite.svg";
import css from "./UserBar.module.css";

const UserBar = ({ showIconArrow, toggleUserBarPopover }) => {
  const user = useSelector(selectUser);

  const newUser = user.data.user || user.data;

  return (
    <button
      className={css.btnUserBar}
      type="button"
      onClick={toggleUserBarPopover}
    >
      <p className={css.nameUserBar}>{newUser.name}</p>
      <img className={css.photoUser} src={newUser.photo} alt="user's photo" />
      {showIconArrow && (
        <svg className={css.iconArrowDown}>
          <use href={`${sprite}#icon-chevron-down`}></use>
        </svg>
      )}
      {!showIconArrow && (
        <svg className={css.iconArrowUp}>
          <use href={`${sprite}#icon-chevron-up`}></use>
        </svg>
      )}
    </button>
  );
};

export default UserBar;
