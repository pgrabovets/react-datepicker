import { useCallback, useState } from "react";

import type { DateInputKey } from "../types";

type ErrorState = {
  date: string;
  time: string;
};

const initState: Record<DateInputKey, ErrorState> = {
  "start-date": { date: "", time: "" },
  "end-date": { date: "", time: "" },
  "single-date": { date: "", time: "" },
};

export const useCalendarErrors = () => {
  const [errors, setErrors] = useState(initState);

  const resetErrors = useCallback(() => {
    setErrors(initState);
  }, []);

  const updateDateError = useCallback((key: DateInputKey, error: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { ...prevErrors[key], date: error },
    }));
  }, []);

  const updateTimeError = useCallback((key: DateInputKey, error: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { ...prevErrors[key], time: error },
    }));
  }, []);

  const clearDateError = useCallback((key: DateInputKey) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { ...prevErrors[key], date: "" },
    }));
  }, []);

  const clearTimeError = useCallback((key: DateInputKey) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { ...prevErrors[key], time: "" },
    }));
  }, []);

  const getDateError = useCallback(
    (key: DateInputKey) => {
      return errors[key].date;
    },
    [errors],
  );

  const getTimeError = useCallback(
    (key: DateInputKey) => {
      return errors[key].time;
    },
    [errors],
  );

  const hasErrors = useCallback(
    (key: DateInputKey) => {
      return errors[key].date !== "" || errors[key].time !== "";
    },
    [errors],
  );

  return {
    errors,
    updateDateError,
    updateTimeError,
    resetErrors,
    clearDateError,
    clearTimeError,
    hasErrors,
    getDateError,
    getTimeError,
  };
};
