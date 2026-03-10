import { createContext } from "react";

import type { useCalendarErrors } from "../hooks/useCalendarErrors";
import type { useCalendarInputs } from "../hooks/useCalendarInputs";
import type { CalendarConfig, DateRangeInput } from "../types";

export type CalendarContextValue = {
  date: Date;
  singleDate: Date | null;
  singleTime: string | null;
  config: CalendarConfig;
  activeRangeInput: DateRangeInput | null;
  startDate: Date | null;
  startTime: string | null;
  endDate: Date | null;
  endTime: string | null;
  inputErrors: ReturnType<typeof useCalendarErrors>;
  calendarInputs: ReturnType<typeof useCalendarInputs>;
  setActiveRangeInput: (value: DateRangeInput) => void;
  onCalendarDaySelect: (value: Date) => void;
  toNextMonth: () => void;
  toPrevMonth: () => void;
  onCalendarClear: () => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onSingleTimeChange: (value: string) => void;
  onStartDateChange: (value: Date) => void;
  onEndDateChange: (value: Date) => void;
  onSingleDateChange: (value: Date) => void;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);
