import styles from './WaterDailyNorma.module.css';

const WaterDailyNorma = ({ waterNorma }) => {
  
  return (
    <div className={styles.wrapper}>
      <p className={styles.indicator}>{waterNorma} L</p>
      <p className={styles.text}>My daily norma</p>
    </div>
  );
 }

 export default WaterDailyNorma;
 