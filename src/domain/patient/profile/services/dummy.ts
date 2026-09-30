import type { PatientProfileResponse } from "../types";

export const patientProfile: PatientProfileResponse = {
  user: {
    id: 1,
    name: "Ada Wong",
    email: "ada.wong@example.com",
    phone_number: "09123456789",
    profile_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12Y4yRJOMGIw__Zmc5zT16Ci_9w3_EMoH2FGP20yHew&s=10"
  },
  role: "patient",
  profile: {
    id: 1,
    date_of_birth: "1995-04-12",
    gender: "F",
    blood_type: "O+"
  }
};
