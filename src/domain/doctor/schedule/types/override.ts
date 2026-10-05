export type ScheduleOverrideType = "UNAVAILABLE" | "CUSTOM_HOURS";

export type ScheduleOverride = {
  id: number;
  doctor_id: number;
  date: string;
  type: ScheduleOverrideType;
  start_time: string | null;
  end_time: string | null;
  slot_duration_minutes: number;
  reason: string | null;
  created_at: string;
  updated_at: string;
};