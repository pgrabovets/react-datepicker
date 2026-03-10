export type DateInputKey = "start-date" | "end-date" | "single-date";

export type TimeFormat = "12h" | "24h";

export type DateRangeInput = {
  key: DateInputKey;
};

export type DateRange = {
  from: Date | null;
  to: Date | null;
};

export type DateSingle = {
  date: Date | null;
};

export type CalendarConfig = {
  isRange: boolean;
  hasInputs: boolean;
  isDueDate: boolean;
  hasTime: boolean;
  timeFormat: TimeFormat;
};
