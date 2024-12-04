import clsx from "clsx";
import css from "./CalendarItem.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeDate } from "../../redux/date.js";

const CalendarItem = ({ currentYear, currentMonth }) => {
  const dispatch = useDispatch();

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
    dispatch(changeDate(newDate));
  };
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
            <p className={css.text}>100%</p>
          </div>
        );
      })}
    </>
  );
};

export default CalendarItem;
