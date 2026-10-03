import { Doctor } from "@/common/types";
import type { Qualification } from "../types/qualification";

export type DoctorProfilePayload = {
  name: string;
  phone_number: string | null;
  license_number: string | null;
  standard_consultation_fee: number | null;
  bio: string | null;
};

export type QualificationPayload = {
  name: string;
  institution: string;
  year: number;
  certificate_url: string | null;
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

//! UI phase only — in-memory stand-in for /doctors/qualifications. Swap for httpClient calls once the API is wired.
let qualificationRecords: Qualification[] = [
  {
    id: 3,
    doctor_id: 1,
    name: "Fellowship in Cardiology",
    institution: "Yangon General Hospital",
    year: 2019,
    certificate_url:
      "https://example.com/certificates/fellowship-cardiology.pdf",
    created_at: "2026-08-11T09:20:00.000000Z",
    updated_at: "2026-08-11T09:20:00.000000Z"
  },
  {
    id: 2,
    doctor_id: 1,
    name: "MD in Internal Medicine",
    institution: "University of Medicine 1, Yangon",
    year: 2015,
    certificate_url: null,
    created_at: "2026-05-30T04:10:00.000000Z",
    updated_at: "2026-05-30T04:10:00.000000Z"
  },
  {
    id: 1,
    doctor_id: 1,
    name: "MBBS",
    institution: "University of Medicine 1, Yangon",
    year: 2010,
    certificate_url: null,
    created_at: "2026-02-14T11:45:00.000000Z",
    updated_at: "2026-02-14T11:45:00.000000Z"
  }
];

let qualificationSequence = 3;

export const qualificationStore = {
  list: () => [...qualificationRecords].sort((a, b) => b.id - a.id),
  create: (input: QualificationPayload) => {
    const timestamp = new Date().toISOString();
    const qualification: Qualification = {
      id: ++qualificationSequence,
      doctor_id: 1,
      name: input.name,
      institution: input.institution,
      year: input.year,
      certificate_url: input.certificate_url,
      created_at: timestamp,
      updated_at: timestamp
    };
    qualificationRecords = [qualification, ...qualificationRecords];
    return qualification;
  },
  update: (id: number, input: QualificationPayload) => {
    const qualification = qualificationRecords.find(
      (record) => record.id === id
    );
    if (!qualification) return null;
    const updated: Qualification = {
      ...qualification,
      name: input.name,
      institution: input.institution,
      year: input.year,
      certificate_url: input.certificate_url,
      updated_at: new Date().toISOString()
    };
    qualificationRecords = qualificationRecords.map((record) =>
      record.id === id ? updated : record
    );
    return updated;
  },
  remove: (id: number) => {
    const qualification =
      qualificationRecords.find((record) => record.id === id) ?? null;
    qualificationRecords = qualificationRecords.filter(
      (record) => record.id !== id
    );
    return qualification;
  }
};
