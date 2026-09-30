export type Specialization = {
  id?: number;
  name: string;
  description: string;
  icon_url: string | null;
  doctors_count?: number;
};

export type Doctor = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_url: string | null;
  license_number: string;
  standard_consultation_fee: number;
  bio: string;
  total_patient_count: number;
  rating_count: number;
  average_rating: number;
  specilizations: Specialization[];
};

export type Consultation = {
  id: number;
  doctor: Doctor;
  scheduled_at: string;
  visit_type: "virtual" | "in_person";
};
