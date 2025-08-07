"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useTimeSlot } from "./time-slot-picker";
import { useEffect, useState } from "react";

export function StartTimeSelect({
  index,
  day,
}: {
  index: number;
  day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
}) {
  const { dispatch, weekDays, timeFormat } = useTimeSlot();

  const [values, setValues] = useState(weekDays[day][index].startSlots);

  useEffect(() => {
    setValues(weekDays[day][index].startSlots);
  }, [weekDays, index, day]);

  return (
    <Select
      value={weekDays[day][index].startTime}
      onValueChange={(value) => {
        dispatch({
          type: "set/startTime",
          payload: { startTime: value, index, day },
        });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="select">
          {timeFormat === "12"
            ? tConvert(weekDays[day][index].startTime)
            : weekDays[day][index].startTime}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {timeFormat === "12" ? tConvert(slot) : slot}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function tConvert(timeString: string) {
  return new Date("1970-01-01T" + timeString + "Z").toLocaleTimeString(
    "en-US",
    {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    }
  );
}
