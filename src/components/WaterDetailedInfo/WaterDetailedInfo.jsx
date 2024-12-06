import DailyInfo from "../DailyInfo/DailyInfo.jsx";
import UserPanel from "../UserPanel/UserPanel.jsx";
import MonthInfo from "../MonthInfo/MonthInfo.jsx";

import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <>
      <div className={css.box}>
        <UserPanel />
        <DailyInfo />
        <MonthInfo />
      </div>
    </>
  );
};

export default WaterDetailedInfo;
