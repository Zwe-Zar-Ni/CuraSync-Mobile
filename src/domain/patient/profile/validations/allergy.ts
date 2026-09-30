import { z } from "zod";

export const AllergyValidator = z.object({
  name: z.string().min(1).max(255),
  severity: z.enum(["MILD", "MODERATE", "SEVERE"]),
  note: z.string().max(1000).nullable()
});

export type AllergySchema = z.infer<typeof AllergyValidator>;

export const UpdateAllergyValidator = AllergyValidator.extend({
  id: z.number()
});

export type UpdateAllergySchema = z.infer<typeof UpdateAllergyValidator>;