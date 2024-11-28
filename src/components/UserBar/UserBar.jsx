import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import sprite from "../../img/sprite.svg";
import css from "./UserBar.module.css";

const UserBar = ({ clickUserBar, iconArrowUp, iconArrowDown }) => {
  const user = useSelector(selectUser);

  return (
    <button className={css.btnUserBar} type="button" onClick={clickUserBar}>
      <p className={css.nameUserBar}>{user.name}</p>
      <img className={css.photoUser} src={user.photo} alt="user's photo" />
      {iconArrowDown && (
        <svg className={css.iconArrowDown}>
          <use href={`${sprite}#icon-chevron-down`}></use>
        </svg>
      )}
      {iconArrowUp && (
        <svg className={css.iconArrowUp}>
          <use href={`${sprite}#icon-chevron-up`}></use>
        </svg>
      )}
    </button>
  );
};

export default UserBar;
