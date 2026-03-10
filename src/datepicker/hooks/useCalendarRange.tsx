import { useState } from "react";

import type { CalendarConfig, DateRange, DateRangeInput } from "../types";
import { getEndDate, getEndTime, getStartDate, getStartTime } from "../utils";

export const useCalendarRange = (config: CalendarConfig, range?: DateRange) => {
  const [activeRangeInput, setactiveRangeInput] =
    useState<DateRangeInput | null>(() => {
      return {
        key: config.isDueDate ? "end-date" : "start-date",
      };
    });

  const [startDate, setStartDate] = useState<Date | null>(getStartDate(range));
  const [endDate, setEndDate] = useState<Date | null>(getEndDate(range));
  const [startTime, setStartTime] = useState<string | null>(
    getStartTime(config, range),
  );
  const [endTime, setEndTime] = useState<string | null>(
    getEndTime(config, range),
  );

  return {
    activeRangeInput,
    startDate,
    endDate,
    startTime,
    endTime,
    setactiveRangeInput,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
  };
};
