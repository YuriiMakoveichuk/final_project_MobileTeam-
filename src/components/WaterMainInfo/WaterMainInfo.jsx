import { useState } from "react";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import styles from "./WaterMainInfo.module.css";
import WaterModal from "../WaterModal/WaterModal";

const WaterMainInfo = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Aquatrack</h2>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn openModal={handleOpen} />

      {openModal && <WaterModal />}
    </div>
  );
};

export default WaterMainInfo;