import { useCalendarContext } from "../../context/useCalendarContext";
import { DatePickerInput } from "../../common/datepicker-input/datepicker-input";
import type { DateRangeInput } from "../../types";
import { formatDateToString } from "../../utils";

export const InputRangeStart = () => {
  const {
    activeRangeInput,
    setActiveRangeInput,
    startDate,
    startTime,
    onStartTimeChange,
    onStartDateChange,
  } = useCalendarContext();

  const dateRangeInput: DateRangeInput = {
    key: "start-date",
  };

  return (
    <DatePickerInput
      id={dateRangeInput.key}
      value={formatDateToString(startDate)}
      time={startTime ?? undefined}
      placeholder="Select Start"
      isActive={activeRangeInput?.key === dateRangeInput.key}
      onSelect={() => {
        setActiveRangeInput(dateRangeInput);
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
