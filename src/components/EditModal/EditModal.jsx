import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../Container/Container";
import Modal from "../Modal/Modal";
import { closeModal } from "../../redux/modal";
import sprite from "../../img/sprite.svg";
import {
  addWaterRecord,
  apiWaterDay,
} from "../../redux/water/dailyInfoThunk.js";
import { selectCurrentSelectedFullDate } from "../../redux/date.js";

import styles from "./EditModal.module.css";

const EditModal = () => {
  const dispatch = useDispatch();
  const editingRecord = useSelector((state) => state.water.editingRecord);
  const fullDate = useSelector(selectCurrentSelectedFullDate);

  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editingRecord) {
      setAmount(editingRecord.amount);
      setTime(
        `${new Date().getHours().toString().padStart(2, "0")}:${new Date()
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, [editingRecord]);

  const handleAmountChange = (value) => {
    if (amount + value >= 0) {
      setAmount(amount + value);
    }
  };

  const handleAmountInputChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setAmount(value === "" ? 0 : Number(value));
    }
  };

  const handleTimeChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length > 2) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }

    setTime(value);
  };

  const handleSave = () => {
    const payload = {
      date: time,
      amount,
    };

    dispatch(addWaterRecord(payload));
    dispatch(apiWaterDay(fullDate));
    dispatch(closeModal());
  };

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  if (!editingRecord) return null;

  return (
    <Container>
      <Modal className={styles.modalka} onCloseModal={onCloseModal}>
        <div className={styles.modalContent}>
          <div>
            <h4 className={styles.editTitle}>Add water</h4>
            <p className={styles.boldParagraph}>Choose a value:</p>
            <p className={styles.paragraph}>Amount of water:</p>
            <div className={styles.amountBtbWrap}>
              <button
                onClick={() => handleAmountChange(-50)}
                className={styles.minusBtn}
              >
                <svg className={styles.iconMinus} width={40} height={40}>
                  <use href={`${sprite}#icon-minus`}></use>
                </svg>
              </button>
              <span className={styles.amountWater}>{amount} ml</span>
              <button
                onClick={() => handleAmountChange(50)}
                className={styles.plusBtn}
              >
                <svg className={styles.iconPlus} width={40} height={40}>
                  <use href={`${sprite}#icon-plus`}></use>
                </svg>
              </button>
            </div>
            <p className={styles.paragraph}>Recording time:</p>
            <input
              className={styles.inputTime}
              type="text"
              value={time}
              onChange={handleTimeChange}
              placeholder="HH:MM"
            />
          </div>
          <div>
            <p className={styles.boldParagraph}>
              Enter the value of the water used:
            </p>
            <input
              className={styles.inputAmount}
              type="text"
              value={amount}
              onChange={handleAmountInputChange}
            />
          </div>
          <button onClick={handleSave} className={styles.saveNewRecords}>
            Save
          </button>
        </div>
      </Modal>
    </Container>
  );
};

export default EditModal;
