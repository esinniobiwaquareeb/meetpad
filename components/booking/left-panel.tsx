import { CalendarCheck, Clock, Timer } from "lucide-react";
import { P } from "../ui/typography";
import { convert24HourTo12Hour } from "@/lib/utils";
import { useBookingState } from "../consult/booking-context";
import ExpertPhoto from "../consult/expert-photo";
import MeetingTypesList from "../consult/meeting-types-list";

export function LeftPanel() {
  const { selectedService, selectedDate, selectedTime } = useBookingState();
  return (
    <div className="border-r pr-6">
      <div className="w-fit mb-4">
        <ExpertPhoto />
      </div>

      <P size="md" className="text-gray-800">
        {selectedService.title}
      </P>

      <div className="my-2 grid gap-3 grid-cols-2 md:grid-cols-1">
        <div className="flex items-center gap-3 text-gray-800 col-span-2 md:col-span-1">
          <span className="h-8 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
            <CalendarCheck className="size-5" />
          </span>
          <P size="sm">{new Date(selectedDate).toDateString()}</P>
        </div>

        <div className="flex items-center gap-2 text-gray-800">
          <span className="h-8 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
            <Clock className="size-5" />
          </span>
          <P size="sm">
            {selectedTime ? convert24HourTo12Hour(selectedTime) : ""}
          </P>
        </div>

        <div className="flex items-center gap-2 text-gray-800">
          <span className="h-8 bg-blue-50 dark:bg-muted text-primary aspect-square rounded-md flex items-center justify-center">
            <Timer className="size-5" />
          </span>
          <P size="sm">{selectedService.duration} mins</P>
        </div>
        <MeetingTypesList meeting_types={selectedService.meeting_types} />
      </div>
    </div>
  );
}
