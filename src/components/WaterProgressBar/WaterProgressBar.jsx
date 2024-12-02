import { useState } from 'react';
import styles from './WaterProgressBar.module.css';

const WaterProgressBar = () => {
  const [value, setValue] = useState(50);

  return (
    <div className={styles.wrapper}>
      <p className={styles.today}>Today</p>
      <input 
        type='range'
        className={styles.slider}
        value={value}
        min='0'
        max='100'
        style={{
          background: `linear-gradient(to right, #9BE1A0 ${value}%, #F0EFF4 ${value}%)`,
        }}
      />
      <ul className={styles.list}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
 }

 export default WaterProgressBar;
 