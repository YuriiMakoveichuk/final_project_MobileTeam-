import css from "./CalendarPagination.module.css";

const CalendarPagination = ({
  handlePrevMonth,
  handleNextMonth,
  currentMonth,
  currentYear,
}) => {
  const monthNames = [
    "January,",
    "February,",
    "March,",
    "April,",
    "May,",
    "June,",
    "July,",
    "August,",
    "September,",
    "October,",
    "November,",
    "December,",
  ];
  return (
    <>
      <div className={css.monthSelect}>
        <button className={css.button} onClick={handlePrevMonth}>
          &lt;
        </button>
        <h2 className={css.title}>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button className={css.button} onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default CalendarPagination;
