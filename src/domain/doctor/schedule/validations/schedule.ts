import { z } from "zod";

//? TimePickerField emits "HH:mm:ss" while the backend expects `date_format:H:i`, so seconds are accepted and trimmed in the service
const timeValidator = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "schedules.invalidTime");

export const ScheduleValidator = z
  .object({
    day_of_week: z.number().int().min(0).max(6),
    start_time: timeValidator,
    end_time: timeValidator,
    slot_duration_minutes: z.number().int().min(5).max(240).nullable()
  })
  .refine((values) => values.end_time > values.start_time, {
    message: "schedules.endAfterStart",
    path: ["end_time"]
  });

export type ScheduleSchema = z.infer<typeof ScheduleValidator>;

export const UpdateScheduleValidator = ScheduleValidator.extend({
  id: z.number()
});

export type UpdateScheduleSchema = z.infer<typeof UpdateScheduleValidator>;