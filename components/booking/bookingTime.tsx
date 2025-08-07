import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DateValue } from "@react-aria/calendar";
import { generateTimeSlots } from "@/lib/utils";
import { P } from "../ui/typography";
import { useBookingState } from "../consult/booking-context";

type Props = {
  date?: DateValue;
  timeZone?: string;
  weeksInMonth?: number;
  handleChangeAvailableTime: (time: string) => void;
  duration: number;
  timeSlot: { startTime: string; endTime: string }[];
};

export function BookingTime({
  handleChangeAvailableTime,
  timeSlot,
  duration,
}: Props) {
  const availableTimes = timeSlot
    .map((x) => generateTimeSlots(x.startTime, x.endTime, duration))
    .flat();

  const { selectedTime } = useBookingState();
  const morningSlots = getMorningSlots(availableTimes);
  const noonSlots = getNoonSlots(availableTimes);

  return (
    <Tabs defaultValue="12" className="flex flex-col gap-4 border-l pl-6">
      <div className="flex flex-col items-center gap-2">
        <P size="sm">Select a Meeting time</P>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="12">12h</TabsTrigger>
          <TabsTrigger value="24">24h</TabsTrigger>
        </TabsList>
      </div>
      {["12", "24"].map((time) => (
        <TabsContent key={time} value={time}>
          <ScrollArea
            type="always"
            className="h-full"
            style={{ maxHeight: "320px" }}
            // style={{
            //   maxHeight: weeksInMonth > 5 ? "380px" : "320px",
            // }}
          >
            <div className="grid gap-2 pr-3">
              <span className="grid grid-cols-[1fr_auto_1fr] gap-1 items-center h-8 px-1">
                <span className="h-[0.8px] bg-gray-400"></span>
                <span className="text-gray-700 text-sm">Morning</span>
                <span className="h-[0.8px] bg-gray-400"></span>
              </span>
              {morningSlots.map((availableTime, index) => (
                <Button
                  variant="ghost"
                  className={`hover:bg-blue-50 dark:hover:bg-muted text-primary hover:text-primary border border-primary ${
                    availableTime[(time as "12") && "24"] === selectedTime
                      ? "bg-primary text-white hover:bg-primary hover:text-white"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeAvailableTime(
                      availableTime[time as "12" | "24"]
                    )
                  }
                  // key={availableTime[time as "12" | "24"]}
                  key={index}
                >
                  {availableTime[time as "12" | "24"]}
                </Button>
              ))}
              <span className="grid grid-cols-[1fr_auto_1fr] gap-1 items-center h-8 px-1">
                <span className="h-[0.8px] bg-gray-400"></span>
                <span className="text-gray-700 text-sm">Noon</span>
                <span className="h-[0.8px] bg-gray-400"></span>
              </span>
              {noonSlots.map((availableTime, index) => (
                <Button
                  variant="ghost"
                  className={`hover:bg-blue-50 dark:hover:bg-muted text-primary hover:text-primary border border-primary ${
                    availableTime[(time as "12") && "24"] === selectedTime
                      ? "bg-primary text-white hover:bg-primary hover:text-white"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeAvailableTime(
                      availableTime[time as "12" | "24"]
                    )
                  }
                  // key={availableTime[time as "12" | "24"]}
                  key={index}
                >
                  {availableTime[time as "12" | "24"]}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}

type TimeSlot = {
  12: string;
  24: string;
};

function getMorningSlots(timeSlots: TimeSlot[]) {
  const slots = [];

  for (let i = 0; i < timeSlots.length; ++i) {
    const time = parseInt(timeSlots[i][24]);
    if (time > 12) break;
    slots.push(timeSlots[i]);
  }

  return slots;
}

function getNoonSlots(timeSlots: TimeSlot[]) {
  const slots = [];

  for (let i = 0; i < timeSlots.length; ++i) {
    const time = parseInt(timeSlots[i][24]);
    if (time > 12) slots.push(timeSlots[i]);
  }

  return slots;
}
