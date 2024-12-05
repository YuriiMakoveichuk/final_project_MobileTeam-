import styles from "./AddWaterBtn.module.css";
import sprite from "../../img/sprite.svg";
import { openModal } from "../../redux/modal.js";
import { useDispatch } from "react-redux";

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  const openUpdateModal = () => {
    dispatch(openModal("edit"));
  };
  return (
    <button className={styles.btn} onClick={openUpdateModal}>
      <svg className={styles.icon}>
        <use href={`${sprite}#icon-plus-white`} />
      </svg>
      <span className={styles.sign}>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
