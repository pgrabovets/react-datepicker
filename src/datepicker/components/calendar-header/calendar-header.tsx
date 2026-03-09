import s from "./styles.module.css";

import { useCalendarContext } from "../../context/useCalendarContext";
import { ArrowLeft } from "../icons/ArrowLeft";
import { ArrowRight } from "../icons/ArrowRight";
import { getMonthName } from "../../utils";

export const CalendarHeader = () => {
  const { date, toNextMonth, toPrevMonth } = useCalendarContext();
  const year = date.getFullYear();
  const month = getMonthName(date.getMonth());

  return (
    <div className={s.calendar_header}>
      <div className={s.calendar_title}>
        <span>{month}</span>
        <span>{year}</span>
      </div>
      <div className={s.calendar_nav}>
        <button className={s.calendar_nav_btn} onClick={() => toPrevMonth()}>
          <ArrowLeft />
        </button>
        <button className={s.calendar_nav_btn} onClick={() => toNextMonth()}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
