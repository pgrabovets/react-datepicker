import s from "./styles.module.css";

type DatePickerCardProps = {
  children: React.ReactNode;
};

export const DatePickerCard = ({ children }: DatePickerCardProps) => {
  return <div className={s.datepicker_card}>{children}</div>;
};
