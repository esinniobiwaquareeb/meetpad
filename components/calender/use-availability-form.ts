import {
  AvailabilitySchema,
  AvailabilitySchemaType,
} from "@/schemas/availability.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type args = {
  onSubmitted?: () => void;
  data: AvailabilitySchemaType;
};

export function useAvailabilityForm({ data, onSubmitted }: args) {
  const form = useForm<AvailabilitySchemaType>({
    defaultValues: data,
    resolver: zodResolver(AvailabilitySchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: AvailabilitySchemaType) => {
    onSubmitted?.();
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const submitHandler = form.handleSubmit(onSubmit, onError);

  return {
    form,
    submitHandler,
    isSubmitting,
  };
}
