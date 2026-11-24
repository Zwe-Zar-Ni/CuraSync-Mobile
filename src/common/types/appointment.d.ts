import { DoctorResource } from './doctor';
import { PatientResource } from './patient';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export type Appointment = {
  id: number;
  status: AppointmentStatus;
  doctor_id: number;
  patient_id: number;
  date: string;
  start_time: string;
  end_time: string;
  reason_for_visit: string;
  consultation_fee: number;
  created_at: string;
  doctor: DoctorResource;
  patient: PatientResource;
};
