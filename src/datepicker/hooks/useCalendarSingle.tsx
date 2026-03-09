import { useState } from 'react';

import type { CalendarConfig, DateSingle } from '../types';
import { getSingleDate, getSingleTime } from '../utils';

export const useCalendarSingle = (config: CalendarConfig, single?: DateSingle) => {
  const [singleDate, setSingleDate] = useState<Date | null>(getSingleDate(single));
  const [singleTime, setSingleTime] = useState<string | null>(getSingleTime(config, single));

  return { singleDate, setSingleDate, singleTime, setSingleTime };
};
