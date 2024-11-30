import css from "./CalendarItem.module.css";

const CalendarItem = ({ currentYear, currentMonth }) => {
  const today = new Date();
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const daysInMonth = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );
  return (
    <>
      {daysInMonth.map((day) => {
        const isToday =
          day === today.getDate() &&
          currentMonth === today.getMonth() &&
          currentYear === today.getFullYear();

        return (
          <div key={day} className={`${css.day} ${isToday ? css.today : ""}`}>
            {day}
          </div>
        );
      })}
    </>
  );
};

export default CalendarItem;
