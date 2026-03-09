import s from "./styles.module.css";
import { useMemo } from "react";
import { useCalendarContext } from "../../context/useCalendarContext";
import { createCalendarDateGrid } from "../../utils";
import { CalendarWeek } from "./calendar-week";

export const CalendarDaysGrid = () => {
  const { date } = useCalendarContext();

  const gridDate: Date[][] = useMemo(() => {
    return createCalendarDateGrid(date);
  }, [date]);

  const getKeyValue = (index: number) => `${date.toISOString()}_${index}`;

  return (
    <div className={s.calendar_days_grid}>
      {gridDate.map((weekDates, index) => (
        <CalendarWeek key={getKeyValue(index)} days={weekDates} />
      ))}
    </div>
  );
};
