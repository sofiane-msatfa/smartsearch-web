import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDates<T>(obj: T): T {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] instanceof Date) {
      // @ts-expect-error flemme
      newObj[key] = format(newObj[key], "yyyy-MM-dd");
    }
  }
  return newObj;
}
