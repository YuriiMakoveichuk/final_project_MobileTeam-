import styles from './AddWaterBtn.module.css';

export const AddWaterBtn = () => {
  return (
    <button className={styles.btn}>
      <svg className={styles.icon}>
        <use href={'/src/img/sprite.svg#icon-plus'}></use>
      </svg>
      <span className={styles.sign}>Add water</span>
    </button>
  );
 }
 