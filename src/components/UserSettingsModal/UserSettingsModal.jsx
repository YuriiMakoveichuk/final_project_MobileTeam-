import { useDispatch, useSelector } from "react-redux";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import { closeModal } from "../../redux/modal.js";
import Modal from "../Modal/Modal.jsx";
import { Container } from "../Container/Container.jsx";

import css from "./UserSettingsModal.module.css";

const UserSettingsModal = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.modal.isOpen);

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Container>
        {isOpenModal && (
          <Modal
            onCloseModal={onCloseModal}
            top="80px"
            transform="translateX(-50%)"
          >
            <div className={css.modal}>
              <h2 className={css.title}>Settings</h2>
              <UserSettingsForm />
            </div>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default UserSettingsModal;
