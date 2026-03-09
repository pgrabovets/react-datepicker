import s from "./styles.module.css";

export const CalendarWeekDays = () => {
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={s.calendar_week_days}>
      {weekDays.map((day) => (
        <div className={s.calendar_week_day} key={day}>
          {day}
        </div>
      ))}
    </div>
  );
};
