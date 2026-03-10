import clsx from "clsx";
import s from "../styles/shared.module.css";
import { format } from "date-fns";
import { useCallback, useEffect, useRef } from "react";

import { useCalendarContext } from "../../context/useCalendarContext";
import type { DateInputKey, TimeFormat } from "../../types";
import {
  fixTimeString,
  normalizeTo24H,
  parseFlexibleTime,
} from "../utils/date-input-utils";

type DatePickerInputTimeProps = {
  value: string;
  name: string;
  inputKey: DateInputKey;
  timeFormat: TimeFormat;
  onSelect?: () => void;
  onChange?: (value: string) => void;
};

export const DatePickerInputTime = ({
  inputKey,
  value,
  timeFormat,
  name,
  onSelect,
  onChange,
}: DatePickerInputTimeProps) => {
  const { calendarInputs, inputErrors } = useCalendarContext();

  const isEditingRef = useRef(false);

  const timeField = calendarInputs.getTimeField(inputKey);

  const setTimeFieldValue = useCallback(
    (value: string) => {
      calendarInputs.updateTimeField(inputKey, value);
    },
    [calendarInputs, inputKey],
  );

  const setTimeError = useCallback(
    (error: string) => {
      inputErrors.updateTimeError(inputKey, error);
    },
    [inputErrors, inputKey],
  );

  const clearTimeError = useCallback(() => {
    inputErrors.clearTimeError(inputKey);
  }, [inputErrors, inputKey]);

  const getTimeError = useCallback(() => {
    return inputErrors.getTimeError(inputKey);
  }, [inputErrors, inputKey]);

  useEffect(() => {
    if (timeField !== value && !isEditingRef.current && !getTimeError()) {
      setTimeFieldValue(value);
    }
  }, [value, setTimeFieldValue, timeField, getTimeError]);

  const validateAndUpdateTime = (newValue: string) => {
    if (newValue === "") {
      setTimeFieldValue(value);
      clearTimeError();

      return;
    }

    const fixedTimeString = fixTimeString(newValue);
    const parsetDateTime =
      timeFormat === "12h"
        ? parseFlexibleTime(fixedTimeString)
        : parseFlexibleTime(normalizeTo24H(fixedTimeString));

    if (parsetDateTime) {
      const formatStr = timeFormat === "12h" ? "h:mm a" : "H:mm";
      const formatedDateTime = format(parsetDateTime, formatStr);
      setTimeFieldValue(formatedDateTime);
      onChange?.(formatedDateTime);
      clearTimeError();
    } else {
      setTimeError("Invalid time");
    }
  };

  const handleFocus = () => {
    isEditingRef.current = true;
    onSelect?.();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    isEditingRef.current = false;
    if (value !== event.currentTarget.value) {
      validateAndUpdateTime(event.currentTarget.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      validateAndUpdateTime(event.currentTarget.value);
    } else if (event.key === "Escape") {
      setTimeFieldValue(value);
      clearTimeError();
      event.currentTarget.blur();
    }
  };

  const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFieldValue(value.target.value);
  };

  return (
    <input
      className={clsx(s.datepicker_input, getTimeError() && s.has_error)}
      type="text"
      autoComplete="off"
      name={name}
      value={timeField}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
};
