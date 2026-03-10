import { useCallback, useState } from "react";

import type { DateInputKey } from "../types";

type FieldState = {
  date: string;
  time: string;
};

const initState: Record<DateInputKey, FieldState> = {
  "start-date": { date: "", time: "" },
  "end-date": { date: "", time: "" },
  "single-date": { date: "", time: "" },
};

export const useCalendarInputs = () => {
  const [fields, setFields] = useState(initState);

  const updateDateField = useCallback((key: DateInputKey, date: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: { ...prevFields[key], date },
    }));
  }, []);

  const updateTimeField = useCallback((key: DateInputKey, time: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: { ...prevFields[key], time },
    }));
  }, []);

  const resetFields = useCallback(() => {
    setFields(initState);
  }, []);

  const getDateField = useCallback(
    (key: DateInputKey) => {
      return fields[key].date;
    },
    [fields],
  );

  const getTimeField = useCallback(
    (key: DateInputKey) => {
      return fields[key].time;
    },
    [fields],
  );

  return {
    fields,
    updateDateField,
    updateTimeField,
    resetFields,
    getDateField,
    getTimeField,
  };
};
