import { z } from "zod";

export const PatientProfileValidator = z.object({
  name: z.string().nullable(),
  phone_number: z.string().min(6).nullable(),
  profile_url: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  gender: z.enum(["M", "F"]).nullable(),
  blood_type: z.string().nullable()
});

export type PatientProfileSchema = z.infer<typeof PatientProfileValidator>;
