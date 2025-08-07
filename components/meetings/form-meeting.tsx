"use client";

import { meetingSchema } from "@/schemas/meeting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import FormInput from "../form/form-input";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/contexts/user-context";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import VerifyBanner from "../common/verify-banner";
import { toast } from "sonner";
import { generateRandomString } from "@/lib/utils";
import { createQuickMeeting } from "@/server/meeting.actions";
import { convert24HourTo12Hour } from "./columns";

type Props = {
  closeForm: () => void;
};

export default function FormMeeting({ closeForm }: Props) {
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
  });

  const { handleSubmit, control, formState } = form;

  const { isSubmitting } = formState;

  const onSubmit = async (formData: z.infer<typeof meetingSchema>) => {
    toast.loading("Creating meeting...", { id: 1 });
    const { firstName, lastName, time, duration, date, email } = formData;
    const data = {
      meeting: {
        service: "30", // To prevent supabase form throwing error
        time: convert24HourTo12Hour(time),
        duration,
        status: "confirmed",
        date,
        link: generateRandomString(),
        userId: user.id,
      },
      guest: {
        email,
        fullName: firstName + " " + lastName,
        userId: user.id,
      },
      user,
    };

    await createQuickMeeting(data);
    closeForm?.();
    toast.success("Meeting successfully created!", { id: 1 });
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const [isFree, setIsFree] = useState(form.getValues("price") ? false : true);

  const handleCheck = () => setIsFree((free) => !free);

  useEffect(() => {
    if (isFree) form.setValue("price", 0);
    else form.resetField("price");
  }, [isFree, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid gap-6 mb-16"
      >
        <FormInput
          control={control}
          name="email"
          label="Who are you meeting with?"
          placeholder="email"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            control={control}
            name="firstName"
            label="First Name (optional)"
          />
          <FormInput
            control={control}
            name="lastName"
            label="Last Name (optional)"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormInput
            control={control}
            name="date"
            label="Select a date"
            type="date"
          />

          <FormInput
            control={control}
            type="time"
            name="time"
            label="Select a time"
          />
        </div>

        <FormInput
          control={control}
          type="number"
          name="duration"
          max={120}
          min={10}
          label={
            <span className="flex items-center justify-between text-sm">
              <span>How long will the meeting last?</span>
              <span>Max (120 minutes)</span>
            </span>
          }

          // label="How long will the meeting last? (minutes)"
        />

        <div>
          <FormInput
            name="price"
            type="number"
            disabled={isFree || !user.stripe_verified}
            control={control}
            label="Price ( $ )"
          />
          <div className="flex gap-2 items-center mt-2 mb-3">
            <Checkbox
              id="terms"
              disabled={!user.stripe_verified}
              checked={isFree}
              onCheckedChange={handleCheck}
            />
            <span className="text-sm text-gray-700">
              This type of service is free
            </span>
          </div>

          {!user.stripe_verified && <VerifyBanner />}
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
