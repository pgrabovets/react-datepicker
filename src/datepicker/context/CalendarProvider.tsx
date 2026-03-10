import { useCallback, useMemo } from "react";

import { useCalendarDate } from "../hooks/useCalendarDate";
import { useCalendarErrors } from "../hooks/useCalendarErrors";
import { useCalendarRange } from "../hooks/useCalendarRange";
import { useCalendarSingle } from "../hooks/useCalendarSingle";
import { useCalendarInputs } from "../hooks/useCalendarInputs";
import type {
  CalendarConfig,
  DateRange,
  DateSingle,
  DateRangeInput,
} from "../types";
import {
  getDefaultCalendarDate,
  getRangeDates,
  getRangeResult,
  getSingleResult,
} from "../utils";
import { CalendarContext } from "./CalendarContext";

type CalendarProviderProps = {
  children: React.ReactNode;
  single?: DateSingle;
  range?: DateRange;
  config: CalendarConfig;
  onSingleChange?: (value: Date | null) => void;
  onRangeChange?: (value: DateRange) => void;
  onClear?: () => void;
};

export const CalendarProvider = ({
  children,
  config,
  single,
  range,
  onSingleChange,
  onRangeChange,
  onClear,
}: CalendarProviderProps) => {
  const { date, toNextMonth, toPrevMonth, setDate, setToday } = useCalendarDate(
    getDefaultCalendarDate(config, single, range),
  );
  const {
    activeRangeInput,
    setactiveRangeInput,
    startDate,
    startTime,
    endDate,
    endTime,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
  } = useCalendarRange(config, range);

  const { singleDate, setSingleDate, singleTime, setSingleTime } =
    useCalendarSingle(config, single);

  const inputErrors = useCalendarErrors();

  const calendarInputs = useCalendarInputs();

  const updateStartDate = useCallback(
    (value: Date) => {
      const { from, to } = getRangeDates(value, endDate);
      setStartDate(from);
      setEndDate(to);

      const result = getRangeResult(
        {
          from: from,
          fromTime: startTime,
          to: to,
          toTime: endTime,
        },
        config.timeFormat,
      );

      onRangeChange?.(result);
    },
    [
      config.timeFormat,
      endDate,
      endTime,
      onRangeChange,
      setEndDate,
      setStartDate,
      startTime,
    ],
  );

  const updateEndDate = useCallback(
    (value: Date) => {
      const { from, to } = getRangeDates(startDate, value);
      setStartDate(from);
      setEndDate(to);

      const result = getRangeResult(
        {
          from: from,
          fromTime: startTime,
          to: to,
          toTime: endTime,
        },
        config.timeFormat,
      );

      onRangeChange?.(result);
    },
    [
      config.timeFormat,
      endTime,
      onRangeChange,
      setEndDate,
      setStartDate,
      startDate,
      startTime,
    ],
  );

  const handleSetSingleDate = useCallback(
    (value: Date) => {
      setSingleDate(value);
      const result = getSingleResult(
        {
          date: value,
          time: singleTime,
        },
        config.timeFormat,
      );

      onSingleChange?.(result);
    },
    [config.timeFormat, onSingleChange, setSingleDate, singleTime],
  );

  const resetAllSelections = useCallback(() => {
    setSingleDate(null);
    setSingleTime(null);
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
  }, [
    setEndDate,
    setEndTime,
    setSingleDate,
    setSingleTime,
    setStartDate,
    setStartTime,
  ]);

  const resetactiveRangeInput = useCallback(() => {
    if (config.isRange && config.isDueDate) {
      setactiveRangeInput({
        key: "end-date",
      });

      return;
    }

    if (config.isRange) {
      setactiveRangeInput({
        key: "start-date",
      });

      return;
    }

    setactiveRangeInput({
      key: "single-date",
    });
  }, [config.isDueDate, config.isRange, setactiveRangeInput]);

  const onCalendarDaySelect = useCallback(
    (value: Date) => {
      if (config.isRange && activeRangeInput?.key === "start-date") {
        updateStartDate(value);
        setactiveRangeInput({
          key: "end-date",
        });
        inputErrors.clearDateError("start-date");

        return;
      }

      if (config.isRange && activeRangeInput?.key === "end-date") {
        updateEndDate(value);
        setactiveRangeInput({
          key: "start-date",
        });
        inputErrors.clearDateError("end-date");

        return;
      }

      handleSetSingleDate(value);
      inputErrors.clearDateError("single-date");
    },
    [
      config.isRange,
      activeRangeInput?.key,
      handleSetSingleDate,
      inputErrors,
      updateStartDate,
      setactiveRangeInput,
      updateEndDate,
    ],
  );

  const onCalendarClear = useCallback(() => {
    resetAllSelections();
    resetactiveRangeInput();
    setToday();
    onRangeChange?.({
      from: null,
      to: null,
    });
    onSingleChange?.(null);
    inputErrors.resetErrors();
    onClear?.();
  }, [
    onClear,
    onRangeChange,
    onSingleChange,
    resetactiveRangeInput,
    resetAllSelections,
    setToday,
    inputErrors,
  ]);

  const onStartTimeChange = useCallback(
    (value: string) => {
      setStartTime(value);

      const result = getRangeResult(
        {
          from: startDate,
          fromTime: value,
          to: endDate,
          toTime: endTime,
        },
        config.timeFormat,
      );

      onRangeChange?.(result);
    },
    [
      config.timeFormat,
      endDate,
      endTime,
      onRangeChange,
      setStartTime,
      startDate,
    ],
  );

  const onEndTimeChange = useCallback(
    (value: string) => {
      setEndTime(value);

      const result = getRangeResult(
        {
          from: startDate,
          fromTime: startTime,
          to: endDate,
          toTime: value,
        },
        config.timeFormat,
      );

      onRangeChange?.(result);
    },
    [
      config.timeFormat,
      endDate,
      onRangeChange,
      setEndTime,
      startDate,
      startTime,
    ],
  );

  const onSingleTimeChange = useCallback(
    (value: string) => {
      setSingleTime(value);

      const result = getSingleResult(
        {
          date: singleDate,
          time: value,
        },
        config.timeFormat,
      );

      onSingleChange?.(result);
    },
    [config.timeFormat, onSingleChange, setSingleTime, singleDate],
  );

  const onStartDateChange = useCallback(
    (value: Date) => {
      updateStartDate(value);
      setDate(value);
    },
    [setDate, updateStartDate],
  );

  const onEndDateChange = useCallback(
    (value: Date) => {
      updateEndDate(value);
      setDate(value);
    },
    [setDate, updateEndDate],
  );

  const onSingleDateChange = useCallback(
    (value: Date) => {
      handleSetSingleDate(value);
      setDate(value);
    },
    [handleSetSingleDate, setDate],
  );

  const setActiveRangeInput = useCallback(
    (value: DateRangeInput) => {
      setactiveRangeInput(value);
    },
    [setactiveRangeInput],
  );

  const value = useMemo(
    () => ({
      activeRangeInput,
      config,
      date,
      endDate,
      endTime,
      singleDate,
      singleTime,
      startDate,
      startTime,
      inputErrors,
      calendarInputs,
      setActiveRangeInput,
      toNextMonth,
      toPrevMonth,
      onCalendarClear,
      onCalendarDaySelect,
      setactiveRangeInput,
      onStartTimeChange,
      onEndTimeChange,
      onSingleTimeChange,
      onStartDateChange,
      onEndDateChange,
      onSingleDateChange,
    }),
    [
      activeRangeInput,
      config,
      date,
      endDate,
      endTime,
      singleDate,
      singleTime,
      startDate,
      startTime,
      inputErrors,
      calendarInputs,
      setActiveRangeInput,
      toNextMonth,
      toPrevMonth,
      onCalendarClear,
      onCalendarDaySelect,
      setactiveRangeInput,
      onStartTimeChange,
      onEndTimeChange,
      onSingleTimeChange,
      onStartDateChange,
      onEndDateChange,
      onSingleDateChange,
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
