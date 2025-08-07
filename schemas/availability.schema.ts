import { z } from "zod";

export const AvailabilitySchema = z.object({
  mon: z.array(z.string()),
  tue: z.array(z.string()),
  wed: z.array(z.string()),
  thu: z.array(z.string()),
  fri: z.array(z.string()),
  sat: z.array(z.string()),
  sun: z.array(z.string()),
});

export type AvailabilitySchemaType = z.infer<typeof AvailabilitySchema>;

export function transformAvailability(
  availability: Availability
): AvailabilityObj {
  const transformed: AvailabilityObj = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  for (const [day, timeRanges] of Object.entries(availability)) {
    transformed[day as keyof AvailabilityObj] = timeRanges.map(
      (timeRange: string) => {
        const [startTime, endTime] = timeRange.split("-");
        return { startTime, endTime };
      }
    );
  }

  return transformed;
}

export function reverseTransformAvailability(
  availability: AvailabilityObj
): Availability {
  const reversed: Availability = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  for (const [day, timeRanges] of Object.entries(availability)) {
    reversed[day as keyof Availability] = timeRanges.map(
      (timeRange: { startTime: string; endTime: string }) => {
        return `${timeRange.startTime}-${timeRange.endTime}`;
      }
    );
  }

  return reversed;
}
