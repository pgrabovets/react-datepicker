import clsx from "clsx";
import s from "./styles.module.css";
import { isWithinInterval } from "date-fns";

import { useCalendarContext } from "../../context/useCalendarContext";

type CalendarDayProps = {
  value: Date;
};

export const CalendarDay = ({ value }: CalendarDayProps) => {
  const { date, singleDate, onCalendarDaySelect, startDate, endDate } =
    useCalendarContext();

  const isToday = (day: Date) => {
    const today = new Date();

    return today.toDateString() === day.toDateString();
  };

  const isDateMuted = !(
    date.getMonth() === value.getMonth() &&
    date.getFullYear() === value.getFullYear()
  );

  const isSelected = () => {
    const list = [
      singleDate?.toISOString(),
      startDate?.toISOString(),
      endDate?.toISOString(),
    ];

    return list.includes(value.toISOString());
  };

  const isInsideDateRange = () => {
    if (startDate && endDate) {
      return isWithinInterval(value, {
        start: startDate,
        end: endDate,
      });
    }

    return false;
  };

  const handleDayClick = () => {
    onCalendarDaySelect(value);
  };

  const isSun = value.getDay() === 0;
  const isSat = value.getDay() === 6;

  const isFrom = startDate?.toISOString() === value.toISOString();
  const isTo = endDate?.toISOString() === value.toISOString();

  return (
    <div
      className={clsx(
        s.calendar_day_wrapper,
        isInsideDateRange() && s.inside_range,
      )}
    >
      <button
        type="button"
        onClick={handleDayClick}
        className={clsx(
          s.calendar_day_btn,
          isDateMuted && s.muted,
          isToday(value) && s.today,
          isSelected() && s.selected,
        )}
      >
        {value.getDate()}
      </button>
      <div
        className={clsx(
          s.calendar_day_bg,
          isInsideDateRange() && s.inside_range,
          (isSun || isFrom) && s.left_side,
          (isSat || isTo) && s.right_side,
        )}
      ></div>
    </div>
  );
};
