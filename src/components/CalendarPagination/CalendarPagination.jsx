import sprite from "../../img/sprite.svg";

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
        <div className={css.boxBtn}>
          <button className={css.button} onClick={handlePrevMonth}>
            <svg className={css.svgBtn} width={18} height={18}>
              <use href={`${sprite}#icon-chevron-left`} />
            </svg>
          </button>
          <h2 className={css.title}>
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button className={css.button} onClick={handleNextMonth}>
            <svg className={css.svgBtn} width={18} height={18}>
              <use href={`${sprite}#icon-chevron-right`} />
            </svg>
          </button>
        </div>
        <svg className={css.svg} width={20} height={20}>
          <use href={`${sprite}#icon-pie-chart`} />
        </svg>
      </div>
    </>
  );
};

export default CalendarPagination;
