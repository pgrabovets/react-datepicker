import { addMonths, subMonths } from 'date-fns';
import { useCallback, useState } from 'react';

export const useCalendarDate = (defauldValue?: Date | string | null) => {
  const initDate = () => {
    const date = defauldValue ? new Date(defauldValue) : new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(year, month, day);
  };

  const [date, setDate] = useState(initDate);

  const toNextMonth = useCallback(() => {
    const result = addMonths(date, 1);
    setDate(result);
  }, [date]);

  const toPrevMonth = useCallback(() => {
    const result = subMonths(date, 1);
    setDate(result);
  }, [date]);

  const setToday = useCallback(() => {
    setDate(new Date());
  }, []);

  return {
    date,
    setDate,
    toNextMonth,
    toPrevMonth,
    setToday,
  };
};
