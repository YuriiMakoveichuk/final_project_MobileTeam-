import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import UserBar from "../UserBar/UserBar.jsx";

import css from "./UserPanel.module.css";
import { openModal, selectIsOpenModal } from "../../redux/modal.js";
import { useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";

const UserPanel = () => {
  const dispatch = useDispatch();

  const [modalType, setModalType] = useState(null);
  const [showIconArrow, setShowIconArrow] = useState(true);
  const [isOpenUserBarPopover, setIsOpenUserBarPopover] = useState(false);

  const user = useSelector(selectUser);
  const isOpenModal = useSelector(selectIsOpenModal);

  const toggleUserBarPopover = () => {
    setIsOpenUserBarPopover((prevState) => !prevState);
    setShowIconArrow((prevState) => !prevState);
  };

  const openModalWindow = (modalType) => {
    switch (modalType) {
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

  const closeModalWindow = () => {
    setIsOpenUserBarPopover(false);
    setShowIconArrow(true);
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

      {isOpenModal && modalType === "userSettings" && <UserSettingsModal />}

      {isOpenModal && modalType === "logOut" && <LogOutModal />}
    </div>
  );
};

export default UserPanel;
