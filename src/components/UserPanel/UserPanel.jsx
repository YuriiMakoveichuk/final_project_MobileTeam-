import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

import Modal from "../Modal/Modal.jsx";
import { Section } from "../Section/Section.jsx";
import UserBar from "../UserBar/UserBar.jsx";
import UserBarPopover from "../UserBarPopover/UserBarPopover.jsx";

import css from "./UserPanel.module.css";

const UserPanel = () => {
  const user = useSelector(selectUser);

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
        Hello<span className={css.nameAcceptWeight}>, {user.name}!</span>
      </p>
      <div className={css.wrapperUserBar}>
        <UserBar
          clickUserBar={handleClickUserBar}
          iconArrowUp={showIconArrowUp}
          iconArrowDown={showIconArrowDown}
          userName={user.name}
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
        <Modal onCloseModal={closeUserSettingsModal}>
          <Section>Component UserSettingsModal</Section>
        </Modal>
      )}
      {isOpenLogOutModal && (
        <Modal onCloseModal={closeLogOutModal}>
          <Section>Component LogOutModal</Section>
        </Modal>
      )}
    </div>
  );
};

export default UserPanel;
