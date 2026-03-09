import s from "../styles/shared.module.css";
import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";

import { useCalendarContext } from "../../context/useCalendarContext";
import type { DateSlotKey } from "../../types";
import { getSlotValue } from "../../utils";
import { isValidDate, parseFlexibleDate } from "../utils/date-input-utils";

type DatePickerInputDateProps = {
  value: string;
  name: string;
  placeholder: string;
  slotId: DateSlotKey;
  onSelect?: () => void;
  onChange?: (value: Date) => void;
};

export const DatePickerInputDate = ({
  slotId,
  value,
  placeholder,
  name,
  onSelect,
  onChange,
}: DatePickerInputDateProps) => {
  const { slotFields, slotErrors } = useCalendarContext();
  const dateField = slotFields.getDateField(slotId);
  const isEditingRef = useRef(false);

  const setDateFieldValue = useCallback(
    (value: string) => {
      slotFields.updateDateField(slotId, value);
    },
    [slotFields, slotId],
  );

  const setDateError = useCallback(
    (error: string) => {
      slotErrors.updateDateError(slotId, error);
    },
    [slotErrors, slotId],
  );

  const getDateError = useCallback(() => {
    return slotErrors.getDateError(slotId);
  }, [slotErrors, slotId]);

  const clearDateError = useCallback(() => {
    slotErrors.clearDateError(slotId);
  }, [slotErrors, slotId]);

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
    slotErrors,
    slotId,
  ]);

  const validateAndUpdateDate = (newValue: string) => {
    if (newValue === "") {
      setDateFieldValue(value);
      clearDateError();

      return;
    }

    const parsedDate = parseFlexibleDate(newValue);

    if (parsedDate && isValidDate(parsedDate)) {
      setDateFieldValue(getSlotValue(parsedDate));
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
