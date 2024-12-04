import styles from './WaterProgressBar.module.css';

const WaterProgressBar = ({ waterNorma }) => {
  //consumedWater will be replaced with data of cnsumed water from backend
  const consumedWater = 1200;

  const percentage = 100 / (waterNorma / consumedWater); 
  console.log('perc:', percentage);

  return (
    <div className={styles.wrapper}>
      <p className={styles.today}>Today</p>
      <input 
        type='range'
        className={styles.slider}
        value={percentage}
        min='0'
        max='100'
        style={{
          background: `linear-gradient(to right, #9BE1A0 ${percentage}%, #F0EFF4 ${percentage}%)`,
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
 