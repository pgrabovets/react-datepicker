import s from "../styles/shared.module.css";
import clsx from "clsx";
import { useCalendarContext } from "../../context/useCalendarContext";
import { InputRangeEnd } from "./input-range-end";
import { InputRangeStart } from "./input-range-start";

export const InputRange = () => {
  const { config } = useCalendarContext();

  if (config.hasTime) {
    return (
      <div className={s.input_range_grid}>
        <InputRangeStart />
        <InputRangeEnd />
      </div>
    );
  }

  return (
    <div className={clsx(s.input_range_grid, s.input_range_grid_cols_2)}>
      <InputRangeStart />
      <InputRangeEnd />
    </div>
  );
};
