import { useState } from 'react';

import type { CalendarConfig, DateRange, DateRangeSlot } from '../types';
import { getEndDate, getEndTime, getStartDate, getStartTime } from '../utils';

export const useCalendarRange = (config: CalendarConfig, range?: DateRange) => {
  const [activeRangeSlot, setActiveRangeSlot] = useState<DateRangeSlot | null>(() => {
    return {
      key: config.isDueDate ? 'end-date' : 'start-date',
    };
  });

  const [startDate, setStartDate] = useState<Date | null>(getStartDate(range));
  const [endDate, setEndDate] = useState<Date | null>(getEndDate(range));
  const [startTime, setStartTime] = useState<string | null>(getStartTime(config, range));
  const [endTime, setEndTime] = useState<string | null>(getEndTime(config, range));

  return {
    activeRangeSlot,
    startDate,
    endDate,
    startTime,
    endTime,
    setActiveRangeSlot,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
  };
};
