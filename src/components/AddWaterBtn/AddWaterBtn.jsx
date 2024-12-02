import styles from "./AddWaterBtn.module.css";
import sprite from "../../img/sprite.svg";

const AddWaterBtn = ({ openModal }) => {
  return (
    <button 
      className={styles.btn}
      onClick={openModal}
      >
      <svg className={styles.icon}>
        <use href={`${sprite}#icon-plus-white`} />
      </svg>
      <span className={styles.sign}>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
