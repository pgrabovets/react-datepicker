import { isValid, parse } from "date-fns";
import { DATE_FORMATS, TIME_FORMATS } from "../consts";

const normalizeAMPM = (input: string): string => {
  return input.replace(/\s*([AaPp])\.?([Mm])?\.?\b/g, " $1$2").trim();
};

export const parseFlexibleDate = (input: string): Date | null => {
  for (const fmt of DATE_FORMATS) {
    const parsed = parse(input.trim(), fmt, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;
};

export const fixTimeString = (input: string): string => {
  const s = normalizeAMPM(input.trim());

  const timeMatch = /(\d{1,2})(?::(\d{1,2}))?/.exec(s);
  if (!timeMatch) return "";

  const [, hRaw, mRaw = "00"] = timeMatch;
  const hour = Number(hRaw);
  const minute = Number(mRaw);

  if (hour > 12) {
    return `${hour}:${minute}`;
  }

  return s;
};

export const normalizeTo24H = (input: string): string => {
  const s = normalizeAMPM(input.trim());

  const timeMatch = /(\d{1,2})(?::(\d{1,2}))?/.exec(s);
  if (!timeMatch) return "";

  const [, hRaw, mRaw = "00"] = timeMatch;
  let hour = Number(hRaw);
  const minute = Number(mRaw);

  const hasAM = /\b[Aa]\.?[Mm]?\.?\b/.test(s);
  const hasPM = /\b[Pp]\.?[Mm]?\.?\b/.test(s);

  if (hasPM && hour < 12) hour += 12;
  if (hasAM && hour === 12) hour = 0;

  const hh = hour.toString().padStart(2, "0");
  const mm = minute.toString().padStart(2, "0");

  return `${hh}:${mm}`;
};

export const parseFlexibleTime = (input: string): Date | null => {
  const normalized = normalizeAMPM(input.trim());

  for (const fmt of TIME_FORMATS) {
    const parsed = parse(normalized, fmt, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;
};

export const isValidDate = (date: Date): boolean => isValid(date);
