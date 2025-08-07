"use client";

import { eachDayOfInterval, endOfYear, isToday, startOfYear } from "date-fns";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CalendarContext {
  days: Date[];
  dayIndex: number;
  setDayIndex: Dispatch<SetStateAction<number>>;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
}

const CalendarContext = createContext({} as CalendarContext);

function CalendarProvider({ children }: PropsWithChildren) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const startOfCurrentYear = startOfYear(selectedDate!);
  const endOfCurrentYear = endOfYear(selectedDate!);
  const days = eachDayOfInterval({
    start: startOfCurrentYear,
    end: endOfCurrentYear,
  });

  const [dayIndex, setDayIndex] = useState(
    days.findIndex((day) => isToday(day))
  );

  return (
    <CalendarContext.Provider
      value={{ days, dayIndex, setDayIndex, selectedDate, setSelectedDate }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

function useCalendarContext() {
  const context = useContext(CalendarContext);

  if (!context || context === undefined)
    throw new Error("CalendarContext is used outside of CalendarProvider");

  return context;
}

export { CalendarProvider, useCalendarContext };
