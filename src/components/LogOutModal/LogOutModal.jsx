import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { closeModal } from "../../redux/modal.js";
import Modal from "../Modal/Modal.jsx";
import { Container } from "../Container/Container.jsx";

import css from "./LogOutModal.module.css";
import { apiLogout } from "../../redux/auth/operations.js";

const LogOutModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.isOpen);

  const onLogout = () => {
    dispatch(apiLogout());
    dispatch(closeModal());
  };

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Container>
        {isOpenModal && (
          <Modal onCloseModal={onCloseModal}>
            <div className={css.modal}>
              <h2 className={css.title}>Log out</h2>
              <p className={css.text}>Do you really want to leave?</p>
              <div className={css.boxBtn}>
                <button
                  className={clsx(css.btn, css.btnLogout)}
                  type="button"
                  onClick={onLogout}
                >
                  Log out
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

export default LogOutModal;
