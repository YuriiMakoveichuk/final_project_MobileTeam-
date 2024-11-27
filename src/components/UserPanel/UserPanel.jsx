import { useState } from "react";
import UserBar from "../UserBar/UserBar.jsx";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";

import css from "./UserPanel.module.css";
import Modal from "../Modal/Modal.jsx";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";

const UserPanel = () => {
  const userName = "Nadia";

  const [isOpenUserBarPopover, setIsOpenUserBarPopover] = useState(false);
  const [showIconArrowUp, setShowIconArrowUp] = useState(false);
  const [showIconArrowDown, setShowIconArrowDown] = useState(true);
  const [isOpenUserSettingsModal, setIsOpenUserSettingsModal] = useState(false);
  const [isOpenLogOutModal, setIsOpenLogOutModal] = useState(false);

  const handleClickUserBar = () => {
    setIsOpenUserBarPopover((prevState) => !prevState);
    setShowIconArrowUp((prevState) => !prevState);
    setShowIconArrowDown((prevState) => !prevState);
  };

  const closeUserBarPopover = () => {
    setIsOpenUserBarPopover(false);
    setShowIconArrowUp(false);
    setShowIconArrowDown(true);
  };

  const closeUserSettingsModal = () => {
    setIsOpenUserSettingsModal(false);
  };

  const closeLogOutModal = () => {
    setIsOpenLogOutModal(false);
  };

  const openUserSettingsModal = () => {
    setIsOpenUserSettingsModal(true);
  };

  const openLogOutModal = () => {
    setIsOpenLogOutModal(true);
  };

  return (
    <div className={css.wrapperUserPanel}>
      <p className={css.titleUserPanel}>
        Hello<span className={css.nameAcceptWeight}>, {userName}!</span>
      </p>
      <div className={css.wrapperUserBar}>
        <UserBar
          clickUserBar={handleClickUserBar}
          iconArrowUp={showIconArrowUp}
          iconArrowDown={showIconArrowDown}
          userName={userName}
        />
        {isOpenUserBarPopover && (
          <UserBarPopover
            closeUserBarPopover={closeUserBarPopover}
            openUserSettingsModal={openUserSettingsModal}
            openLogOutModal={openLogOutModal}
          />
        )}
      </div>
      {isOpenUserSettingsModal && (
        <Modal
          onCloseModal={closeUserSettingsModal}
          top="40px"
          transform="translateX(-50%)"
        >
          {/* <Section> */}
          <UserSettingsModal />
          {/* </Section> */}
        </Modal>
      )}
      {isOpenLogOutModal && (
        <Modal onCloseModal={closeLogOutModal}>
          <LogOutModal />
        </Modal>
      )}
    </div>
  );
};

export default UserPanel;
