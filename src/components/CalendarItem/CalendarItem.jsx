import clsx from "clsx";
import css from "./CalendarItem.module.css";
import { useState } from "react";

const CalendarItem = ({ currentYear, currentMonth }) => {
  const today = new Date();
  const [selectedDays, setSelectedDays] = useState({});
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  const handleDayClick = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };
  return (
    <>
      {daysInMonth.map((day) => {
        const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();

        const isSelected = selectedDays[day];

        return (
          <div className={css.box} key={day}>
            <div
              className={clsx(
                `${css.day} ${isToday ? css.today : ""} ${
                  isSelected ? css.selected : ""
                }`
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
