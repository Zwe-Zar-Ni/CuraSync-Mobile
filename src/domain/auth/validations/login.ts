import { z } from "zod";

export const LoginValidator = z.object({
  email: z.email(),
  password: z.string().min(8)
});

export type LoginSchema = z.infer<typeof LoginValidator>;
