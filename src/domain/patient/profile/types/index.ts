import type { PatientProfile, User } from "@/common/types";

export type PatientProfileResponse = {
  user: User;
  role: "patient";
  profile: PatientProfile;
};
