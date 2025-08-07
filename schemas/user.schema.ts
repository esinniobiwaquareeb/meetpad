import { z } from "zod";

export const UserSchema = z.object({
  firstName: z
    .string({ required_error: "Please Provide your First Name" })
    .trim(),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please Provide your Last Name" })
    .trim(),
  seatNumber: z.coerce
    .number()
    .positive({ message: "Enter a valid seat number" }),
  date: z.string({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
});
