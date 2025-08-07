import { Button } from "../ui/button";
import { useAvailability } from "./availability-context";
import { reverseTransformAvailability } from "@/schemas/availability.schema";
import { toast } from "sonner";
import { updateAvailability } from "@/server/service.actions";
import { TimeSlotPicker } from "../time-slots/time-slot-picker";
import { FormEvent, useState } from "react";
import { useServices } from "../services/services-context";

type weekdays = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const days: weekdays[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

type Props = {
  closeForm?: () => void;
};

export default function FormAvailability({ closeForm }: Props) {
  const { availaibility, serviceId } = useAvailability();
  const { getService } = useServices();
  const { duration } = getService(serviceId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(availaibility);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    toast.loading("Updating Availability...", { id: 1 });

    await updateAvailability(serviceId, reverseTransformAvailability(data));

    toast.success("Availability successfully updated!", { id: 1 });
    setIsSubmitting(false);

    closeForm?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-14 mx-auto">
        <TimeSlotPicker
          duration={duration}
          data={availaibility}
          onChange={setData}
        />
      </div>
      <div className="flex justify-end gap-3 fixed bottom-0 right-0 w-full md:w-[580px] border-t bg-gray-75 dark:bg-gray-50 p-3">
        <Button size="sm" variant="outline" type="reset" onClick={closeForm}>
          Cancel
        </Button>
        <Button size="sm" type="submit">
          {isSubmitting ? "saving" : "save"}
        </Button>
      </div>
    </form>
  );
}
