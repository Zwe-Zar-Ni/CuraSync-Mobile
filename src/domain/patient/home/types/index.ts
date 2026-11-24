import { DoctorResource } from '@/common/types/doctor';

export type Consultation = {
  id: number;
  doctor: DoctorResource;
  scheduled_at: string;
  visit_type: 'virtual' | 'in_person';
};
