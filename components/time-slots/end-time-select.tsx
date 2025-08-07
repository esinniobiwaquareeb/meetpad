"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimeSlot } from "./time-slot-picker";
import { useEffect, useState } from "react";

export function EndTimeSelect({
  index,
  day,
}: {
  index: number;
  day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
}) {
  const { weekDays, dispatch, timeFormat } = useTimeSlot();

  const [values, setValues] = useState(weekDays[day][index].endSlots);

  useEffect(() => {
    setValues(weekDays[day][index].endSlots);
  }, [weekDays, day, index]);

  return (
    <Select
      value={weekDays[day][index].endTime}
      onValueChange={(value) => {
        dispatch({
          type: "set/endTime",
          payload: { endTime: value, index, day },
        });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="select">
          {timeFormat === "12"
            ? tConvert(weekDays[day][index].endTime)
            : weekDays[day][index].endTime}
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
  if (parseInt(timeString) === 24) return "12:00 PM";
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
