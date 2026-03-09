import { useCalendarContext } from "../../context/useCalendarContext";
import { DatePickerInput } from "../../common/datepicker-input/datepicker-input";
import type { DateRangeSlot } from "../../types";
import { getSlotValue } from "../../utils";

export const InputRangeEnd = () => {
  const {
    activeRangeSlot,
    setActiveRangeSlot,
    endDate,
    endTime,
    onEndTimeChange,
    onEndDateChange,
  } = useCalendarContext();

  const slot: DateRangeSlot = {
    key: "end-date",
  };

  const isActive = activeRangeSlot?.key === slot.key;

  return (
    <DatePickerInput
      key={slot.key}
      id={slot.key}
      value={getSlotValue(endDate)}
      time={endTime ?? undefined}
      placeholder="Select End"
      isActive={isActive}
      onSelect={() => {
        setActiveRangeSlot(slot);
      }}
      onTimeChange={(value) => {
        onEndTimeChange(value);
      }}
      onDateChange={(value) => {
        onEndDateChange(value);
      }}
    />
  );
};
