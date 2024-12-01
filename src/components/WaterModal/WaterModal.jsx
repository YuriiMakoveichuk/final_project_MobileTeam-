import Modal from "../Modal/Modal.jsx";
import styles from "./WaterModal.module.css";

const WaterModal = ({ children, onCloseModal }) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className={styles.waterModalContent}>{children}</div>
    </Modal>
  );
};
export default WaterModal;
