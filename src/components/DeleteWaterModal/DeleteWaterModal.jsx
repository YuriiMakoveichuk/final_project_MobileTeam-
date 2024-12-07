import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { closeModal } from "../../redux/modal.js";
import Modal from "../Modal/Modal.jsx";
import { Container } from "../Container/Container.jsx";
import {
  apiWaterDay,
  apiWaterMonth,
  deleteWaterRecord,
} from "../../redux/water/dailyInfoThunk.js";
import { selectCurrentSelectedFullDate } from "../../redux/date.js";

import css from "./DeleteWaterModal.module.css";

const DeleteWaterModal = ({ id }) => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.isOpen);
  const fullDate = useSelector(selectCurrentSelectedFullDate);

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  const deleteWater = async () => {
    try {
      await dispatch(deleteWaterRecord(id));
      await dispatch(apiWaterDay(fullDate));
      await dispatch(apiWaterMonth(fullDate));
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

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
                  onClick={deleteWater}
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
