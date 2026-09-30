export type ConditionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "RESOLVED"
  | "REMISSION"
  | "RECURRENCE"
  | "CONFIRMED"
  | "PROVISIONAL"
  | "REFUTED";

export type Condition = {
  id: number;
  patient_id: number;
  name: string;
  diagnosis_date: string | null;
  status: ConditionStatus;
  note: string | null;
  created_at: string;
  updated_at: string;
};