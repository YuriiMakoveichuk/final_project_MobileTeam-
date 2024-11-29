import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import sprite from "../../img/sprite.svg";
import styles from "./DailyInfo.module.css";
import {
  addWater,
  setEditingRecord,
  setRecordToDelete,
} from "../../redux/dailyInfoSlice";
import { openModal } from "../../redux/modal";

import EditModal from "../EditModal/EditModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import { Container } from "../Container/Container";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";


const DailyInfo = () => {
  const dispatch = useDispatch();
  const waterRecords = useSelector((state) => state.water.records);
  const isModalOpen = useSelector((state) => state.modal.isOpen);

  const [modalType, setModalType] = useState(null); // Для определения типа модалки

  const handleAddWater = () => {
    const now = new Date();
    const newRecord = {
      id: Date.now(),
      amount: 250,
      time: formatTime(now),
    };

    function formatTime(date) {
      const timeString = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return timeString.replace(/^0/, "");
    }
    dispatch(addWater(newRecord));
  };

  const openDeleteModal = (id) => {
    setModalType("delete");
    const recordToDelete = waterRecords.find((record) => record.id === id);
    dispatch(setRecordToDelete(recordToDelete)); // Передаем целый объект записи
    dispatch(openModal());
  };

  const openEditModal = (id) => {
    setModalType("edit");
    const recordToEdit = waterRecords.find((record) => record.id === id);
    dispatch(setEditingRecord(recordToEdit));
    dispatch(openModal());
  };

  const handleDeleteWater = (id) => {
    openDeleteModal(id);
  };

  return (
    <Container>
      <div className={`${styles.dailyInfo}`}>
        <div className={styles.dailyHeader}>
          <h3 className={styles.DailyInfoTitle}>Today</h3>
          <div className={styles.addWaterWrap}>
            <button className={styles.addWaterBtn} onClick={handleAddWater}>
              <svg className={styles.iconAddWater} width={30} height={30}>
                <use href={`${sprite}#icon-add`} />
              </svg>
            </button>
            <p className={styles.addWaterText}>Add water</p>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {waterRecords.length > 0 && (
            <Swiper
              modules={[Mousewheel, Scrollbar]}
              slidesPerView={2.1}
              scrollbar={{ draggable: true }}
              style={{ paddingBottom: "24px", zIndex: 0 }}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
              mousewheel={true}
            >
              {waterRecords.map((record) => (
                <SwiperSlide key={record.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <svg className={styles.glassIcon} width={38} height={38}>
                      <use href={`${sprite}#icon-glass`} />
                    </svg>
                    <div className={styles.contentTextWrap}>
                      <span className={styles.waterAmount}>
                        {record.amount} ml
                      </span>
                      <span className={styles.time}>{record.time}</span>
                    </div>
                    <div className={styles.btnWrap}>
                      <button
                        className={styles.editBtn}
                        onClick={() => openEditModal(record.id)}
                      >
                        <svg className={styles.iconEdit} width={14} height={14}>
                          <use href={`${sprite}#icon-edit`} />
                        </svg>
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteWater(record.id)}
                      >
                        <svg
                          className={styles.iconTrash}
                          width={14}
                          height={14}
                        >
                          <use href={`${sprite}#icon-trash`} />
                        </svg>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {isModalOpen && modalType === "delete" && <DeleteWaterModal />}

        {isModalOpen && modalType === "edit" && <EditModal />}
      </div>
    </Container>
  );
};

export default DailyInfo;

