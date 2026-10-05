export type Schedule = {
  id: number;
  doctor_id: number;
  //? The backend `enum` column serialises as a string digit ("0".."6") — kept numeric here for the day chips and normalised at the API boundary
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const DAY_KEYS = [
  "schedules.sunday",
  "schedules.monday",
  "schedules.tuesday",
  "schedules.wednesday",
  "schedules.thursday",
  "schedules.friday",
  "schedules.saturday"
] as const;