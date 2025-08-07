"use client";

import FormInput from "../form/form-input";
import { ServiceSchemaType } from "@/schemas/service.schema";
import FormTextarea from "../form/form-textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useServiceForm } from "./use-service-form";
import { useEffect, useState } from "react";

import { useCurrentUser } from "@/contexts/user-context";
import FormMultipleCheckbox from "../form/form-options";
import VerifyBanner from "../common/verify-banner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  data?: ServiceSchemaType;
  id?: string;
  closeForm?: () => void;
};

export default function FormService({ data, id, closeForm }: Props) {
  const user = useCurrentUser();
  const { form, control, isSubmitting, submitHandler, register } =
    useServiceForm({
      data,
      serviceId: id!,
      onSubmitted: closeForm,
    });

  const [isFree, setIsFree] = useState(form.getValues("price") ? false : true);

  const handleCheck = () => setIsFree((free) => !free);

  useEffect(() => {
    if (isFree) form.setValue("price", 0);
    else form.resetField("price");
  }, [isFree, form]);

  return (
    <Form {...form}>
      <form onSubmit={submitHandler} className="grid gap-6 mb-14">
        <FormInput
          name="title"
          placeholder="IT Consultation"
          control={control}
          label="Title *"
        />
        <FormTextarea
          name="description"
          control={control}
          label="Description *"
          placeholder="E.g, Hourly IT consultaion, furing which we will discuss your duetary preferences and goals to achive to create a menu perfectly suited to your needs"
        />

        <FormInput
          type="number"
          name="duration"
          control={control}
          label="Duration (minutes) *"
          placeholder="duration in minutes"
        />

        {/* <FormDatePicker name="date" control={control} /> */}

        <FormMultipleCheckbox
          control={control}
          name="meeting_types"
          label="Meeting type"
        />

        <div>
          <FormInput
            name="price"
            type="number"
            disabled={isFree || !user.stripe_verified}
            control={control}
            label="Price ( $ ) *"
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

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            type="date"
            name="startDate"
            control={control}
            label="Start Date *"
          />
          <FormInput
            type="date"
            name="endDate"
            control={control}
            label="End Date *"
          />
        </div>

        <div>
          <Label htmlFor="service_image">Service Image </Label>
          <Input
            {...register("files")}
            name="files"
            type="file"
            placeholder=""
            title="upload image"
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
    </Form>
  );
}
