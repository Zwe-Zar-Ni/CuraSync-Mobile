import { Patient } from "@/common/types";
import type { Allergy } from "../types/allergy";
import type { AllergySchema } from "../validations/allergy";

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

//! UI phase only — in-memory stand-in for /patients/allergies. Swap for httpClient calls once the API is wired.
let allergyRecords: Allergy[] = [
  {
    id: 3,
    patient_id: 1,
    name: "Peanuts",
    severity: "SEVERE",
    note: "Carries an adrenaline pen at all times.",
    created_at: "2026-08-14T08:30:00.000000Z",
    updated_at: "2026-08-14T08:30:00.000000Z"
  },
  {
    id: 2,
    patient_id: 1,
    name: "Dust mites",
    severity: "MILD",
    note: null,
    created_at: "2026-07-02T10:05:00.000000Z",
    updated_at: "2026-07-02T10:05:00.000000Z"
  },
  {
    id: 1,
    patient_id: 1,
    name: "Penicillin",
    severity: "MODERATE",
    note: "Causes rash and swelling after a course of antibiotics.",
    created_at: "2026-05-21T14:45:00.000000Z",
    updated_at: "2026-05-21T14:45:00.000000Z"
  }
];

let allergySequence = 3;

export const allergyStore = {
  list: () => [...allergyRecords].sort((a, b) => b.id - a.id),
  create: (input: AllergySchema) => {
    const timestamp = new Date().toISOString();
    const allergy: Allergy = {
      id: ++allergySequence,
      patient_id: 1,
      name: input.name,
      severity: input.severity,
      note: input.note,
      created_at: timestamp,
      updated_at: timestamp
    };
    allergyRecords = [allergy, ...allergyRecords];
    return allergy;
  },
  update: (id: number, input: AllergySchema) => {
    const allergy = allergyRecords.find((record) => record.id === id);
    if (!allergy) return null;
    const updated: Allergy = {
      ...allergy,
      name: input.name,
      severity: input.severity,
      note: input.note,
      updated_at: new Date().toISOString()
    };
    allergyRecords = allergyRecords.map((record) =>
      record.id === id ? updated : record
    );
    return updated;
  },
  remove: (id: number) => {
    const allergy = allergyRecords.find((record) => record.id === id) ?? null;
    allergyRecords = allergyRecords.filter((record) => record.id !== id);
    return allergy;
  }
};
