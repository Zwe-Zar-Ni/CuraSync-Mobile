import { z } from "zod";

export const RegisterValidator = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8).max(16),
  password_confirmation: z.string().min(8).max(16)
});

export type RegisterSchema = z.infer<typeof RegisterValidator>;
