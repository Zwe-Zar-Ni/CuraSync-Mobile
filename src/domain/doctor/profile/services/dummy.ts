import { Doctor } from "@/common/types";

export const doctorProfile: Doctor = {
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
