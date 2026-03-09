import { useCalendarContext } from "../../context/useCalendarContext";
import { DatePickerInput } from "../../common/datepicker-input/datepicker-input";
import type { DateRangeSlot } from "../../types";
import { getSlotValue } from "../../utils";

export const InputRangeStart = () => {
  const {
    activeRangeSlot,
    setActiveRangeSlot,
    startDate,
    startTime,
    onStartTimeChange,
    onStartDateChange,
  } = useCalendarContext();

  const slot: DateRangeSlot = {
    key: "start-date",
  };

  return (
    <DatePickerInput
      id={slot.key}
      value={getSlotValue(startDate)}
      time={startTime ?? undefined}
      placeholder="Select Start"
      isActive={activeRangeSlot?.key === slot.key}
      onSelect={() => {
        setActiveRangeSlot(slot);
      }}
      onTimeChange={(value) => {
        onStartTimeChange(value);
      }}
      onDateChange={(value) => {
        onStartDateChange(value);
      }}
    />
  );
};
