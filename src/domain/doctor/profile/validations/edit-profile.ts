import { z } from "zod";

export const EditProfileValidator = z.object({
  name: z.string().min(3).max(255),
  phone_number: z.string().max(255).nullable(),
  license_number: z.string().max(255).nullable(),
  //? The field is a numeric column on the backend, kept as a string here so the TextInput stays controlled; converted in the service
  standard_consultation_fee: z
    .union([
      z.string().regex(/^\d+(\.\d{1,2})?$/, "Fee must be 0 or more"),
      z.literal("")
    ])
    .nullable(),
  bio: z.string().max(1000).nullable()
});

export type EditProfileSchema = z.infer<typeof EditProfileValidator>;
