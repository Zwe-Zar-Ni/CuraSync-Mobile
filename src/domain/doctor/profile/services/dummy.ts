import type { Qualification } from "../types/qualification";
import { DoctorSpecialty, DoctorSpecialtyPayload } from "../types/specialty";
import { specializations } from "@/common/service/dummy";
import { UpdateQualificationSchema } from "../validations/qualification";

//! UI phase only — in-memory stand-in for /doctors/qualifications and /doctors/specialties. Swap for httpClient calls once the API is wired.

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

export const qualificationStore = {
  list: () => [...qualificationRecords].sort((a, b) => b.id - a.id),
  create: (input: UpdateQualificationSchema) => {
    const timestamp = new Date().toISOString();
    const qualification: Qualification = {
      id: qualificationRecords.length + 1,
      doctor_id: 1,
      name: input.name,
      institution: input.institution,
      year: Number(input.year),
      certificate_url: input.certificate_url,
      created_at: timestamp,
      updated_at: timestamp
    };
    qualificationRecords = [qualification, ...qualificationRecords];
    return qualification;
  },
  update: (id: number, input: UpdateQualificationSchema) => {
    const qualification = qualificationRecords.find(
      (record) => record.id === id
    );
    if (!qualification) return null;
    const updated: Qualification = {
      ...qualification,
      name: input.name,
      institution: input.institution,
      year: Number(input.year),
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

let specialtyRecords: DoctorSpecialty[] = [
  {
    id: 1,
    doctor_id: 1,
    specialization_id: 1,
    specialization: {
      id: 1,
      name: "General Medicine",
      description: "General Medicine",
      icon_url: null,
      doctors_count: 0
    }
  },
  {
    id: 2,
    doctor_id: 1,
    specialization_id: 2,
    specialization: {
      id: 2,
      name: "Cardiology",
      description: "Cardiology",
      icon_url: null,
      doctors_count: 0
    }
  },
  {
    id: 3,
    doctor_id: 1,
    specialization_id: 3,
    specialization: {
      id: 3,
      name: "Internal Medicine",
      description: "Internal Medicine",
      icon_url: null,
      doctors_count: 0
    }
  }
];

export const specialtyStore = {
  list: () => [...specialtyRecords].sort((a, b) => b.id - a.id),
  create: (input: DoctorSpecialtyPayload) => {
    const specialty: DoctorSpecialty = {
      id: specialtyRecords.length + 1,
      doctor_id: 1,
      specialization_id: input.specialization_id,
      specialization: specializations.find(
        (specialization) => specialization.id === input.specialization_id
      ) ?? {
        id: input.specialization_id,
        name: "Unknown",
        description: "Unknown",
        icon_url: null,
        doctors_count: 0
      }
    };
    specialtyRecords = [specialty, ...specialtyRecords];
    return specialty;
  },
  delete: (id: number) => {
    const specialty = specialtyRecords.find((record) => record.id === id);
    if (!specialty) return null;
    specialtyRecords = specialtyRecords.filter((record) => record.id !== id);
    return specialty;
  }
};
