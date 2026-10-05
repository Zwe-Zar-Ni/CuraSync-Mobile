import dayjs from "dayjs";
import { z } from "zod";

//? TimePickerField emits "HH:mm:ss" while the backend expects `date_format:H:i`, so seconds are accepted and trimmed in the service
const timeValidator = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "overrides.invalidTime");

export const OverrideValidator = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "overrides.invalidDate")
      .refine((value) => dayjs(value).isValid(), "overrides.invalidDate"),
    type: z.enum(["UNAVAILABLE", "CUSTOM_HOURS"]),
    start_time: timeValidator.nullable(),
    end_time: timeValidator.nullable(),
    slot_duration_minutes: z.number().int().min(5).max(240).nullable(),
    reason: z.string().max(1000).nullable()
  })
  .superRefine((values, ctx) => {
    if (values.type !== "CUSTOM_HOURS") return;

    if (!values.start_time) {
      ctx.addIssue({
        code: "custom",
        message: "overrides.timeRequired",
        path: ["start_time"]
      });
    }

    if (!values.end_time) {
      ctx.addIssue({
        code: "custom",
        message: "overrides.timeRequired",
        path: ["end_time"]
      });
    }

    if (
      values.start_time &&
      values.end_time &&
      values.end_time <= values.start_time
    ) {
      ctx.addIssue({
        code: "custom",
        message: "overrides.endAfterStart",
        path: ["end_time"]
      });
    }
  });

export type OverrideSchema = z.infer<typeof OverrideValidator>;

//? `StoreScheduleOverrideRequest` adds `after:+3 days` to `date`; `UpdateScheduleOverrideRequest` omits it, and an override ages past that floor, so the rule lives on the picker's `minDate` (create only) rather than here
export const UpdateOverrideValidator = OverrideValidator.extend({
  id: z.number()
});

export type UpdateOverrideSchema = z.infer<typeof UpdateOverrideValidator>;