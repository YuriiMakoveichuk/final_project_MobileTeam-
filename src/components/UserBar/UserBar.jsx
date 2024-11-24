import css from "./UserBar.module.css";

const UserBar = ({ userName }) => {
  return (
    <button className={css.btnUserBar} type="button">
      <p className={css.nameUserBar}>{userName}</p>
      <img
        className={css.photoUser}
        src="https://imgcdn.stablediffusionweb.com/2024/3/31/a07c234b-ab97-4ad4-96b1-e1e88ec45e45.jpg"
        alt="user's photo"
      />
    </button>
  );
};

export default UserBar;
