import { useCalendarContext } from "../../context/useCalendarContext";
import s from "../styles/shared.module.css";
import { DatePickerInput } from "../../common/datepicker-input/datepicker-input";
import type { DateRangeSlot } from "../../types";
import { getSlotValue } from "../../utils";

export const InputSingle = () => {
  const { singleDate, singleTime, onSingleTimeChange, onSingleDateChange } =
    useCalendarContext();

  const slot: DateRangeSlot = {
    key: "single-date",
  };

  return (
    <div className={s.input_range_grid}>
      <DatePickerInput
        id={slot.key}
        value={getSlotValue(singleDate)}
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
