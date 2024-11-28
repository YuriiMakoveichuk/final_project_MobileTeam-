import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import Modal from "../Modal/Modal.jsx";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import UserBar from "../UserBar/UserBar.jsx";

import css from "./UserPanel.module.css";
import {
  closeModal,
  // closeUserBarPopoverModal,
  openModal,
  selectIsOpenModal,
  // selectIsOpenUserBarPopover,
} from "../../redux/modal.js";
import { useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";

const UserPanel = () => {
  const dispatch = useDispatch();

  const [modalType, setModalType] = useState(null);
  const [showIconArrow, setShowIconArrow] = useState(true);
  const [isOpenUserBarPopover, setIsOpenUserBarPopover] = useState(false);

  const user = useSelector(selectUser);
  const isOpenModal = useSelector(selectIsOpenModal);
  // const isOpenUserBarPopover = useSelector(selectIsOpenUserBarPopover);

  // const toggleIconArrow = () => {
  //   setShowIconArrow((prevState) => !prevState);
  // };

  const toggleUserBarPopover = () => {
    setIsOpenUserBarPopover((prevState) => !prevState);
    setShowIconArrow((prevState) => !prevState);
  };

  const openModalWindow = (modalType) => {
    switch (modalType) {
      // case "userBarPopover":
      //   setIsOpenUserBarPopover(true);
      //   break;
      case "userSettings":
        dispatch(openModal());
        setModalType("userSettings");
        break;
      case "logOut":
        dispatch(openModal());
        setModalType("logOut");
        break;
      default:
        break;
    }
  };

  const closeModalWindow = (modalType) => {
    switch (modalType) {
      case "userBarPopover":
        // dispatch(closeUserBarPopoverModal());
        setIsOpenUserBarPopover(false);
        setShowIconArrow(true);
        break;
      case "userSettings":
        dispatch(closeModal());
        setModalType(null);
        break;
      case "logOut":
        dispatch(closeModal());
        setModalType(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className={css.wrapperUserPanel}>
      <p className={css.titleUserPanel}>
        Hello<span className={css.nameAcceptWeight}>, {user.name}!</span>
      </p>
      <div className={css.wrapperUserBar}>
        <UserBar
          openModal={openModalWindow}
          toggleUserBarPopover={toggleUserBarPopover}
          showIconArrow={showIconArrow}
        />
        {isOpenUserBarPopover && (
          <UserBarPopover
            openModal={openModalWindow}
            closeUserBarPopover={() => closeModalWindow("userBarPopover")}
          />
        )}
      </div>

      {isOpenModal && modalType === "userSettings" && (
        <Modal
          onCloseModal={() => closeModalWindow("userSettings")}
          top="40px"
          transform="translateX(-50%)"
        >
          <UserSettingsModal />
        </Modal>
      )}

      {isOpenModal && modalType === "logOut" && (
        <Modal onCloseModal={() => closeModalWindow("logOut")}>
          <LogOutModal onCloseModal={() => closeModalWindow("logOut")} />
        </Modal>
      )}
    </div>
  );
};

export default UserPanel;
