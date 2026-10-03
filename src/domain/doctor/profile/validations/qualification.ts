import { z } from "zod";

export const QualificationValidator = z.object({
  name: z.string().min(1).max(100),
  institution: z.string().min(1).max(200),
  //? An integer column on the backend, kept as a string so the TextInput stays controlled; converted in the service
  year: z.string().regex(/^\d{4}$/, "Year must be 4 digits"),
  certificate_url: z.url().max(255).nullable()
});

export type QualificationSchema = z.infer<typeof QualificationValidator>;

export const UpdateQualificationValidator = QualificationValidator.extend({
  id: z.number()
});

export type UpdateQualificationSchema = z.infer<
  typeof UpdateQualificationValidator
>;
