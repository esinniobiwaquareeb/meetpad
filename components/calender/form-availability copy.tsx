import { Button } from "../ui/button";
import FormWeekDay from "./form-weekday";
import { useForm } from "react-hook-form";
import { useAvailability } from "./availability-context";
import { reverseTransformAvailability } from "@/schemas/availability.schema";
import { toast } from "sonner";
import { updateAvailability } from "@/server/service.actions";

type weekdays = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const days: weekdays[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

type Props = {
  closeForm?: () => void;
};

export default function FormAvailability({ closeForm }: Props) {
  const { availaibility, serviceId } = useAvailability();

  const form = useForm<AvailabilityObj>({ defaultValues: availaibility });
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = form;

  const onSubmit = async (formData: AvailabilityObj) => {
    toast.loading("Updating availability...", { id: serviceId });
    const data = reverseTransformAvailability(formData);
    await updateAvailability(serviceId, data);

    toast.success("Availability successfully updated!", { id: serviceId });
    closeForm?.();
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex flex-col gap-4 mb-14">
        {days.map((day) => (
          <FormWeekDay
            key={day}
            day={day}
            control={control}
            register={register}
            value={getValues(day)}
            reset={reset}
          />
        ))}
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
