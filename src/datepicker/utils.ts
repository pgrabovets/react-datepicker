import { format, isAfter } from 'date-fns';

import type { CalendarConfig, DateRange, DateSingle, TimeFormat } from './types';

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const config = {
  WIDTH: 7,
  HEIGHT: 6,
};

export const getDefaultTime = (config: CalendarConfig) => {
  if (config.timeFormat === '12h') {
    return '12:00 AM';
  }

  return '0:00';
};

export const getMonthName = (id: number) => {
  if (id >= 0 && id < 12) {
    return allMonths[id];
  }

  console.error("Can't get month name. Wrong month id range");

  return '';
};

export const createCalendarDateGrid = (date: Date) => {
  const start = new Date(date);
  start.setDate(1);

  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const rowArr: Date[][] = [];

  for (let i = 0; i < config.HEIGHT; i++) {
    const arr: Date[] = [];
    for (let j = 0; j < config.WIDTH; j++) {
      const weekDayDate = new Date(start);
      weekDayDate.setDate(start.getDate() + j + i * 7);
      arr.push(weekDayDate);
    }
    rowArr.push(arr);
  }

  return rowArr;
};

export const getSlotValue = (date: Date | null) => {
  if (!date) {
    return '';
  }

  return format(date, 'd MMM yyyy');
};

export const getDefaultCalendarDate = (config: CalendarConfig, single?: DateSingle, range?: DateRange) => {
  const today = new Date();

  if (config.isRange && range) {
    return range.from ?? range.to;
  }

  if (!config.isRange && single) {
    return single.date;
  }

  return today;
};

export const dropDateHours = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
};

export const getSingleDate = (single?: DateSingle) => {
  if (single?.date) {
    return dropDateHours(single.date);
  }

  return null;
};

export const getStartDate = (range?: DateRange) => {
  if (range?.from) {
    return dropDateHours(range.from);
  }

  return null;
};

export const getEndDate = (range?: DateRange) => {
  if (range?.to) {
    return dropDateHours(range.to);
  }

  return null;
};

export const getSingleTime = (config: CalendarConfig, single?: DateSingle) => {
  if (config.hasTime && !single?.date) {
    return getDefaultTime(config);
  }

  if (single?.date && config.timeFormat === '12h') {
    return format(single.date, 'hh:mm a');
  }

  return single?.date ? format(single.date, 'HH:mm') : null;
};

export const getStartTime = (config: CalendarConfig, range?: DateRange) => {
  if (config.hasTime && !range?.from) {
    return getDefaultTime(config);
  }

  if (range?.from && config.timeFormat === '12h') {
    return format(range.from, 'hh:mm a');
  }

  return range?.from ? format(range.from, 'HH:mm') : null;
};

export const getEndTime = (config: CalendarConfig, range?: DateRange) => {
  if (config.hasTime && !range?.to) {
    return getDefaultTime(config);
  }

  if (range?.to && config.timeFormat === '12h') {
    return format(range.to, 'hh:mm a');
  }

  return range?.to ? format(range.to, 'HH:mm') : null;
};

export const getRangeDates = (date1: Date | null, date2: Date | null) => {
  if (date1 && date2 && isAfter(date1, date2)) {
    return { from: date2, to: date1 };
  }

  return { from: date1, to: date2 };
};

export const parseTime = (time: string, timeFormat: TimeFormat) => {
  if (timeFormat === '12h') {
    const timeParts = time.trim().split(' ');
    const [hourMin, period] = timeParts;
    const [hoursStr, minutesStr] = hourMin.split(':');

    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time format');

      return { hours: 0, minutes: 0 };
    }

    if (period?.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period?.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  } else {
    const [hoursStr, minutesStr] = time.split(':');

    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time format');

      return { hours: 0, minutes: 0 };
    }

    return { hours, minutes };
  }
};

export const getSingleResult = (
  value: { date: Date | null; time: string | null },
  timeFormat: TimeFormat
): Date | null => {
  const dateResult = value.date ? new Date(value.date) : null;

  if (dateResult && value.time) {
    const { hours, minutes } = parseTime(value.time, timeFormat);
    dateResult.setHours(hours, minutes);
  }

  return dateResult;
};

export const getRangeResult = (
  value: {
    from: Date | null;
    fromTime: string | null;
    to: Date | null;
    toTime: string | null;
  },
  timeFormat: TimeFormat
): DateRange => {
  const fromResult = value.from ? new Date(value.from) : null;
  const toResult = value.to ? new Date(value.to) : null;

  if (fromResult && value.fromTime) {
    const { hours, minutes } = parseTime(value.fromTime, timeFormat);
    fromResult.setHours(hours, minutes);
  }

  if (toResult && value.toTime) {
    const { hours, minutes } = parseTime(value.toTime, timeFormat);
    toResult.setHours(hours, minutes);
  }

  return {
    from: fromResult,
    to: toResult,
  };
};
