import { Specialization } from '@/common/types/doctor';

export type DoctorSpecialtyPayload = {
  specialization_id: number;
};

export type DoctorSpecialty = {
  id: number;
  doctor_id: number;
  specialization_id: number;
  specialization: Specialization;
};
