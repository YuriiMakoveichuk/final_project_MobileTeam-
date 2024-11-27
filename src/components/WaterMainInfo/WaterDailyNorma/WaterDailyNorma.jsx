import { useState } from 'react';
import styles from './WaterDailyNorma.module.css';

export const WaterDailyNorma = () => {
  const [norma, seNorma] = useState('1.5');
  
  return (
    <div className={styles.wrapper}>
      <p className={styles.indicator}>{norma} L</p>
      <p className={styles.text}>My daily norma</p>
    </div>
  );
 }
 