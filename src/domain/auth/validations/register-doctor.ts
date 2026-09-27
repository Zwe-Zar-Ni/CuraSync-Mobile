import { z } from "zod";

export const RegisterDoctorValidator = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8).max(16),
  password_confirmation: z.string().min(8).max(16)
});

export type RegisterDoctorSchema = z.infer<typeof RegisterDoctorValidator>;
