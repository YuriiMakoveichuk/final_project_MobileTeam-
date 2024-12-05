import clsx from "clsx";
import css from "./CalendarItem.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, changeFullDate } from "../../redux/date.js";
import { apiWaterMonth } from "../../redux/water/dailyInfoThunk.js";
import { selectDailyWaterData } from "../../redux/water/dailyInfoSlice.js";
import { selectUser } from "../../redux/auth/selectors.js";

const CalendarItem = ({ currentYear, currentMonth }) => {
  const dispatch = useDispatch();
  const dailyWaterData = useSelector(selectDailyWaterData); // обєкт типу {дата1: кількість випитої води, дата2: кількість випитої води}
  const user = useSelector(selectUser);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState("");
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  const handleDayClick = (day) => {
    setSelectedDay(day);

    let newDate;
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      newDate = "Today";
    } else {
      newDate = `${day}, ${monthNames[currentMonth]}`;
    }

    dispatch(changeFullDate(`${currentYear}-${currentMonth + 1}-${day}`));

    dispatch(changeDate(newDate));
  };

  useEffect(() => {
    dispatch(apiWaterMonth(`${currentYear}-${currentMonth + 1}`));
  }, [currentMonth, currentYear, user, dispatch]);

  return (
    <>
      {daysInMonth.map((day) => {
        const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();

        const isSelected = selectedDay === day;
        const waterPercent =
          Number(
            ((dailyWaterData[day] / user.data.waterNorm) * 100).toFixed(0)
          ) || 0;

        return (
          <div className={css.box} key={day}>
            <div
              className={clsx(
                `${css.day} ${isToday ? css.today : ""}
                ${isSelected ? css.selected : ""}
                ${waterPercent !== 100 && !isToday ? css.bgGrey : ""}`
              )}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
            <p className={css.text}>{waterPercent}%</p>
          </div>
        );
      })}
    </>
  );
};

export default CalendarItem;
