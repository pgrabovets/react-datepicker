import s from "../styles/shared.module.css";
import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";

import { useCalendarContext } from "../../context/useCalendarContext";
import type { DateInputKey } from "../../types";
import { formatDateToString } from "../../utils";
import { isValidDate, parseFlexibleDate } from "../utils/date-input-utils";

type DatePickerInputDateProps = {
  value: string;
  name: string;
  placeholder: string;
  inputKey: DateInputKey;
  onSelect?: () => void;
  onChange?: (value: Date) => void;
};

export const DatePickerInputDate = ({
  inputKey,
  value,
  placeholder,
  name,
  onSelect,
  onChange,
}: DatePickerInputDateProps) => {
  const { calendarInputs, inputErrors } = useCalendarContext();
  const dateField = calendarInputs.getDateField(inputKey);
  const isEditingRef = useRef(false);

  const setDateFieldValue = useCallback(
    (value: string) => {
      calendarInputs.updateDateField(inputKey, value);
    },
    [calendarInputs, inputKey],
  );

  const setDateError = useCallback(
    (error: string) => {
      inputErrors.updateDateError(inputKey, error);
    },
    [inputErrors, inputKey],
  );

  const getDateError = useCallback(() => {
    return inputErrors.getDateError(inputKey);
  }, [inputErrors, inputKey]);

  const clearDateError = useCallback(() => {
    inputErrors.clearDateError(inputKey);
  }, [inputErrors, inputKey]);

  useEffect(() => {
    if (dateField !== value && !isEditingRef.current && !getDateError()) {
      setDateFieldValue(value);
      clearDateError();
    }
  }, [
    value,
    setDateFieldValue,
    dateField,
    clearDateError,
    getDateError,
    inputErrors,
    inputKey,
  ]);

  const validateAndUpdateDate = (newValue: string) => {
    if (newValue === "") {
      setDateFieldValue(value);
      clearDateError();

      return;
    }

    const parsedDate = parseFlexibleDate(newValue);

    if (parsedDate && isValidDate(parsedDate)) {
      setDateFieldValue(formatDateToString(parsedDate));
      onChange?.(parsedDate);
      clearDateError();
    } else {
      setDateError("Invalid date");
    }
  };

  const handleFocus = () => {
    isEditingRef.current = true;
    onSelect?.();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    isEditingRef.current = false;
    if (value !== event.currentTarget.value) {
      validateAndUpdateDate(event.currentTarget.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      validateAndUpdateDate(event.currentTarget.value);
    } else if (event.key === "Escape") {
      setDateFieldValue(value);
      clearDateError();
      event.currentTarget.blur();
    }
  };

  const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setDateFieldValue(value.target.value);
  };

  return (
    <input
      className={clsx(s.datepicker_input, getDateError() && s.has_error)}
      autoComplete="off"
      type="text"
      name={name}
      value={dateField}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
