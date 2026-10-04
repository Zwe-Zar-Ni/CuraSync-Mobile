import { z } from "zod";

export const SpecialtyValidator = z.object({
  specialization_id: z
    .number({ error: "Please select a specialization" })
    .positive({ error: "Please select a specialization" })
});

export type SpecialtySchema = z.infer<typeof SpecialtyValidator>;