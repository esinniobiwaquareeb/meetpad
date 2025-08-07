"use client";

import { P } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTimeSlot } from "./time-slot-picker";
import { StartTimeSelect } from "./start-time-select";
import { EndTimeSelect } from "./end-time-select";
import { Button } from "@/components/ui/button";
import DaySwitch from "./day-switch";
import { Plus, Trash2 } from "lucide-react";
import { FormatToggle } from "./format-toggle";

type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const WEEK_DAYs: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export function TimeSlots() {
  const { isOffDay } = useTimeSlot();
  return (
    <Accordion
      type="multiple"
      className="lg:max-w-[36rem] bg-gray-50 p-3 grid gap-3"
      onToggle={(event) => event.stopPropagation()}
    >
      <FormatToggle />
      {WEEK_DAYs.map((day) => {
        return (
          <AccordionItem
            key={day}
            value={day}
            className="border p-3 rounded-md"
          >
            <AccordionTrigger className="p-0 border-b-0 hover:no-underline">
              <div className="flex items-center gap-3">
                <DaySwitch day={day} />
                <P size="sm">{getFullDayText(day)}</P>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <MultipleTimeSlot day={day} />
              {isOffDay(day) && (
                <P
                  size="sm"
                  className="italic text-gray-300 font-normal text-center"
                >
                  Unavailable
                </P>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function AddSlot({
  index,
  day,
}: {
  index: number;
  day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
}) {
  const { dispatch } = useTimeSlot();
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => dispatch({ type: "add/slot", payload: { day, index } })}
    >
      <Plus size={20} />
    </Button>
  );
}

function DeleteSlot({
  index,
  day,
}: {
  index: number;
  day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
}) {
  const { dispatch } = useTimeSlot();
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => dispatch({ type: "delete/slot", payload: { day, index } })}
    >
      <Trash2 size={20} />
    </Button>
  );
}

function MultipleTimeSlot({
  day,
}: {
  day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
}) {
  const { weekDays, canAddSlot } = useTimeSlot();

  return (
    <div className="grid gap-4">
      {weekDays[day].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <StartTimeSelect index={i} day={day} />
          <P>to</P>
          <EndTimeSelect index={i} day={day} />
          {weekDays[day].length - 1 === i && canAddSlot(day) && (
            <AddSlot index={i} day={day} />
          )}
          <DeleteSlot index={i} day={day} />
        </div>
      ))}
    </div>
  );
}

const getFullDayText = (day: Day) => {
  return new Map()
    .set("sun", "Sunday")
    .set("mon", "Monday")
    .set("tue", "Tuesday")
    .set("wed", "Wednessday")
    .set("thu", "Thursday")
    .set("fri", "Friday")
    .set("sat", "Saturday")
    .get(day);
};
