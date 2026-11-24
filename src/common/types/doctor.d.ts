export type DoctorStatus =
  'ACTIVE' | 'PENDING_VERIFICATION' | 'INACTIVE' | 'SUSPENDED';

export type DoctorResource = {
  id: number;
  status: DoctorStatus;
  license_number: string;
  standard_consultation_fee: number;
  bio: string;
  total_patient_count: number;
  rating_count: number;
  average_rating: number;
  specilizations: Specialization[];
  qualifications: Qualification[];
  schedules: Schedule[];
  schedule_overrides: unknown[];
  name: string;
  email: string;
  phone_number: string;
  profile_image: string;
};

export type Specialization = {
  id: number;
  name: string;
  description: string | null;
  icon_url: string | null;
  doctors_count: number | null;
};

export interface Qualification {
  name: string;
  institution: string;
  year: string;
}

export interface Schedule {
  id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
}
