import { defaultConfig } from "./config";
import { InputSingle } from "./components/inputs-single/input-single";
import { InputRange } from "./components/inputs-range/input-range";
import { CalendarProvider } from "./context/CalendarProvider";
import { DatePickerCard } from "./common/datepicker-card/datepicker-card";
import { CalendarDivider } from "./common/calendar-divider/calendar-divider";
import { CalendarHeader } from "./components/calendar-header/calendar-header";
import { CalendarWeekDays } from "./components/calendar-week-days/calendar-week-days";
import { CalendarFooter } from "./components/calendar-footer/calendar-footer";
import { CalendarDaysGrid } from "./components/calendar-days-grid/calendar-days-grid";

import type { DateRange, DateSingle, TimeFormat } from "./types";

type DatePickerProps = Partial<{
  single: DateSingle;
  range: DateRange;
  isRange: boolean;
  isDueDate: boolean;
  hasInputs: boolean;
  hasTime: boolean;
  timeFormat: TimeFormat;
  onSingleChange: (value: Date | null) => void;
  onRangeChange: (value: DateRange) => void;
  onClear: () => void;
}>;

export const DatePicker = ({
  single,
  range,
  isRange,
  isDueDate,
  hasInputs,
  hasTime,
  timeFormat,
  onSingleChange,
  onRangeChange,
  onClear,
}: DatePickerProps) => {
  const config = {
    isRange: isRange ?? defaultConfig.isRange,
    isDueDate: isDueDate ?? defaultConfig.isDueDate,
    hasInputs: hasInputs ?? defaultConfig.hasInputs,
    hasTime: hasTime ?? defaultConfig.hasTime,
    timeFormat: timeFormat ?? defaultConfig.timeFormat,
  };

  const inputs = config.isRange ? <InputRange /> : <InputSingle />;

  return (
    <CalendarProvider
      config={config}
      single={single}
      range={range}
      onSingleChange={onSingleChange}
      onRangeChange={onRangeChange}
      onClear={onClear}
    >
      <DatePickerCard>
        {config.hasInputs && inputs}
        <CalendarHeader />
        <CalendarWeekDays />
        <CalendarDaysGrid />
        <CalendarDivider />
        <CalendarFooter />
      </DatePickerCard>
    </CalendarProvider>
  );
};
