import styles from "./AddWaterBtn.module.css";
import sprite from "../../../img/sprite.svg";

export const AddWaterBtn = () => {
  return (
    <button className={styles.btn}>
      <svg className={styles.icon}>
        <use href={`${sprite}#icon-plus-white`} />
      </svg>
      <span className={styles.sign}>Add water</span>
    </button>
  );
};
