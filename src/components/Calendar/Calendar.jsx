import CalendarItem from "../CalendarItem/CalendarItem.jsx";

import css from "./Calendar.module.css";

const Calendar = ({ currentYear, currentMonth }) => {
  return (
    <div className={css.calendar}>
      <CalendarItem currentYear={currentYear} currentMonth={currentMonth} />;
    </div>
  );
};

export default Calendar;
