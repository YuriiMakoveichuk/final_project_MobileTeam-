import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeDate, changeFullDate } from "../../redux/date.js";
import { apiWaterMonth } from "../../redux/water/dailyInfoThunk.js";
import {
  selectDailyWaterData,
  selectWaterInfoDay,
} from "../../redux/water/dailyInfoSlice.js";
import { selectUser } from "../../redux/auth/selectors.js";

import css from "./CalendarItem.module.css";

const CalendarItem = ({ currentYear, currentMonth }) => {
  const dispatch = useDispatch();
  const dailyWaterData = useSelector(selectDailyWaterData);
  const amount = useSelector(selectWaterInfoDay);
  const user = useSelector(selectUser);
  const newUser = user.data.user || user.data;

  const totalAmount = amount.reduce((acc, amount) => {
    return acc + amount.amount;
  }, 0);

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
  const [waterPercent, setWaterPercent] = useState(0);

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

    dispatch(
      changeFullDate(
        `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      )
    );

    dispatch(changeDate(newDate));
  };

  useEffect(() => {
    setWaterPercent(((totalAmount / newUser.waterNorm) * 100).toFixed(0) || 0);
    dispatch(apiWaterMonth(`${currentYear}-${currentMonth + 1}`));
  }, [
    currentMonth,
    currentYear,
    user,
    dispatch,
    totalAmount,
    newUser.waterNorm,
  ]);

  return (
    <>
      {daysInMonth.map((day) => {
        const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();

        const isSelected = selectedDay === day;

        return (
          <div className={css.box} key={day}>
            <div
              className={clsx(
                `${css.day} ${isToday ? css.today : ""}
                ${isSelected ? css.selected : ""}`
              )}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
            <p className={css.text}>
              {isSelected
                ? `${waterPercent}%`
                : `${
                    Number(
                      ((dailyWaterData[day] / newUser.waterNorm) * 100).toFixed(
                        0
                      )
                    ) || 0
                  }%`}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default CalendarItem;
