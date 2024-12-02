import { useState } from 'react';
import styles from './WaterDailyNorma.module.css';
import { useDispatch, useSelector } from 'react-redux';

const WaterDailyNorma = () => {
  const [norma, setNorma] = useState('1.5');
  
  return (
    <div className={styles.wrapper}>
      <p className={styles.indicator}>{norma} L</p>
      <p className={styles.text}>My daily norma</p>
    </div>
  );
 }

 export default WaterDailyNorma;
 