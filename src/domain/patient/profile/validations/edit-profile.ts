import { z } from "zod";

export const EditProfileValidator = z.object({
  name: z.string().min(3).max(255),
  phone_number: z.string().max(255).nullable(),
  profile_url: z.string().max(255).nullable(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format")
    .nullable(),
  gender: z.enum(["M", "F"]).nullable(),
  blood_type: z.string().max(3).nullable()
});

export type EditProfileSchema = z.infer<typeof EditProfileValidator>;
