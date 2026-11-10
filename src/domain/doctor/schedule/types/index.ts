export type Schedule = {
  id: number;
  doctor_id: number;
  //? The backend `enum` column serialises as a string digit ("0".."6") — kept numeric here for the day chips and normalised at the API boundary
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
};

export const DAY_KEYS = [
  'schedules.sunday',
  'schedules.monday',
  'schedules.tuesday',
  'schedules.wednesday',
  'schedules.thursday',
  'schedules.friday',
  'schedules.saturday',
] as const;

export type ScheduleRequest = {
  admin_note: null | string;
  created_at: string;
  data: {
    day_of_week: number;
    end_time: string;
    slot_duration_minutes: number;
    start_time: string;
  };
  doctor_id: number;
  doctor_note: null | string;
  doctor_schedule: null | Schedule;
  doctor_schedule_id: null | number;
  id: number;
  request_type: 'CREATE' | 'UPDATE' | 'DELETE';
  reviewed_at: null | string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  updated_at: string;
  user_id: null | number;
};
