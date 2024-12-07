import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchWaterRecords } from "../../redux/water/dailyInfoThunk";

import styles from "./WaterProgressBar.module.css";
import { selectWaterInfoDay } from "../../redux/water/dailyInfoSlice.js";

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const WaterProgressBar = ({ waterNorma }) => {
  const dispatch = useDispatch();

  const waterInfoDay = useSelector(selectWaterInfoDay);

  const CONSUMEDWATER = waterInfoDay.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const PERCENTAGE =
    CONSUMEDWATER && waterNorma ? 100 / (waterNorma / CONSUMEDWATER) : 0;

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDateToYYYYMMDD(today);
    dispatch(fetchWaterRecords(formattedDate));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.today}>Today</p>
      <input
        type="range"
        className={styles.slider}
        value={PERCENTAGE}
        min="0"
        max="100"
        style={{
          background: `linear-gradient(to right, #9BE1A0 ${PERCENTAGE}%, #F0EFF4 ${PERCENTAGE}%)`,
        }}
        readOnly
      />
      <ul className={styles.list}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
