import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTimeSlot } from "./time-slot-picker";

export function FormatToggle() {
  const { timeFormat, dispatch } = useTimeSlot();
  return (
    <Tabs className="flex justify-end" value={timeFormat}>
      <TabsList className="grid w-fit grid-cols-2">
        <TabsTrigger
          value="12"
          onClick={() => dispatch({ type: "set/time-format", payload: "12" })}
        >
          12h
        </TabsTrigger>
        <TabsTrigger
          value="24"
          onClick={() => dispatch({ type: "set/time-format", payload: "24" })}
        >
          24h
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
