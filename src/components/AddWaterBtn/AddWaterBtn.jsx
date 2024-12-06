import { useDispatch } from "react-redux";

import sprite from "../../img/sprite.svg";
import { openModal } from "../../redux/modal.js";

import styles from "./AddWaterBtn.module.css";
import { setEditingRecord } from "../../redux/water/dailyInfoSlice.js";

const AddWaterBtn = () => {
  const dispatch = useDispatch();

  const openUpdateModal = () => {
    const now = new Date();

    const defaultTime = now.toISOString().split(".")[0];
    dispatch(openModal("edit"));
    dispatch(
      setEditingRecord({
        id: null,
        amount: 250,
        time: defaultTime,
      })
    );
  };

  return (
    <button type="button" className={styles.btn} onClick={openUpdateModal}>
      <svg className={styles.icon}>
        <use href={`${sprite}#icon-plus-white`} />
      </svg>
      <span className={styles.sign}>Add water</span>
    </button>
  );
};

export default AddWaterBtn;
