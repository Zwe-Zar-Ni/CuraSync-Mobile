import { Doctor, Patient, Specialization } from "../types";

export const patientProfile: Patient = {
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

export const specializations: Specialization[] = [
  {
    id: 1,
    name: "Cardiology",
    description:
      "Cardiology is a branch of medicine that deals with disorders of the heart and blood vessels.",
    icon_url: null,
    doctors_count: 5
  },
  {
    id: 2,
    name: "Neurology",
    description:
      "Neurology is a branch of medicine that deals with disorders of the nervous system.",
    icon_url: null,
    doctors_count: 5
  },
  {
    id: 3,
    name: "Dermatology",
    description:
      "Dermatology is a branch of medicine that deals with disorders of the skin.",
    icon_url: null,
    doctors_count: 5
  },
  {
    id: 4,
    name: "Gastroenterology",
    description: null,
    icon_url: null,
    doctors_count: 5
  },
  {
    id: 5,
    name: "Pediatrics",
    description: null,
    icon_url: null,
    doctors_count: 5
  }
];
