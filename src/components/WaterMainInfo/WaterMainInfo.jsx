import { useDispatch, useSelector } from "react-redux";

import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import { selectUser } from "../../redux/auth/selectors";
import EditModal from "../EditModal/EditModal.jsx";
import { updateWaterRecord } from "../../redux/water/dailyInfoThunk.js";
import { openModal } from "../../redux/modal.js";

import styles from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const user = useSelector(selectUser);
  const userData = user?.data?.user || user?.data;
  const dispatch = useDispatch();

  const WATER = Number(userData.waterNorm) / 1000;

  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.modalType);

  const confirmUpdateWater = (id, amount, time) => {
    dispatch(updateWaterRecord({ id, updatedRecord: { amount, time } }));
  };

  const handleOpen = () => {
    dispatch(openModal("edit"));
  };
  return (
    <>
      <div className={styles.box}>
        <h2 className={styles.title}>Aquatrack</h2>
        <WaterDailyNorma waterNorma={WATER} />
        <WaterProgressBar waterNorma={userData.waterNorm} />
        <AddWaterBtn handleOpen={handleOpen} />

        {isModalOpen && modalType === "edit" && (
          <EditModal onConfirm={confirmUpdateWater} />
        )}
      </div>
    </>
  );
};

export default WaterMainInfo;
