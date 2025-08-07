import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convert24HourTo12Hour, generateTimeSlots } from "@/lib/utils";
import { Label } from "../ui/label";

type Props = {
  slot: any;
  duration: number;
};

export default function TimeSlot({ slot, duration }: Props) {
  const [startTime, endTime] = slot.split("-");

  const timeIntervals = generateTimeSlots(startTime, endTime, duration);

  return (
    <div>
      <Label>
        Available from <strong>{convert24HourTo12Hour(startTime)}</strong> to{" "}
        <strong>{convert24HourTo12Hour(endTime)}</strong>
      </Label>
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available time</SelectLabel>
            {timeIntervals.map((timeInterval) => (
              <SelectItem
                key={timeInterval as unknown as React.Key}
                value={timeInterval as unknown as string}
              >
                {(timeInterval as unknown as string).toLowerCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
