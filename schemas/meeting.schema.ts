import { z } from "zod";

export const meetingSchema = z.object({
  email: z.string().email("Please provide an email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  date: z.string(),
  time: z.string(),
  duration: z.coerce.number().min(10).max(120),
  price: z.coerce.number(),
});

export const editMeetingSchema = z.object({
  date: z.string(),
  time: z.string(),
  duration: z.number(),
});
