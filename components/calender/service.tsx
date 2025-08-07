"use client";

import { Heading } from "../ui/Heading";
import { P } from "../ui/typography";
import { AvailabilityProvider } from "./availability-context";
import ButtonSetAvailability from "./btn-set-availability";
import { convert24HourTo12Hour } from "@/lib/utils";
import { Calendar } from "lucide-react";

type Service = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  userId: string;
  duration: number;
  meeting_types: MeetingType[];
  availability: Availability;
};

type Props = {
  service: Service;
};

const daysMap = new Map()
  .set("sun", "Sunday")
  .set("mon", "Monday")
  .set("tue", "Tuesday")
  .set("wed", "Wednessday")
  .set("thu", "Thursday")
  .set("fri", "Friday")
  .set("sat", "Saturday");

const days: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

export function Service({ service }: Props) {
  const { id, title, description, duration, startDate, endDate, availability } =
    service;

  return (
    <AvailabilityProvider availaibility={availability} serviceId={id}>
      <div className="px-6 py-4 border flex-col md:flex-row gap-3 md:justify-between md:items-center rounded-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <Heading type="h5">{title}</Heading>
          <ButtonSetAvailability />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="h-8 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
              <Calendar className="size-5" />
            </span>
            <P size="sm" className="text-gray-800">
              Start Date - End Date
            </P>
          </div>
          <span className="itali text-sm text-gray-600">
            {new Date(startDate).toDateString()} -{" "}
            {new Date(endDate).toDateString()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {days.map((day) => (
            <ul className="" key={day}>
              <P size="sm" className="text-gray-800">
                {daysMap.get(day)}
              </P>
              {availability[day].length !== 0 ? (
                availability[day].map((a, i) => {
                  return (
                    <li className="italic text-sm text-gray-600" key={i}>
                      {a
                        ? a
                            .split("-")
                            .map((a) => [convert24HourTo12Hour(a)])
                            .join(" - ")
                        : "Unavailable"}
                    </li>
                  );
                })
              ) : (
                <li className="italic text-sm text-gray-600">Unavailable</li>
              )}
            </ul>
          ))}
        </div>
      </div>
    </AvailabilityProvider>
  );
}
