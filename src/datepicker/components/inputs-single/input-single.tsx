import { useCalendarContext } from "../../context/useCalendarContext";
import s from "../styles/shared.module.css";
import { DatePickerInput } from "../../common/datepicker-input/datepicker-input";
import type { DateRangeInput } from "../../types";
import { formatDateToString } from "../../utils";

export const InputSingle = () => {
  const { singleDate, singleTime, onSingleTimeChange, onSingleDateChange } =
    useCalendarContext();

  const dateRangeInput: DateRangeInput = {
    key: "single-date",
  };

  return (
    <div className={s.input_range_grid}>
      <DatePickerInput
        id={dateRangeInput.key}
        value={formatDateToString(singleDate)}
        time={singleTime ?? undefined}
        placeholder="Select Date"
        onTimeChange={(value) => {
          onSingleTimeChange(value);
        }}
        onDateChange={(value) => {
          onSingleDateChange(value);
        }}
      />
    </div>
  );
};
