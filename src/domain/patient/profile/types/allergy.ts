export type AllergySeverity = "MILD" | "MODERATE" | "SEVERE";

export type Allergy = {
  id: number;
  patient_id: number;
  name: string;
  severity: AllergySeverity;
  note: string | null;
  created_at: string;
  updated_at: string;
};
