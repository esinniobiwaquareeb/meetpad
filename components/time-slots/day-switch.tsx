import { Switch } from "@/components/ui/switch";
import { useTimeSlot } from "./time-slot-picker";

export default function DaySwitch({
  day,
}: {
  day: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
}) {
  const { isOffDay, dispatch } = useTimeSlot();
  return (
    <Switch
      checked={!isOffDay(day)}
      onMouseEnter={(event) => event.stopPropagation()}
      onChange={(event) => event.stopPropagation()}
      onCheckedChange={(event) => {
        dispatch({ type: "toggle/offDay", payload: day });
      }}
    />
  );
}
