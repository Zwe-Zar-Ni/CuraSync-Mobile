export type PatientResource = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_image?: string;
  date_of_birth: string;
  gender: 'M' | 'F';
  blood_type: string;
  allergies: Allergy[];
  conditions: Condition[];
  contacts: Contact[];
};

export type AllergySeverity = 'MILD' | 'MODERATE' | 'SEVERE';

export type Allergy = {
  id: number;
  patient_id: number;
  name: string;
  severity: AllergySeverity;
  note: string | null;
};

export type ConditionStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'RESOLVED'
  | 'REMISSION'
  | 'RECURRENCE'
  | 'CONFIRMED'
  | 'PROVISIONAL'
  | 'REFUTED';

export type Condition = {
  id: number;
  patient_id: number;
  name: string;
  diagnosis_date: string | null;
  status: ConditionStatus;
  note: string | null;
};

export type Contact = {
  id: number;
  patient_id: number;
  name: string;
  phone_number: string;
  email: string | null;
  address: string | null;
};
