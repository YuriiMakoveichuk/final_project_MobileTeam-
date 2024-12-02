import styles from './WaterProgressBar.module.css';
import { INSTANCE } from '../../redux/auth/operations';
import { useEffect, useState } from 'react';

const WaterProgressBar = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchWaterAmount = async () => {
      try {
        const result = await INSTANCE.get('/water');
        if (result?.data?.percentage) {
          setValue(result.data);
        }
      } catch (err) {
        console.error('Error fetching water data:', err);
      }
    };

    fetchWaterAmount();
  }, []);

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
        readOnly
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
 