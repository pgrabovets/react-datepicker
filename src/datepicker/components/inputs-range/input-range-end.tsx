import { useCalendarContext } from "../../context/useCalendarContext";
import { DatePickerInput } from "../../common/datepicker-input/datepicker-input";
import type { DateRangeInput } from "../../types";
import { formatDateToString } from "../../utils";

export const InputRangeEnd = () => {
  const {
    activeRangeInput,
    setActiveRangeInput,
    endDate,
    endTime,
    onEndTimeChange,
    onEndDateChange,
  } = useCalendarContext();

  const dateRangeInput: DateRangeInput = {
    key: "end-date",
  };

  const isActive = activeRangeInput?.key === dateRangeInput.key;

  return (
    <DatePickerInput
      key={dateRangeInput.key}
      id={dateRangeInput.key}
      value={formatDateToString(endDate)}
      time={endTime ?? undefined}
      placeholder="Select End"
      isActive={isActive}
      onSelect={() => {
        setActiveRangeInput(dateRangeInput);
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
