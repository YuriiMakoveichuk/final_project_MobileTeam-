import DailyInfo from "../DailyInfo/DailyInfo.jsx";
import UserPanel from "../UserPanel/UserPanel.jsx";
import css from "./WaterDetailedInfo.module.css";

const WaterDetailedInfo = () => {
  return (
    <>
      <div className={css.box}>
        <UserPanel />
        <DailyInfo />
      </div>
    </>
  );
};

export default WaterDetailedInfo;
