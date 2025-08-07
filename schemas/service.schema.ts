import { isBefore } from "date-fns";
import { z } from "zod";

export const ServiceSchema = z
  .object({
    // id: z.string().optional(),
    title: z.string().trim().min(1, "Please provide a Title"),
    description: z.string().trim().min(1, "Please provide a description"),
    duration: z.coerce
      .number()
      .positive({ message: `Duration can't be negative` }),
    price: z.coerce.number({ message: "Enter a valid price" }).min(0),
    startDate: z.string({ message: "required" }),
    endDate: z.string({ message: "required" }),
    meeting_types: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one meeting type.",
      }),
    files: z.instanceof(FileList).optional(),
  })
  .refine(
    (schema) => isBefore(new Date(schema.startDate), new Date(schema.endDate)),
    {
      path: ["endDate"], // points to the field causing the error
      message: "End date must be greater than or equal to the start date",
    }
  );

export type ServiceSchemaType = z.infer<typeof ServiceSchema>;
