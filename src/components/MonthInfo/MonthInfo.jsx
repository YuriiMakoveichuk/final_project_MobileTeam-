import { useState } from "react";
import css from "./MonthInfo.module.css";
import Calendar from "../Calendar/Calendar.jsx";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";

const MonthInfo = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <>
      <div className={css.calendarHeader}>
        <h1>Month</h1>
        <CalendarPagination
          handleNextMonth={handleNextMonth}
          handlePrevMonth={handlePrevMonth}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
      </div>
      <Calendar currentYear={currentYear} currentMonth={currentMonth} />
    </>
  );
};

export default MonthInfo;