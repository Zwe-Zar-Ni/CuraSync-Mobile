import { Patient } from "@/common/types";
import type { Allergy } from "../types/allergy";
import type { Condition } from "../types/condition";
import type { Contact } from "../types/contact";
import type { AllergySchema } from "../validations/allergy";
import type { ConditionSchema } from "../validations/condition";
import type { ContactSchema } from "../validations/contact";

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

//! UI phase only — in-memory stand-in for /patients/conditions. Swap for httpClient calls once the API is wired.
let conditionRecords: Condition[] = [
  {
    id: 3,
    patient_id: 1,
    name: "Type 2 diabetes",
    diagnosis_date: "2024-11-08",
    status: "ACTIVE",
    note: "Metformin twice daily.",
    created_at: "2026-08-19T07:20:00.000000Z",
    updated_at: "2026-08-19T07:20:00.000000Z"
  },
  {
    id: 2,
    patient_id: 1,
    name: "Migraine",
    diagnosis_date: "2019-04-02",
    status: "RECURRENCE",
    note: "Triggers bright light and missed meals.",
    created_at: "2026-06-11T11:40:00.000000Z",
    updated_at: "2026-06-11T11:40:00.000000Z"
  },
  {
    id: 1,
    patient_id: 1,
    name: "Seasonal allergies",
    diagnosis_date: null,
    status: "RESOLVED",
    note: null,
    created_at: "2026-03-30T16:00:00.000000Z",
    updated_at: "2026-03-30T16:00:00.000000Z"
  }
];

let conditionSequence = 3;

export const conditionStore = {
  list: () => [...conditionRecords].sort((a, b) => b.id - a.id),
  create: (input: ConditionSchema) => {
    const timestamp = new Date().toISOString();
    const condition: Condition = {
      id: ++conditionSequence,
      patient_id: 1,
      name: input.name,
      diagnosis_date: input.diagnosis_date,
      status: input.status,
      note: input.note,
      created_at: timestamp,
      updated_at: timestamp
    };
    conditionRecords = [condition, ...conditionRecords];
    return condition;
  },
  update: (id: number, input: ConditionSchema) => {
    const condition = conditionRecords.find((record) => record.id === id);
    if (!condition) return null;
    const updated: Condition = {
      ...condition,
      name: input.name,
      diagnosis_date: input.diagnosis_date,
      status: input.status,
      note: input.note,
      updated_at: new Date().toISOString()
    };
    conditionRecords = conditionRecords.map((record) =>
      record.id === id ? updated : record
    );
    return updated;
  },
  remove: (id: number) => {
    const condition = conditionRecords.find((record) => record.id === id) ?? null;
    conditionRecords = conditionRecords.filter((record) => record.id !== id);
    return condition;
  }
};

//! UI phase only — in-memory stand-in for /patients/contacts. Swap for httpClient calls once the API is wired.
let contactRecords: Contact[] = [
  {
    id: 3,
    patient_id: 1,
    name: "Marcus Chen",
    phone_number: "09451230876",
    email: "marcus.chen@example.com",
    address: "12 Bagayar Street, Kamayut, Yangon",
    created_at: "2026-09-02T09:15:00.000000Z",
    updated_at: "2026-09-02T09:15:00.000000Z"
  },
  {
    id: 2,
    patient_id: 1,
    name: "Grace Lin",
    phone_number: "09223344556",
    email: null,
    address: "Room 402, Sakura Tower, Hlaing",
    created_at: "2026-07-28T13:00:00.000000Z",
    updated_at: "2026-07-28T13:00:00.000000Z"
  },
  {
    id: 1,
    patient_id: 1,
    name: "Dr. Min Aye",
    phone_number: "09199887766",
    email: "minaye.hospital@example.com",
    address: null,
    created_at: "2026-05-09T08:00:00.000000Z",
    updated_at: "2026-05-09T08:00:00.000000Z"
  }
];

let contactSequence = 3;

export const contactStore = {
  list: () => [...contactRecords].sort((a, b) => b.id - a.id),
  create: (input: ContactSchema) => {
    const timestamp = new Date().toISOString();
    const contact: Contact = {
      id: ++contactSequence,
      patient_id: 1,
      name: input.name,
      phone_number: input.phone_number,
      email: input.email,
      address: input.address,
      created_at: timestamp,
      updated_at: timestamp
    };
    contactRecords = [contact, ...contactRecords];
    return contact;
  },
  update: (id: number, input: ContactSchema) => {
    const contact = contactRecords.find((record) => record.id === id);
    if (!contact) return null;
    const updated: Contact = {
      ...contact,
      name: input.name,
      phone_number: input.phone_number,
      email: input.email,
      address: input.address,
      updated_at: new Date().toISOString()
    };
    contactRecords = contactRecords.map((record) =>
      record.id === id ? updated : record
    );
    return updated;
  },
  remove: (id: number) => {
    const contact = contactRecords.find((record) => record.id === id) ?? null;
    contactRecords = contactRecords.filter((record) => record.id !== id);
    return contact;
  }
};
