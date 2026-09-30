import { z } from "zod";

export const ConditionValidator = z.object({
  name: z.string().min(1).max(255),
  diagnosis_date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Diagnosis date must be in YYYY-MM-DD format"
    )
    .nullable(),
  status: z.enum([
    "ACTIVE",
    "INACTIVE",
    "RESOLVED",
    "REMISSION",
    "RECURRENCE",
    "CONFIRMED",
    "PROVISIONAL",
    "REFUTED"
  ]),
  note: z.string().max(255).nullable()
});

export type ConditionSchema = z.infer<typeof ConditionValidator>;

export const UpdateConditionValidator = ConditionValidator.extend({
  id: z.number()
});

export type UpdateConditionSchema = z.infer<typeof UpdateConditionValidator>;