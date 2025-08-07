import { BookingCalendar } from "../booking/booking-calender";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";
import { DateValue } from "@react-aria/calendar";
import { convertTo24Hour } from "@/lib/utils";
import { BookingTime } from "../booking/bookingTime";
import { LeftPanel } from "../booking/left-panel";
import { transformAvailability } from "@/schemas/availability.schema";
import { useBookingState } from "./booking-context";

export default function AvailabilityScreen() {
  const { selectedService, selectedDay, dispatch, selectedDate } =
    useBookingState();

  const timeSlot = transformAvailability(selectedService.availability)[
    selectedDay as "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"
  ];
  const [date, setDate] = useState(today(getLocalTimeZone()));

  // const [year, month, day] = selectedDate.split("-").map(Number);
  const currentDay = new Date();
  const [year, month, day] = [
    currentDay.getFullYear(),
    currentDay.getMonth() + 1,
    currentDay.getDay(),
  ];
  const defaultValue = new CalendarDate(year, month, day);

  const [startYear, startMonth, startDay] = selectedService.startDate
    .split("-")
    .map(Number);
  const minValue = new CalendarDate(startYear, startMonth, startDay);

  const [endYear, endMonth, endDay] = selectedService.endDate
    .split("-")
    .map(Number);
  const maxValue = new CalendarDate(endYear, endMonth, endDay);

  const handleChangeDate = (date: DateValue) => {
    const day = getDayByIndex(new Date(date.toString()).getDay());
    setDate(date as unknown as CalendarDate);
    dispatch({ type: "set/date", payload: date.toString() });
    dispatch({ type: "set/day", payload: day });
    dispatch({
      type: "set/time",
      payload: selectedService.availability[day][0].split("-")[0],
    });
  };

  const handleChangeAvailableTime = (time: string) => {
    dispatch({
      type: "set/time",
      payload: time.includes("m") ? convertTo24Hour(time) : time,
    });
  };

  return (
    <div className="grid md:grid-cols-[230px_1fr_auto] grid-cols-1 gap-6 md:gap-3">
      <LeftPanel />
      <BookingCalendar
        defaultValue={defaultValue as unknown as DateValue}
        minValue={minValue as unknown as DateValue}
        maxValue={maxValue as unknown as DateValue}
        value={date as unknown as DateValue}
        onChange={handleChangeDate}
      />
      <BookingTime
        timeSlot={timeSlot}
        duration={selectedService.duration}
        handleChangeAvailableTime={handleChangeAvailableTime}
      />
    </div>
  );
}

const getDayByIndex = (
  index: number
): "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" => {
  return new Map()
    .set(0, "sun")
    .set(1, "mon")
    .set(2, "tue")
    .set(3, "wed")
    .set(4, "thu")
    .set(5, "fri")
    .set(6, "sat")
    .get(index);
};
