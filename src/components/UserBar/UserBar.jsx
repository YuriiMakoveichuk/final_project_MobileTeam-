import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import sprite from "../../img/sprite.svg";
import css from "./UserBar.module.css";
// import { toggleUserBarPopoverModal } from "../../redux/modal.js";

const UserBar = ({ showIconArrow, toggleUserBarPopover }) => {
  // const dispatch = useDispatch();

  const user = useSelector(selectUser);

  // const handleClickUserBar = () => {
  //   toggleIconArrow();
  //   dispatch(toggleUserBarPopoverModal());
  // };

  return (
    <button
      className={css.btnUserBar}
      type="button"
      onClick={toggleUserBarPopover}
    >
      <p className={css.nameUserBar}>{user.name}</p>
      <img className={css.photoUser} src={user.photo} alt="user's photo" />
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
