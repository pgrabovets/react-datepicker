import clsx from "clsx";
import s from "./styles.module.css";
import { useCalendarContext } from "../../context/useCalendarContext";
import type { DateSlotKey } from "../../types";
import { getDefaultTime } from "../../utils";
import { DatePickerInputDate } from "../datepicker-input-date/datepicker-input-date";
import { DatePickerInputTime } from "../datepicker-input-time/datepicker-input-time";

type DatePickerInputProps = {
  value: string;
  id: DateSlotKey;
  placeholder: string;
  time?: string;
  isActive?: boolean;
  onSelect?: (key: string) => void;
  onTimeChange?: (value: string) => void;
  onDateChange?: (value: Date) => void;
};

export const DatePickerInput = ({
  isActive = false,
  time,
  value,
  id,
  placeholder,
  onDateChange,
  onSelect,
  onTimeChange,
}: DatePickerInputProps) => {
  const { config, slotErrors } = useCalendarContext();
  const hasErrors = slotErrors.hasErrors(id);

  return (
    <div
      className={clsx(
        s.datepiker_input_container,
        isActive && s.selected,
        hasErrors && s.error,
      )}
    >
      <DatePickerInputDate
        slotId={id}
        value={value ?? ""}
        name={`${id}-slot-date-field`}
        placeholder={placeholder}
        onSelect={() => onSelect?.(id)}
        onChange={onDateChange}
      />
      {config.hasTime ? (
        <>
          <div className={s.vertical_divider}></div>
          <DatePickerInputTime
            slotId={id}
            value={time ?? getDefaultTime(config)}
            timeFormat={config.timeFormat}
            name={`${id}-slot-time-field`}
            onSelect={() => onSelect?.(id)}
            onChange={onTimeChange}
          />
        </>
      ) : null}
    </div>
  );
};
