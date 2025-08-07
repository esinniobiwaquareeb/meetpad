"use client";

import ServiceActionMenu from "./service-action-menu";
import { Heading } from "../ui/Heading";
import { P } from "../ui/typography";
import ButtonCopy from "../common/button-copy";
import { Timer } from "lucide-react";
import { useServices } from "./services-context";
import ServiceCheckbox from "./service-checkbox";
import ButtonSetAvailability from "../calender/btn-set-availability";
import { AvailabilityProvider } from "../calender/availability-context";
import { useCurrentUser } from "@/contexts/user-context";
import MeetingTypesList from "../meetings/meeting-types-list";

type Props = {
  serviceId: string;
  color?: string;
};

export default function Service({ serviceId, color }: Props) {
  const { username } = useCurrentUser();

  const { getService } = useServices();
  const { id, title, description, duration, availability, meeting_types } =
    getService(serviceId);

  const serviceUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/u/${username}?service=${id}`
      : `https://meetpad.app/u/${username}?service=${id}`;

  return (
    <div
      className={`p-3 border border-gray-200 rounded-sm relative overflow-hidden shadow cursor-pointer`}
    >
      <div
        style={{ backgroundColor: color || "green" }}
        className="absolute w-full h-1 top-0 left-0"
      ></div>
      <div className="flex items-center justify-between">
        <ServiceCheckbox serviceId={id} />
        <ServiceActionMenu serviceId={id} serviceUrl={serviceUrl} />
      </div>
      <div className="mb-3">
        <Heading type="h5">{title}</Heading>
        <div className="flex gap-2 flex-col">
          <div className="flex items-center gap-2 text-gray-800">
            <span className="h-6 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
              <Timer className="size-5" />
            </span>
            <P size="sm">{duration} minutes</P>
          </div>

          <MeetingTypesList meeting_types={meeting_types} />
        </div>
      </div>
      <P size="sm" className="font-normal min-h-[80px]">
        {description}
      </P>
      <div className="border-t mt-4">
        <div className="flex items-center justify-between mt-4 gap-6">
          <ButtonCopy size="sm" className="font-normal" textToCopy={serviceUrl}>
            Copy link
          </ButtonCopy>

          <AvailabilityProvider availaibility={availability} serviceId={id}>
            <ButtonSetAvailability
              variant="outline"
              className="bg-muted"
              text="Availability"
              size="sm"
            />
          </AvailabilityProvider>
        </div>
      </div>
    </div>
  );
}
