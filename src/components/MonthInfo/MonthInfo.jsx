import React, { useState } from "react";
import "./MonthInfo.css";

const Calendar = () => {
  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); 
  const today = new Date();

  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  
  const daysInMonth = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  
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

  
  const monthNames = [
    "January,", "February,", "March,", "April,", "May,", "June,",
    "July,", "August,", "September,", "October,", "November,", "December,"
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Month</h1>
        <div className="month-select">
            <button onClick={handlePrevMonth}>&lt; </button>
            <h2>
            {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={handleNextMonth}> &gt;</button>
        </div>
      </div>
      <div className="calendar">
      {daysInMonth.map((day) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={day}
              className={`day ${isToday ? "today" : ""}`}
            >
              {day}
          </div>
          );
         })}
      </div>
    </div>
  );
};

export default Calendar;