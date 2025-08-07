"use client";

import { differenceInCalendarDays, startOfYear } from "date-fns";

import { useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { useCalendarContext } from "./calender-provider";

export default function DashboardCalendar() {
  const { selectedDate, setSelectedDate, setDayIndex } = useCalendarContext();

  useEffect(() => {
    setDayIndex(
      differenceInCalendarDays(selectedDate!, startOfYear(selectedDate!))
    );
  }, [selectedDate, setDayIndex]);

  return (
    <Calendar
      mode="single"
      defaultMonth={selectedDate}
      selected={selectedDate}
      onSelect={setSelectedDate}
    />
  );
}
