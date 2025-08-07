"use client";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { formatISODate } from "@/lib/utils";

export default function BookingCalender() {
  const [date, setDate] = useState<Date>();

  return (
    <>
      <Calendar selected={date} onSelect={setDate} mode="single" initialFocus />
      <input
        type="text"
        name="date"
        defaultValue={date ? formatISODate(date) : undefined}
        hidden
      />
    </>
  );
}
