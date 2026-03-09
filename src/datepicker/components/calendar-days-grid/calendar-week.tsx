import { CalendarDay } from "./calendar-day";
import s from "./styles.module.css";

type CalendarWeekProps = {
  days: Date[];
};

export const CalendarWeek = ({ days }: CalendarWeekProps) => {
  return (
    <div className={s.calendar_week_container}>
      {days.map((day) => {
        return <CalendarDay key={day.toISOString()} value={day} />;
      })}
    </div>
  );
};
