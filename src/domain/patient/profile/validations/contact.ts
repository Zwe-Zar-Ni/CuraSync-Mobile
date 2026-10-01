import { z } from "zod";

export const ContactValidator = z.object({
  name: z.string().min(1).max(255),
  phone_number: z.string().min(1).max(255),
  email: z.email().max(255).nullable(),
  address: z.string().max(255).nullable()
});

export type ContactSchema = z.infer<typeof ContactValidator>;

export const UpdateContactValidator = ContactValidator.extend({
  id: z.number()
});

export type UpdateContactSchema = z.infer<typeof UpdateContactValidator>;
