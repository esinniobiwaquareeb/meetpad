"use client";

import { editMeetingSchema, meetingSchema } from "@/schemas/meeting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormLabel } from "../ui/form";
import { z } from "zod";
import FormInput from "../form/form-input";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/contexts/user-context";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateMeeting } from "@/server/meeting.actions";

type Props = {
  closeForm: () => void;
  meeting: Meeting;
};

type FormData = {
  date: string;
  time: string;
  reasons: string;
};

export default function FormEditMeeting({ closeForm, meeting }: Props) {
  const user = useCurrentUser();
  const form = useForm<FormData>({});

  const { handleSubmit, control, formState, register } = form;

  const { isSubmitting } = formState;

  const onSubmit = async (formData: FormData) => {
    toast.loading("Updating meeting schedule", { id: "1" });
    await updateMeeting(meeting, formData);
    closeForm?.();
    toast.success("Meeting schedule successfully updated!", { id: "1" });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid gap-6 mb-16"
      >
        <div>
          <FormLabel>Select a Date</FormLabel>
          <Input {...register("date")} type="date" />
        </div>

        <div>
          <FormLabel>Select a Time</FormLabel>
          <Input {...register("time")} type="time" />
        </div>

        <div>
          <FormLabel>Reasons for Reshedule</FormLabel>
          <Textarea {...register("reasons")} />
        </div>

        <div className="flex justify-end gap-3 fixed bottom-0 right-0 w-full md:w-[580px] border-t bg-gray-75 dark:bg-gray-50 p-3">
          <Button size="sm" variant="outline" type="reset" onClick={closeForm}>
            Cancel
          </Button>
          <Button size="sm" type="submit">
            {isSubmitting ? "scheduling" : "Schedule"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
