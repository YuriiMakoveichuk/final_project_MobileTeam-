import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import styles from "./WaterMainInfo.module.css";
import WaterModal from "../WaterModal/WaterModal";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import WaterForm from "../WaterForm/WaterForm";
import { closeModal, openModal } from "../../redux/modal";

const WaterMainInfo = () => {
  const user = useSelector(selectUser);
  const userData = user?.data?.user || user?.data;
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.isOpen);

  const WATER = Number(userData.waterNorm) / 1000;

  const handleOpen = () => dispatch(openModal("WaterForm"));
  const handleClose = () => dispatch(closeModal());

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Aquatrack</h2>
      <WaterDailyNorma waterNorma={WATER} />
      <WaterProgressBar waterNorma={userData.waterNorm} />
      <AddWaterBtn openModal={handleOpen} />

      {isOpenModal && (
        <WaterModal onCloseModal={handleClose}>
          <WaterForm />
        </WaterModal>
        )}
    </div>
  );
};

export default WaterMainInfo;