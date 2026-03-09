import s from "./styles.module.css";
import { useCalendarContext } from "../../context/useCalendarContext";

export const CalendarFooter = () => {
  const { onCalendarClear } = useCalendarContext();

  return (
    <div className={s.calendar_footer}>
      <button
        className={s.clear_btn}
        onClick={() => {
          onCalendarClear();
        }}
      >
        Clear
      </button>
    </div>
  );
};
