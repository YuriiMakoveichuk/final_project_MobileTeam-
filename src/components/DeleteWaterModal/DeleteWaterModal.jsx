import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { closeModal } from "../../redux/modal.js";
import Modal from "../Modal/Modal.jsx";
import { Container } from "../Container/Container.jsx";
import { deleteWater } from "../../redux/water/dailyInfoSlice.js"; //added this

import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.isOpen);
  const recordToDelete = useSelector((state) => state.water.recordToDelete); //added this

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  // added this
  const confirmDelete = () => {
    if (recordToDelete) {
      dispatch(deleteWater(recordToDelete.id));
    }
    onCloseModal();
  };
  // ends here

  return (
    <>
      <Container>
        {isOpenModal && (
          <Modal onCloseModal={onCloseModal}>
            <div className={css.modal}>
              <h2 className={css.title}>Delete entry</h2>
              <p className={css.text}>
                Are you sure you want to delete the entry?
              </p>
              <div className={css.boxBtn}>
                <button
                  className={clsx(css.btn, css.btnLogout)}
                  type="button"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  className={clsx(css.btn, css.btnCancel)}
                  type="button"
                  onClick={onCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default DeleteWaterModal;
