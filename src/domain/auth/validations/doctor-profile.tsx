import { z } from "zod";

export const DoctorProfileValidator = z.object({
  name: z.string().nullable(),
  phone_number: z.string().min(6).nullable(),
  profile_url: z.string().nullable(),
  license_number: z.string().min(4).nullable(),
  standard_consultation_fee: z.string().nullable(), // ? No need to set number, since no calculation is needed to be done, convert when sending to api
  bio: z.string().nullable()
});

export type DoctorProfileSchema = z.infer<typeof DoctorProfileValidator>;
