import { Doctor } from "@/common/types";

export type DoctorProfilePayload = {
  name: string;
  phone_number: string | null;
  license_number: string | null;
  standard_consultation_fee: number | null;
  bio: string | null;
};

//! UI phase only — in-memory stand-in for /me + PATCH /doctors/profile. Swap for httpClient calls once the API is wired.
let doctorProfile: Doctor = {
  user: {
    id: 1,
    name: "Ada Wong",
    email: "ada.wong@example.com",
    phone_number: "09123456789",
    profile_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT12Y4yRJOMGIw__Zmc5zT16Ci_9w3_EMoH2FGP20yHew&s=10"
  },
  role: "doctor",
  profile: {
    id: 1,
    average_rating: 4.5,
    total_patient_count: 10,
    rating_count: 20,
    bio: "Hello world",
    license_number: "123456789",
    standard_consultation_fee: 25000.0,
    status: "ACTIVE"
  }
};

export const doctorProfileStore = {
  get: () => doctorProfile,
  update: (input: DoctorProfilePayload) => {
    doctorProfile = {
      ...doctorProfile,
      user: {
        ...doctorProfile.user,
        name: input.name,
        phone_number: input.phone_number
      },
      profile: {
        ...doctorProfile.profile,
        license_number: input.license_number,
        standard_consultation_fee: input.standard_consultation_fee,
        bio: input.bio
      }
    };
    return doctorProfile;
  }
};
