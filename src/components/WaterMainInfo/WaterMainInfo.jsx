import { AddWaterBtn } from "./AddWaterBtn/AddWaterBtn";
import { WaterDailyNorma } from "./WaterDailyNorma/WaterDailyNorma";
import { WaterProgressBar } from "./WaterProgressBar/WaterProgressBar";
import styles from "./WaterMainInfo.module.css";

export const WaterMainInfo = () => {
  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Aquatrack</h2>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};
